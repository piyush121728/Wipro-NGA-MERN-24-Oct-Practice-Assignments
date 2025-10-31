// ============================================
// ApiModule: Handles API calls using Fetch API
// ============================================
const ApiModule = (function() {
  const BASE = 'https://jsonplaceholder.typicode.com';
  // const BASE = 'https://invalid.example';

  // Generic fetch wrapper with timeout & error handling
  async function fetchJson(endpoint, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(BASE + endpoint, { signal: controller.signal });
      clearTimeout(timeout);

      // Check for HTTP errors
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();

      // Ensure valid response format
      if (!Array.isArray(data)) throw new Error('Unexpected data format');

      return data;
    } catch (err) {
      if (err.name === 'AbortError') throw new Error('Request timed out');
      throw err;
    }
  }

  // Public methods (revealing module pattern)
  return {
    getPosts: () => fetchJson('/posts'),
    getTodos: () => fetchJson('/todos')
  };
})();

// ============================================
// UIModule: Handles DOM manipulation and UI rendering
// ============================================
const UIModule = (function() {
  // DOM elements
  const postsList = document.getElementById('postsList');
  const todosList = document.getElementById('todosList');
  const postsMeta = document.getElementById('postsMeta');
  const globalStatus = document.getElementById('globalStatus');

  // Helper: clear an element’s children
  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  // Helper: escape HTML (security)
  function escapeHtml(text) {
    const map = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  // Update global status message
  function setGlobalStatus(msg) {
    globalStatus.textContent = msg || '';
  }

  // Show loader while fetching data
  function showLoaderIn(el) {
    clear(el);
    const d = document.createElement('div');
    d.innerHTML = '<div class="loader"></div> Loading...';
    el.appendChild(d);
  }

  // Render fetched posts
  function renderPosts(posts) {
    clear(postsList);
    posts.slice(0, 30).forEach(p => {
      const e = document.createElement('div');
      e.className = 'post';
      e.innerHTML = `<div class='title'>${escapeHtml(p.title)}</div>
                     <div class='body'>${escapeHtml(p.body)}</div>`;
      postsList.appendChild(e);
    });
    postsMeta.textContent = `Showing ${Math.min(posts.length, 30)} of ${posts.length} posts`;
  }

  // Render fetched todos (with optional filter)
  function renderTodos(todos) {
    clear(todosList);
    todos.slice(0, 50).forEach(t => {
      const r = document.createElement('div');
      r.className = 'todo' + (t.completed ? ' completed' : '');
      r.innerHTML = `<input type='checkbox' ${t.completed ? 'checked' : ''} disabled/>
                     <div class='label' style='flex:1'>${escapeHtml(t.title)}</div>`;
      todosList.appendChild(r);
    });
  }

  // Render error message
  function renderError(el, msg) {
    clear(el);
    const e = document.createElement('div');
    e.className = 'error';
    e.textContent = msg;
    el.appendChild(e);
  }

  // Reveal only necessary functions
  return { showLoaderIn, renderPosts, renderTodos, renderError, setGlobalStatus };
})();

// ============================================
// AppController: Main controller (handles events & flow)
// ============================================
const AppController = (function(Api, UI) {
  const cache = { posts: null, todos: null };

  // Load and render posts
  async function loadPosts() {
    UI.showLoaderIn(document.getElementById('postsList'));
    try {
      const p = cache.posts ?? await Api.getPosts();
      cache.posts = p;
      UI.renderPosts(p);
    } catch (e) {
      UI.renderError(document.getElementById('postsList'), 'Failed: ' + e.message);
    }
  }

  // Load and render todos
  async function loadTodos(filter = 'all') {
    UI.showLoaderIn(document.getElementById('todosList'));
    try {
      const t = cache.todos ?? await Api.getTodos();
      cache.todos = t;
      const filtered = filter === 'incomplete' ? t.filter(x => !x.completed) : t;
      UI.renderTodos(filtered);
    } catch (e) {
      UI.renderError(document.getElementById('todosList'), 'Failed: ' + e.message);
    }
  }

  // Wire up event listeners for buttons
  function wireEvents() {
    document.getElementById('refreshBtn').addEventListener('click', async () => {
      cache.posts = null;
      cache.todos = null;
      await Promise.all([loadPosts(), loadTodos()]);
    });

    document.getElementById('showIncomplete').addEventListener('click', () => loadTodos('incomplete'));
    document.getElementById('showAll').addEventListener('click', () => loadTodos('all'));
  }

  // Initialize the app
  async function init() {
    wireEvents();
    await Promise.all([loadPosts(), loadTodos()]);
  }

  // Reveal public methods
  return { init };
})(ApiModule, UIModule);

// ============================================
// App Initialization
// ============================================
AppController.init().catch(e => {
  document.getElementById('globalStatus').textContent = 'Error: ' + e.message;
});

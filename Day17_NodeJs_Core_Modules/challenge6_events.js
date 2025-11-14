const EventEmitter = require('events');

class MyNotifier extends EventEmitter { }

const notifier = new MyNotifier();

// Register listeners
notifier.on('userLoggedIn', (username) => {
    console.log(`User ${username} logged in.`);
});

notifier.on('userLoggedOut', (username) => {
    console.log(`User ${username} logged out.`);
});

// Bonus: sessionExpired
notifier.on('sessionExpired', (username) => {
    console.log(`Session for ${username} expired.`);
});

// Simulate dynamic emits
function simulateUserActivity(username) {
    // user logs in
    notifier.emit('userLoggedIn', username);

    // after 3 seconds, user logs out
    setTimeout(() => {
        notifier.emit('userLoggedOut', username);
    }, 3000);

    // bonus: after 5 seconds, sessionExpired
    setTimeout(() => {
        notifier.emit('sessionExpired', username);
    }, 5000);
}

simulateUserActivity('John');

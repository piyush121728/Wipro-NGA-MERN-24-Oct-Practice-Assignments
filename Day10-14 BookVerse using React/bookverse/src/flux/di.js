// di.js - dependency injection container for dispatcher and store
import Dispatcher from './Dispatcher';
import Store from './Store';

const dispatcherInstance = new Dispatcher();
const storeInstance = new Store({ dispatcher: dispatcherInstance });

export { dispatcherInstance, storeInstance };
export default dispatcherInstance;

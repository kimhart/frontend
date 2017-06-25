import { EventEmitter } from 'events';

class Emitter extends EventEmitter {

  subscribe = (action, callback) => {
    this.on(action, callback);
  }

  unsubscribe = (action, callback) => {
    this.removeListener(action, callback);
  }

  send = (action, data) => {
    this.emit(action, data);
  }

}

let actions = {
  APP_LOADING: 'APP_LOADING',
  INIT_APP_LOADING: 'INIT_APP_LOADING',
}

let emitter = new Emitter();
export {
  emitter,
  actions
}

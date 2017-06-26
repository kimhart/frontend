import { emitter, actions } from './Emitter';

export let isLoading = (loading) => {
  emitter.send(actions.APP_LOADING, { loading });
}

export let initLoading = (loading) => {
  emitter.send(actions.INIT_APP_LOADING, { loading });
}

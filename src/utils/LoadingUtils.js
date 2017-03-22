import { emitter, actions } from './Emitter';

export let isLoading = (loading) => {
  emitter.send(actions.APP_LOADING, { loading });
}

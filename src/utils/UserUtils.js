const TALLY_NAMESPACE = 'tally::'
export default {
  getUserId() {
    return JSON.parse(localStorage.getItem(`${TALLY_NAMESPACE}user_id`));
  },
  setUserId(user_id) {
    localStorage.setItem(`${TALLY_NAMESPACE}user_id`, JSON.stringify(user_id));
  },
  getUser() {
    return JSON.parse(localStorage.getItem(`${TALLY_NAMESPACE}user`));
  },
  setUser(user) {
    localStorage.setItem(`${TALLY_NAMESPACE}user`, JSON.stringify(user));
  },
  removeUser(user) {
    localStorage.removeItem(`${TALLY_NAMESPACE}user`);
  },
  logOut() {
    localStorage.removeItem(`${TALLY_NAMESPACE}user_id`);
    localStorage.removeItem(`${TALLY_NAMESPACE}user`);
  },
  isValidUserId(user_id) {
    return !!user_id || user_id === 0;
  }
}

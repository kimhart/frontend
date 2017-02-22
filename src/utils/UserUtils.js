export default {
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  removeUser(user) {
    localStorage.removeItem('user');
  }
}

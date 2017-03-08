let env = process.env.NODE_ENV || 'development';
let common = {
  backend: {
    uri: 'https://heroku-postgres-7720c2d1.herokuapp.com'
  }
}

let config = {
  development: {
    ...common,
    app: {
      port: 3000,
      logs: {
        dateFormat: 'YYYY/MM/DD hh:mm:ss'
      }
    }
  },
  production: {
    ...common,
    app: {
      port: process.env.PORT,
      logs: {
        dateFormat: 'YYYY/MM/DD hh:mm:ss'
      }
    }
  }
}

export default config[env];

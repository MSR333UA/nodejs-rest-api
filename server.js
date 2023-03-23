const mongoose = require('mongoose');
const app = require('./app');
const {DB_HOST, PORT = 3000} = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
      console.log(`Database connection successful, PORT ${PORT}!`);
      app.listen(PORT);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });

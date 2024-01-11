const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is connected on host: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;

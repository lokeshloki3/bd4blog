const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("Db Connected"))
    .catch((error) => {
      console.log("Db error");
      console.log(error);
      // abnormal exit
      process.exit(1);
    });
};

module.exports = connectWithDb;

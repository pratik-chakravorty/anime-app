const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//function to connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
    //exit the process
    process.exit(1);
  }
};

module.exports = connectDB;

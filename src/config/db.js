const mongoose = require("mongoose");

const URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connect successfully!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };

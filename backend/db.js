const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/NM"; // Use env variable or default to local URI

module.exports = function (callback) {
  mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Improved connection handling
    },
    async (err, result) => {
      if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
      }
      console.log("Connected to MongoDB");

      try {
        const foodCollection = await mongoose.connection.db.collection(
          "food_items"
        );

        const categoryCollection = await mongoose.connection.db.collection(
          "Categories"
        );

        const foodData = await foodCollection.find({}).toArray();
        const categoryData = await categoryCollection.find({}).toArray();

        console.log(categoryData);

        callback(null, foodData, categoryData);
      } catch (err) {
        console.error("Error retrieving data from collections:", err);
        callback(err, null, null);
      }
    }
  );
};

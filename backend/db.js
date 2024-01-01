const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://jainchinmay916:Jain123@cluster0.wlfsmpf.mongodb.net/FoodData?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected!");
    let fetched_data = mongoose.connection.db.collection("food_items");
    let data = await fetched_data.find({}).toArray();
    global.food_items = data;
    let foodCat = mongoose.connection.db.collection("foodCategory");
    let fData = await foodCat.find({}).toArray();
    global.foodCategory = fData;
    // console.log(global.foodCategory);
  } catch (error) {
    // console.log("err: ", error);
  }
};
module.exports = mongoDB;

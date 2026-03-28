import mongoose from "mongoose";

const connectDb = () => {
    if (mongoose.connections[0].readyState === 1) {
        console.log('Database Connected');
        return;
    }
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database Connected Successfully");
    }).catch(error => console.log("Could not Connect to Mongo Db; " + error));

}

export default connectDb;


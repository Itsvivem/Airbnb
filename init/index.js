const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust"

async function main() {
    await mongoose.connect(MONGO_URL)
}
main().then((res) => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
})

const initDB = async () => {
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner: "663e608166307eb7c981ee94"
    }))
    await Listing.insertMany(initData.data)
    console.log("sucess")
}
initDB()
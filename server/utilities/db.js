const mongoose=require("mongoose")
const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.DB)
    console.log("Database connected")

  }catch(error){
    console.log("db connection error",error)
  }
}

module.exports=connectDb
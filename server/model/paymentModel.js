const mongoose=require("mongoose")

const paymentSchema=mongoose.Schema({
  orderId:{
    type:String,
    require:true
  },
  paymentId:{
    type:String,
    require:true
  },
  amount:{
    type:String,
    require:true
  }
})

const payments=new mongoose.model("payment",paymentSchema)

module.exports=payments
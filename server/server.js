require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDb=require("./utilities/db")
const razorpay=require("razorpay")
const crypto=require("crypto")

const port=process.env.PORT

const app =express()
const corsOption={
  origin:"http://localhost:5173",
  methods:"GET,PUT,POST,PATCH,DELETE",
  credential:true
}

app.use(cors(corsOption))


app.use(express.json())

app.use("/payment",require("./Router/payment_router"))


connectDb().then(()=>{
  app.listen(port,()=>{
    console.log(`server connected on port ${port}`)
  })
})


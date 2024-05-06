
import './App.css'
import { useEffect, useState } from 'react'


function App() {
  const [amt, setAmt] = useState("")
  useEffect(() => {
    setAmt(Math.floor(Math.random() * 10000))
  }, [])


  const handleClick = async (event) => {
    const amount = amt
    const currency = "INR"
    const rec_Id = Math.floor(Math.random() * 100000000)
    const receiptId = rec_Id.toString()
    event.preventDefault()
    const response = await fetch(`http://localhost:5001/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount, currency, receipt: receiptId
      })
    })
    const res_data = await response.json()
    //console.log(res_data)
    var option = {
      key: "",
      amount,
      currency,
      name: "MERN projects", // company name
      description: "Test transaction",
      image: "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
      order_id: res_data.id,
      handler: async function (response) {
        const paymentData = { ...response }
        const validateResponse = await fetch(`http://localhost:5001/payment/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(paymentData)
        })
        const res_data = await validateResponse.json()
        console.log("validate data", res_data)
        if (res_data) {
          const oId = res_data.orderId
          const pId = res_data.paymentId
          sendPaymentInfo(oId, pId)


        }
      },
      prefill: {
        name: "", // name of user 
        email: "noname@noname",
        contact: "123456789"
      },
      notes: {
        address: "hno noname ,delhi"
      },
      theme: {
        color: "#0C0D0D"
      }
    };
    var rzp1 = new Razorpay(option)
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed");

    })

    rzp1.open()


    const sendPaymentInfo = async (orderId, paymentId) => {

      try {
        const response = await fetch("http://localhost:5001/payment/paymentInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId, paymentId, amount: `${(amt / 100)} INR`
          })
        })
        const info = await response.json()
        console.log("db payment info ", info)


      }
      catch (error) {
        console.log("send paymnet info error")
      }
    }
  }
  return (
    <>
      <div className='product'>
        <h1>Razorpay payment gateway</h1>
        <h3>Amount : {amt / 100} INR</h3>
        <button className='button' onClick={handleClick}>Pay Now </button>

      </div>
    </>
  )
}

export default App











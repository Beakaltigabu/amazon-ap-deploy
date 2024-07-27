const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async(req, res) => {
  const total = req.query.total;
  if (total > 0) {
   const paymentIntent= await stripe.paymentIntents.create(
    {amount: total,
    currency:"usd"});

    console.log(paymentIntent);

    res.status(200).json(
        {
            clientSecret: paymentIntent.client_secret,
        }
    );
}else{
    res.status(403).json({
        message:"total must be greaterthan zero"
    });
  }
});


app.listen(3000, (err)=>{
    if(err)throw err;
    console.log("Server Running on Port: 3000, http://localhost:3000")
})

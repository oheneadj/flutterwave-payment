const express = require("express");
const router = express.Router();
const needle = require("needle");
const Flutterwave = require("flutterwave-node-v3");

router.get("/", async (req, res) => {
  //Check if public key and secret key are available
  if (
    process.env.FLUTTERWAVE_PUBLIC_KEY == "" ||
    process.env.FLUTTERWAVE_SECRET_KEY == ""
  ) {
    //if not available send response
    return res.json({
      message: "PUBLIC KEY and SECRET KEY cannot be blank",
    });
  } else {
    //create instance of Flutterwave

    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );
    const details = {
      account_bank: "044",
      account_number: "0690000040",
      amount: 200,
      currency: "NGN",
      narration: "Payment for things",
    };

    const data = await flw.Transfer.initiate(details);

    res.json({ data });
  }
});

module.exports = router;

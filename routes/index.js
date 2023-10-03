const express = require("express");
const router = express.Router();
const needle = require("needle");
const Flutterwave = require("flutterwave-node-v3");

router.post("/", async (req, res) => {
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
    //const details = [...req.body];
    const details = {
      account_bank: "MTN",
      account_number: "2250757564300",
      amount: 2,
      currency: "GHS",
      beneficiary_name: "ASSOA Arnauld",
    };

    const data = await flw.Transfer.initiate(details);

    res.json({ data });
  }
});

router.get("/:id", async (req, res) => {
  //check if the url has an id
  if (req.params.id != "") {
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

      const data = await flw.Transfer.get_a_transfer({ id: req.params.id });

      res.json({ data });
    }
  } else {
    res.json({ message: "You must provide a transaction id" });
  }
  //Check if public key and secret key are available
});

module.exports = router;

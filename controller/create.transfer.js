const Flutterwave = require("flutterwave-node-v3");

const createTransfer = async (req, res) => {
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
    //const details = {...req.body};
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
};

module.exports = createTransfer;

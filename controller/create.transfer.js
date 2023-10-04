const Flutterwave = require("flutterwave-node-v3");

const createTransfer = async (req, res) => {
  if (
    process.env.FLUTTERWAVE_PUBLIC_KEY == "" ||
    process.env.FLUTTERWAVE_SECRET_KEY == ""
  ) {
    //If not available send response
    return res.json({
      message: "PUBLIC KEY and SECRET KEY cannot be blank",
    });
  } else {
    //Create instance of Flutterwave
    const flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY,
      process.env.FLUTTERWAVE_SECRET_KEY
    );

    //const details = { ...req.body };

    const details = {
      account_bank: "044",
      account_number: "0690000040",
      amount: 2,
      currency: "NGN",
      narration: "Payment for things",
    };

    // const verifiedAccount = await flw.Misc.verify_Account({
    //   account_bank: details.account_bank,
    //   account_number: details.account_number,
    // });

    // console.log(
    //   `MESSAGE:${verifiedAccount.message} STATUS: ${verifiedAccount.status}`
    // );
    // console.log(verifiedAccount);

    try {
      const response = await flw.Transfer.initiate(details);
      res.json({ response });
    } catch (error) {
      res.json({ error });
    }
  }
};

module.exports = createTransfer;

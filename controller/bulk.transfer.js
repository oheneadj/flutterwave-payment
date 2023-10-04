const Flutterwave = require("flutterwave-node-v3");

const bulkTransfer = async (req, res) => {
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
    //const details = {...req.body};

    console.log("Flutterwave");
    const payload = {
      title: "Staff salary",
      bulk_data: [
        {
          account_bank: "MPS",
          account_number: "2540782773934",
          amount: 1200,
          currency: "KES",
          beneficiary_name: "Akinyi Kimwei",
        },
        {
          account_bank: "MPS",
          account_number: "2540782773934",
          amount: 1200,
          currency: "KES",
          beneficiary_name: "Akinyi Kimwei",
        },
      ],
    };
    console.log(payload);

    const response = await flw.Transfer.bulk(payload);

    res.json({ response });
  }
};

module.exports = bulkTransfer;

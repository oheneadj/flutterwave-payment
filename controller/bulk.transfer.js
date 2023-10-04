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

    const details = {
      title: "Staff salary for April",
      bulk_data: [
        {
          bank_code: "044",
          account_number: "0690000032",
          amount: 600,
          currency: "NGN",
          narration: "Salary payment for April",
        },
        {
          bank_code: "044",
          account_number: "0690000034",
          amount: 400,
          currency: "NGN",
          narration: "Salary payment for April",
        },
      ],
    };

    //const data = payload.bulk_data[0];
    //console.log(data.amount);

    try {
      const response = await flw.Transfer.bulk(details);
      res.json({ response });
    } catch (error) {
      res.json({ error });
    }
  }
};

module.exports = bulkTransfer;

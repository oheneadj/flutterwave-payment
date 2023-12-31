const Flutterwave = require("flutterwave-node-v3");

const showTransfer = async (req, res) => {
  //check if the url has an id
  if (req.params.id != "") {
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
      console.log(req.params.id);
      const data = await flw.Transfer.get_a_transfer({ id: req.params.id });

      res.json({ data });
    }
  } else {
    res.json({ message: "You must provide a transaction id" });
  }
};

module.exports = showTransfer;

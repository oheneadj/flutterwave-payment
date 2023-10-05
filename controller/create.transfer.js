const Flutterwave = require("flutterwave-node-v3");
const cron = require("node-cron");

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

      //LOG THIS STRING AFTER A NEW TRANSFER IS INITIATED
      console.log("A NEW TRANSFER HAS BEEN CREATED");

      //LOG THE TRANSFER RESPONSE INTO THE CONSOLE
      console.log(response);

      res.json({ response });
    } catch (error) {
      res.json({ error });
    }
  }
};
// This CRON Scheduler calls the createTranfer method every minute
cron.schedule("* * * * *", createTransfer);

/**
 *
 * These asterisks are part of the 
 * crontab syntax to represent different units of time:

  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )

  VISIT https://crontab.guru 
  TO LEARN MORE

A single asterisk behaves like a wildcard. 
Meaning the task will be run for every 
instance of that unit of time. 
Five asterisks ('* * * * *') represents the
 crontab default of running every minute.

Numbers in the place of asterisks will be 
treated as values for that unit of time. 
Allowing you to schedule tasks to occur 
daily and weekly or in more complex. 


 * 
 *
 */

module.exports = createTransfer;

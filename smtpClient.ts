import {
  ClientOptions,
  SendConfig,
  SMTPClient,
} from "https://deno.land/x/denomailer@1.4.0/mod.ts";
import { Attachment } from "https://deno.land/x/denomailer@1.4.0/config/mail/attachments.ts";
// import { select } from 'https://deno.land/x/inquirer/mod.ts'; //套件不相容 deno 1.26
// import figlet from "https://dzjd3wnuerwiybhjc6w4aqtpnm46ble4dcfbb6jn7w3upjcmpraa.arweave.net/HlI92bQkbIwE6RetwEJvazngrJwYihD5Lf23R6RMfEA/mod.js";
import figlet from "https://dzjd3wnuerwiybhjc6w4aqtpnm46ble4dcfbb6jn7w3upjcmpraa.arweave.net/HlI92bQkbIwE6RetwEJvazngrJwYihD5Lf23R6RMfEA/mod.js";

addEventListener(
  "sendMail",
  () => console.log("Total requests"),
);

dispatchEvent(new Event("sendMail"));
// Deno.exit()
/** Title */
const myAwesomeFiglet = await figlet("Send Mail CLI");
console.log(`%c${myAwesomeFiglet}`, "color:gold;");

/** 詢問要目標機器 IP */
const targetIP = prompt("Input Target IP:", "192.168.91.76");
const clientOptions = {
  connection: {
    hostname: `${targetIP?.toString()}`,
    port: 25,
    tls: false,
    // auth: {
    //   username: "example",
    //   password: "password",
    // },
  },
  debug: {
    allowUnsecure: true, // 沒有 SSL 要開啟這個
  },
};

// from, to, cc
const fromWho = prompt(
  "❓ Who wanna send mail. (e-mail)\n",
  "weitingshih@softnext.com.tw",
);
const toWho = prompt(
  "❓ Who will recive this mail. (e-mail)\n",
  "weitingshih@softnext.com.tw",
);
const ask4ccWho = prompt(
  "❓ Do you want to cc someone? (y = yes, n = no)\n",
  "n",
);

if (!fromWho || !toWho) {
  alert("Sender or reciver address can not be empty.\n");
  Deno.exit();
}

// 提示使用者打信種類
console.log(`
  1) ✨ Text
  2) ✨ With attachments
  3) ✨ By eml
  `);

const mailType = prompt(
  "🪧 select an option which show above.  📧 (default = 1, Ctrl + c = cancel)" +
    "\n >",
);

// Exit program when user don't wanna continue.
if (mailType === null) {
  alert("You didn't chose any one.");
  Deno.exit();
}

enum mailTypes {
  Text = "1",
  TextWithAttachment = "2",
  TextWithBlob = "3",
}

// validate mailType
if (!Object.values(mailTypes).includes(mailType as mailTypes)) {
  console.log(
    "%cOpps! your input number is out of range.",
    "color: red",
  );
  Deno.exit();
}

/** 依照用戶輸入打信 */
prepareMailSetThenSend(mailType);

async function prepareMailSetThenSend(mailType: string): Promise<void> {
  console.log(`%c 發信類型:${mailType}`, "color:red");
  console.log(`%c 打信IP:${targetIP}`, "color:red");
  const config: SendConfig = {
    from: "weitingshih@softnext.com.tw",
    to: [
      "weitingshih@softnext.com.tw",
    ],
    cc: [
      "weitingshih@softnext.com.tw",
    ],
    // bcc: ["weitingshih@rd01.softnext.com.tw", "weitingshih@rd01.softnext.com.tw"],
    subject: "1234",
    content: "test",
    html: "<p>...</p>",
    // attachments: [textAttachment],
  };

  switch (mailType) {
    case mailTypes.Text: {
      // do send text mail.
      await send(clientOptions, config);
      break;
    }
    case mailTypes.TextWithAttachment: {
      const textAttachment: Attachment = {
        contentType: "text/plain",
        filename: "text.txt",
        encoding: "text",
        content: "1234",
      };
      config.attachments = [textAttachment];
      await send(clientOptions, config);
      break;
    }
    default:
      console.log("Nothing to do.");
      break;
  }
}

/** 發送信件 */
async function send(
  options: ClientOptions,
  config: SendConfig,
): Promise<number> {
  // init smtp clint
  const client = new SMTPClient(options);
  let result = 0;
  try {
    await client.send(config);
    await client.close();
    console.log("mail has been sended");
    result = 1;
  } catch (error) {
    console.log(`Reason: ${error.name}`);
    result = -1;
  }
  return result;
}

import { SMTPClient } from "https://deno.land/x/denomailer@1.4.0/mod.ts";
import { Attachment } from "https://deno.land/x/denomailer@1.4.0/config/mail/attachments.ts";
// import { select } from 'https://deno.land/x/inquirer/mod.ts'; //套件不相容 deno 1.26
// import figlet from "https://dzjd3wnuerwiybhjc6w4aqtpnm46ble4dcfbb6jn7w3upjcmpraa.arweave.net/HlI92bQkbIwE6RetwEJvazngrJwYihD5Lf23R6RMfEA/mod.js";
import figlet from "https://dzjd3wnuerwiybhjc6w4aqtpnm46ble4dcfbb6jn7w3upjcmpraa.arweave.net/HlI92bQkbIwE6RetwEJvazngrJwYihD5Lf23R6RMfEA/mod.js";

let httpRequests = 0;
addEventListener(
  "httpRequestEvent",
  () => console.log("Total requests", ++httpRequests),
);
/** Title */
const myAwesomeFiglet = await figlet("Send Mail CLI");
console.log(`%c${myAwesomeFiglet}`, "color:gold;");

/** 詢問要目標機器 IP */
const targetIP = prompt("Input Target IP:", "192.168.91.76");

console.log(`
1) 純文字信件
2) 夾帶檔案
3) 使用 eml 檔案
`);
let mailType = prompt('選擇你要的打信類型 📧(不輸入預設為 "1")');
if (mailType === null || ![1, 2, 3].includes(parseInt(mailType))) {
  console.log(
    "%cOpps! your input number is out of range.\nusing 1 for default value.",
    "color: red",
  );
  mailType = "1"; // set default is 1.
}

prepareMailSet(mailType);
Deno.exit();
/** targetIP 放到 hostname */
const client = new SMTPClient({
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
});

const textAttachment: Attachment = {
  contentType: "text/plain",
  filename: "text.txt",
  encoding: "text",
  content: "1234",
};
try {
  await client.send({
    from: "weitingshih@softnext.com.tw",
    to: [
      "weitingshih@rd01.softnext.com.tw",
      "weitingshih@rd01.softnext.com.tw",
    ],
    cc: [
      "weitingshih@rd01.softnext.com.tw",
      "weitingshih@rd01.softnext.com.tw",
    ],
    // bcc: ["weitingshih@rd01.softnext.com.tw", "weitingshih@rd01.softnext.com.tw"],
    subject: "1234",
    content: "test",
    html: "<p>...</p>",
    attachments: [textAttachment],
  });
  await client.close();
  console.log("mail has been sended");
} catch (error) {
  console.log("here");
  console.log(Object.keys(error));
  console.log("%s:: %s", error.name, error.code);
}

async function prepareMailSet(mailType: string): Promise<void> {
  console.log("111:", mailType);
}

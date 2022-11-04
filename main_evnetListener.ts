import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`%cgot ${e.type} event in event handler (main)`, "color:red;");
};

globalThis.addEventListener("load", handler);

globalThis.addEventListener("beforeunload", handler);

globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`%cgot ${e.type} event in onload function (main)`, "color:red");
};

globalThis.onbeforeunload = (e: Event): void => {
  console.log(
    `%cgot ${e.type} event in onbeforeunload function (main)`,
    "color:red",
  );
};

globalThis.onunload = (e: Event): void => {
  console.log(`%cgot ${e.type} event in onunload function (main)`, "color:red");
};

console.log("log from main script");

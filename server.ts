const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("readme");

console.log("%c%s", "color:red;", decoder.decode(data));

const encoder = new TextEncoder();
const text = encoder.encode("Hello again.");

await Deno.writeFile("readme", text);

// Deno.exit()
// Deno.serve(
//     { port: 4500 },
//     () => new Response("Hello, world!")
// );

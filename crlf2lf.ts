const IGNORED_DIRECTORIES = new Set([".git"]);

async function getFilesList(
  directory: string,
): Promise<string[]> {
  const foundFiles: string[] = [];
  for await (const fileOrFolder of Deno.readDir(directory)) {
    if (fileOrFolder.isDirectory) {
      if (IGNORED_DIRECTORIES.has(fileOrFolder.name)) {
        // Skip this folder, it's in the ignore list.
        continue;
      }
      // If it's not ignored, recurse and search this folder for files.
      const nestedFiles = await getFilesList(
        `${directory}/${fileOrFolder.name}`,
      );
      foundFiles.push(...nestedFiles);
    } else {
      // We found a file, so store it.
      foundFiles.push(`${directory}/${fileOrFolder.name}`);
    }
  }
  return foundFiles;
}

const files = await getFilesList(Deno.cwd());
console.log(files);
// for await (const dirEntry of Deno.readDir("/snmsqr")) {
//   // console.log(dirEntry.name);
//   if (dirEntry.isDirectory) {
//     console.log(dirEntry.name)
//   }
// }
Deno.exit();
const data = await Deno.readFile("d:/snmsqr/routes/web.php");
console.log(data);

const test1 = data.filter((v, _i, _a) => {
  return v !== 13;
});

await Deno.writeFile("d:/snmsqr/routes/web.php", test1);

console.log(test1);

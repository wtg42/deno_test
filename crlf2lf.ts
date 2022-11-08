alert("Make sure you know whcih working directory you're in.");
prompt("Enter directory name whcih you want to...")
const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".gitlab",
]);
// const tstring = ".env";
// let re = /.*/i;
// let found = re.test(tstring);
// console.log(found)
// Deno.exit();
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
      // ignore binary file.
      const re = /(\.jpg$)|(\.png$)|(\.gif$)/i;
      if (re.test(fileOrFolder.name)) {
        // console.log("1111:", fileOrFolder.name)
        continue;
      }
      // We found a file, so store it.
      foundFiles.push(`${directory}/${fileOrFolder.name}`);
    }
  }
  return foundFiles;
}

// const files = await getFilesList(Deno.cwd());
const files = await getFilesList("/snmsqr");
console.table(files);
for (const file of files) {
  const data = await Deno.readFile(file);
  console.log(file);

  // await Deno.writeTextFile("modify_file.txt", `${file}\r\n`, {append: true});
  const test1 = data.filter((v, _i, _a) => {
    return v !== 13;
  });

  await Deno.writeFile(file, test1);
}

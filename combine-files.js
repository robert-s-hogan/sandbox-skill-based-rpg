const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = "combined.txt";
const EXCLUDED_DIRS = ["node_modules", ".git", "dist", "build"];
const INCLUDED_EXTENSIONS = [
  ".js",
  ".ts",
  ".vue",
  ".json",
  ".txt",
  ".html",
  ".css",
  ".scss",
  ".md",
];

function isExcluded(dir) {
  return EXCLUDED_DIRS.includes(path.basename(dir));
}

function isIncluded(file) {
  return INCLUDED_EXTENSIONS.includes(path.extname(file));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && !isExcluded(fullPath)) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (stats.isFile() && isIncluded(fullPath)) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

function combineFiles(outputPath = OUTPUT_FILE) {
  const allFiles = getAllFiles(process.cwd());
  let output = "";

  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8");
    output += `\n\n// --- File: ${file} ---\n\n${content}`;
  }

  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`✅ Combined ${allFiles.length} files into ${outputPath}`);
}

combineFiles();

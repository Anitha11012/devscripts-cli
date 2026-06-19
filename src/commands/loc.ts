import fs from "fs";
import path from "path";

const ignoredDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next"
];

export function countLines(rootDir: string) {
  let totalLines = 0;
  let totalFiles = 0;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !ignoredDirs.includes(entry)
      ) {
        walk(fullPath);
      }

      if (stat.isFile()) {
        const content = fs.readFileSync(
          fullPath,
          "utf8"
        );

        totalLines += content.split("\n").length;
        totalFiles++;
      }
    }
  }

  walk(rootDir);

  console.log(`Files: ${totalFiles}`);
  console.log(`Lines: ${totalLines}`);
}
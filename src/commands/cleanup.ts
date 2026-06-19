import fs from "fs";
import path from "path";

const TARGET_FOLDERS = [
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo"
];

export function cleanup(rootDir: string) {
  let deletedCount = 0;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);

      if (!fs.existsSync(fullPath)) continue;

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (TARGET_FOLDERS.includes(entry)) {
          try {
            fs.rmSync(fullPath, {
              recursive: true,
              force: true
            });

            console.log(`🗑 Deleted: ${fullPath}`);
            deletedCount++;
          } catch (error) {
            console.error(`❌ Failed: ${fullPath}`);
          }
        } else {
          walk(fullPath);
        }
      }
    }
  }

  walk(rootDir);

  console.log("\n================");
  console.log(`Deleted folders: ${deletedCount}`);
}
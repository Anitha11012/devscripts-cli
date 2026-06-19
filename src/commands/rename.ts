import fs from "fs";
import path from "path";

export function renameFiles(
  rootDir: string,
  search: string,
  replace: string
) {
  let renamedCount = 0;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        if (entry.includes(search)) {
          const newName = entry.replace(
            search,
            replace
          );

          const newPath = path.join(
            dir,
            newName
          );

          try {
            fs.renameSync(
              fullPath,
              newPath
            );

            console.log(
              `✏ ${entry} → ${newName}`
            );

            renamedCount++;
          } catch (error) {
            console.error(
              `❌ Failed to rename ${entry}`
            );
          }
        }
      }
    }
  }

  walk(rootDir);

  console.log("\n================");
  console.log(
    `Files renamed: ${renamedCount}`
  );
}
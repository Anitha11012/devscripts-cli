import fs from "fs";
import path from "path";

export function findTodos(dir: string) {
  function walk(folder: string) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
      const fullPath = path.join(folder, file);

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const content = fs.readFileSync(
          fullPath,
          "utf8"
        );

        const lines = content.split("\n");

        lines.forEach((line, index) => {
          if (
            line.includes("TODO") ||
            line.includes("FIXME")
          ) {
            console.log(
              `${fullPath}:${index + 1} ${line.trim()}`
            );
          }
        });
      }
    }
  }

  walk(dir);
}
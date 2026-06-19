#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/loc.ts
import fs from "fs";
import path from "path";
var ignoredDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next"
];
function countLines(rootDir) {
  let totalLines = 0;
  let totalFiles = 0;
  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !ignoredDirs.includes(entry)) {
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

// src/commands/apiTest.ts
import axios from "axios";
async function apiTest(url) {
  try {
    const start = Date.now();
    const response = await axios.get(url);
    const duration = Date.now() - start;
    console.log(`Status: ${response.status}`);
    console.log(`Response Time: ${duration}ms`);
  } catch (error) {
    console.error("Request failed");
  }
}

// src/commands/findTodos.ts
import fs2 from "fs";
import path2 from "path";
function findTodos(dir) {
  function walk(folder) {
    const files = fs2.readdirSync(folder);
    for (const file of files) {
      const fullPath = path2.join(folder, file);
      const stat = fs2.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const content = fs2.readFileSync(
          fullPath,
          "utf8"
        );
        const lines = content.split("\n");
        lines.forEach((line, index) => {
          if (line.includes("TODO") || line.includes("FIXME")) {
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

// src/commands/cleanup.ts
import fs3 from "fs";
import path3 from "path";
var TARGET_FOLDERS = [
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo"
];
function cleanup(rootDir) {
  let deletedCount = 0;
  function walk(dir) {
    const entries = fs3.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path3.join(dir, entry);
      if (!fs3.existsSync(fullPath)) continue;
      const stat = fs3.statSync(fullPath);
      if (stat.isDirectory()) {
        if (TARGET_FOLDERS.includes(entry)) {
          try {
            fs3.rmSync(fullPath, {
              recursive: true,
              force: true
            });
            console.log(`\u{1F5D1} Deleted: ${fullPath}`);
            deletedCount++;
          } catch (error) {
            console.error(`\u274C Failed: ${fullPath}`);
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

// src/commands/rename.ts
import fs4 from "fs";
import path4 from "path";
function renameFiles(rootDir, search, replace) {
  let renamedCount = 0;
  function walk(dir) {
    const entries = fs4.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path4.join(dir, entry);
      const stat = fs4.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        if (entry.includes(search)) {
          const newName = entry.replace(
            search,
            replace
          );
          const newPath = path4.join(
            dir,
            newName
          );
          try {
            fs4.renameSync(
              fullPath,
              newPath
            );
            console.log(
              `\u270F ${entry} \u2192 ${newName}`
            );
            renamedCount++;
          } catch (error) {
            console.error(
              `\u274C Failed to rename ${entry}`
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

// src/commands/doctor.ts
import fs5 from "fs";
import path5 from "path";
function doctor(rootDir) {
  console.log("\n\u{1F50D} Repository Health Check\n");
  const checks = [
    {
      label: "README.md",
      exists: fs5.existsSync(
        path5.join(rootDir, "README.md")
      )
    },
    {
      label: "package.json",
      exists: fs5.existsSync(
        path5.join(rootDir, "package.json")
      )
    },
    {
      label: ".gitignore",
      exists: fs5.existsSync(
        path5.join(rootDir, ".gitignore")
      )
    },
    {
      label: "Dockerfile",
      exists: fs5.existsSync(
        path5.join(rootDir, "Dockerfile")
      )
    },
    {
      label: ".env.example",
      exists: fs5.existsSync(
        path5.join(rootDir, ".env.example")
      )
    },
    {
      label: "GitHub Actions",
      exists: fs5.existsSync(
        path5.join(
          rootDir,
          ".github",
          "workflows"
        )
      )
    },
    {
      label: "Tests Folder",
      exists: fs5.existsSync(
        path5.join(rootDir, "tests")
      ) || fs5.existsSync(
        path5.join(rootDir, "__tests__")
      )
    }
  ];
  let score = 0;
  checks.forEach((check) => {
    if (check.exists) {
      console.log(`\u2705 ${check.label}`);
      score++;
    } else {
      console.log(`\u274C ${check.label}`);
    }
  });
  console.log(
    `
\u{1F4CA} Score: ${score}/${checks.length}`
  );
  if (score === checks.length) {
    console.log("\u{1F3C6} Excellent project health!");
  } else if (score >= 4) {
    console.log("\u{1F44D} Good, but can improve.");
  } else {
    console.log("\u26A0 Needs attention.");
  }
}

// src/index.ts
var program = new Command();
program.name("devscripts").description("Developer Automation Toolkit").version("1.0.0");
program.command("loc").description("Count project lines of code").action(() => {
  countLines(process.cwd());
});
program.command("api-test <url>").description("Test API endpoint").action(async (url) => {
  await apiTest(url);
});
program.command("find-todos").description("Find TODO and FIXME comments").action(() => {
  findTodos(process.cwd());
});
program.command("cleanup").description(
  "Remove node_modules, dist, build, coverage folders"
).action(() => {
  cleanup(process.cwd());
});
program.command("rename <search> <replace>").description("Bulk rename files").action((search, replace) => {
  renameFiles(
    process.cwd(),
    search,
    replace
  );
});
program.command("doctor").description("Check repository health").action(() => {
  doctor(process.cwd());
});
program.parse();

#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/commands/loc.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
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
    const entries = import_fs.default.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = import_path.default.join(dir, entry);
      const stat = import_fs.default.statSync(fullPath);
      if (stat.isDirectory() && !ignoredDirs.includes(entry)) {
        walk(fullPath);
      }
      if (stat.isFile()) {
        const content = import_fs.default.readFileSync(
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
var import_axios = __toESM(require("axios"));
async function apiTest(url) {
  try {
    const start = Date.now();
    const response = await import_axios.default.get(url);
    const duration = Date.now() - start;
    console.log(`Status: ${response.status}`);
    console.log(`Response Time: ${duration}ms`);
  } catch (error) {
    console.error("Request failed");
  }
}

// src/commands/findTodos.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
function findTodos(dir) {
  function walk(folder) {
    const files = import_fs2.default.readdirSync(folder);
    for (const file of files) {
      const fullPath = import_path2.default.join(folder, file);
      const stat = import_fs2.default.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const content = import_fs2.default.readFileSync(
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
var import_fs3 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));
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
    const entries = import_fs3.default.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = import_path3.default.join(dir, entry);
      if (!import_fs3.default.existsSync(fullPath)) continue;
      const stat = import_fs3.default.statSync(fullPath);
      if (stat.isDirectory()) {
        if (TARGET_FOLDERS.includes(entry)) {
          try {
            import_fs3.default.rmSync(fullPath, {
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
var import_fs4 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
function renameFiles(rootDir, search, replace) {
  let renamedCount = 0;
  function walk(dir) {
    const entries = import_fs4.default.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = import_path4.default.join(dir, entry);
      const stat = import_fs4.default.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        if (entry.includes(search)) {
          const newName = entry.replace(
            search,
            replace
          );
          const newPath = import_path4.default.join(
            dir,
            newName
          );
          try {
            import_fs4.default.renameSync(
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
var import_fs5 = __toESM(require("fs"));
var import_path5 = __toESM(require("path"));
function doctor(rootDir) {
  console.log("\n\u{1F50D} Repository Health Check\n");
  const checks = [
    {
      label: "README.md",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, "README.md")
      )
    },
    {
      label: "package.json",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, "package.json")
      )
    },
    {
      label: ".gitignore",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, ".gitignore")
      )
    },
    {
      label: "Dockerfile",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, "Dockerfile")
      )
    },
    {
      label: ".env.example",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, ".env.example")
      )
    },
    {
      label: "GitHub Actions",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(
          rootDir,
          ".github",
          "workflows"
        )
      )
    },
    {
      label: "Tests Folder",
      exists: import_fs5.default.existsSync(
        import_path5.default.join(rootDir, "tests")
      ) || import_fs5.default.existsSync(
        import_path5.default.join(rootDir, "__tests__")
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
var program = new import_commander.Command();
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

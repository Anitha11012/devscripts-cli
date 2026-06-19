#!/usr/bin/env node

import { Command } from "commander";
import { countLines } from "./commands/loc";
import { apiTest } from "./commands/apiTest.js";
import { findTodos } from "./commands/findTodos.js";
import { cleanup } from "./commands/cleanup.js";
import { renameFiles } from "./commands/rename.js";
import { doctor } from "./commands/doctor.js";
import { initProject } from "./commands/init.js";
import { envCheck } from "./commands/envCheck.js";

const program = new Command();

program
  .name("devscripts")
  .description("Developer Automation Toolkit")
  .version("1.0.0");

program
  .command("loc")
  .description("Count project lines of code")
  .action(() => {
    countLines(process.cwd());
  });

  program
  .command("api-test <url>")
  .description("Test API endpoint")
  .action(async (url) => {
    await apiTest(url);
  });

  program
  .command("find-todos")
  .description("Find TODO and FIXME comments")
  .action(() => {
    findTodos(process.cwd());
  });

  program
  .command("cleanup")
  .description(
    "Remove node_modules, dist, build, coverage folders"
  )
  .action(() => {
    cleanup(process.cwd());
  });

  program
  .command("rename <search> <replace>")
  .description("Bulk rename files")
  .action((search, replace) => {
    renameFiles(
      process.cwd(),
      search,
      replace
    );
  });

  program
  .command("doctor")
  .description("Check repository health")
  .action(() => {
    doctor(process.cwd());
  });

  program
  .command("init")
  .description(
    "Generate starter project structure"
  )
  .action(() => {
    initProject(process.cwd());
  });

  program
  .command("env-check")
  .description("Validate env variables")
  .action(() => {
    envCheck(process.cwd());
  });

program.parse();
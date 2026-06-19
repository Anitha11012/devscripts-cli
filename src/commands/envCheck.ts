import fs from "fs";
import path from "path";

export function envCheck(rootDir: string) {
  const exampleFile = path.join(
    rootDir,
    ".env.example"
  );

  const envFile = path.join(
    rootDir,
    ".env"
  );

  if (
    !fs.existsSync(exampleFile) ||
    !fs.existsSync(envFile)
  ) {
    console.log(
      "Missing .env or .env.example"
    );
    return;
  }

  const required = fs
    .readFileSync(exampleFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("=")[0]);

  const actual = fs.readFileSync(
    envFile,
    "utf8"
  );

  required.forEach((key) => {
    if (actual.includes(`${key}=`)) {
      console.log(`✅ ${key}`);
    } else {
      console.log(`❌ ${key}`);
    }
  });
}
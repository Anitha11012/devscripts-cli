import fs from "fs";
import path from "path";

export function doctor(rootDir: string) {
  console.log("\n🔍 Repository Health Check\n");

  const checks = [
    {
      label: "README.md",
      exists: fs.existsSync(
        path.join(rootDir, "README.md")
      ),
    },
    {
      label: "package.json",
      exists: fs.existsSync(
        path.join(rootDir, "package.json")
      ),
    },
    {
      label: ".gitignore",
      exists: fs.existsSync(
        path.join(rootDir, ".gitignore")
      ),
    },
    {
      label: "Dockerfile",
      exists: fs.existsSync(
        path.join(rootDir, "Dockerfile")
      ),
    },
    {
      label: ".env.example",
      exists: fs.existsSync(
        path.join(rootDir, ".env.example")
      ),
    },
    {
      label: "GitHub Actions",
      exists: fs.existsSync(
        path.join(
          rootDir,
          ".github",
          "workflows"
        )
      ),
    },
    {
      label: "Tests Folder",
      exists:
        fs.existsSync(
          path.join(rootDir, "tests")
        ) ||
        fs.existsSync(
          path.join(rootDir, "__tests__")
        ),
    },
  ];

  let score = 0;

  checks.forEach((check) => {
    if (check.exists) {
      console.log(`✅ ${check.label}`);
      score++;
    } else {
      console.log(`❌ ${check.label}`);
    }
  });

  console.log(
    `\n📊 Score: ${score}/${checks.length}`
  );

  if (score === checks.length) {
    console.log("🏆 Excellent project health!");
  } else if (score >= 4) {
    console.log("👍 Good, but can improve.");
  } else {
    console.log("⚠ Needs attention.");
  }
}
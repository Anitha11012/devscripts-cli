# DevScripts CLI 🚀

A developer automation toolkit built with TypeScript and Node.js to simplify common development workflows.

## Features

* 📊 Count lines of code in a project
* 🔍 Find TODO and FIXME comments
* 🌐 Test API endpoints from the terminal
* 🧹 Clean build artifacts and dependency folders
* ✏️ Bulk rename files
* 🩺 Audit repository health
* 🏗️ Generate starter project structures
* ⚙️ Validate project environments

---

## Installation

### Global Installation

```bash
npm install -g devscripts-cli
```

### Verify Installation

```bash
devscripts --help
```

---

## Commands

### 1. Count Lines of Code

Count files and lines of code in the current project.

```bash
devscripts loc
```

Example Output:

```text
Files: 42
Lines: 5281
```

---

### 2. Find TODOs

Scan a project for TODO and FIXME comments.

```bash
devscripts find-todos
```

Example Output:

```text
src/auth.ts:12 TODO add validation
src/api.ts:41 FIXME improve error handling
```

---

### 3. API Testing

Quickly test an API endpoint.

```bash
devscripts api-test https://api.github.com
```

Example Output:

```text
Status: 200
Response Time: 182ms
```

---

### 4. Cleanup Project

Remove generated folders and dependencies.

```bash
devscripts cleanup
```

Removes:

* node_modules
* dist
* build
* coverage
* .next
* .turbo

Example Output:

```text
Deleted: node_modules
Deleted: dist

Deleted folders: 2
```

---

### 5. Bulk Rename Files

Rename files using text replacement.

```bash
devscripts rename old new
```

Example:

Before:

```text
old-header.ts
old-footer.ts
old-button.ts
```

After:

```text
new-header.ts
new-footer.ts
new-button.ts
```

---

### 6. Repository Health Check

Analyze project structure and best practices.

```bash
devscripts doctor
```

Checks:

* README.md
* package.json
* .gitignore
* Dockerfile
* .env.example
* GitHub Actions
* Test folders

Example Output:

```text
Repository Health Check

README.md        ✓
package.json     ✓
Dockerfile       ✗
Tests Folder     ✗

Score: 5/7
```

---

### 7. Initialize a Project

Generate a starter project structure.

```bash
devscripts init
```

Creates:

```text
src/
tests/
.github/workflows/

README.md
.gitignore
.env.example
```

Example Output:

```text
Created src
Created tests
Created .github/workflows

Project initialized successfully
```

---

### 8. Environment Validation

Validate required environment variables.

```bash
devscripts env-check
```

Example Output:

```text
DATABASE_URL ✓
JWT_SECRET ✓
REDIS_URL ✗
```

---

## Development

Clone the repository:

```bash
git clone https://github.com/Anitha11012/devscripts-cli.git
```

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run type checking:

```bash
npm run type-check
```

---

## Tech Stack

* TypeScript
* Node.js
* Commander.js
* Axios
* Chalk
* Inquirer
* Ora
* GitHub Actions

---

## Roadmap

### Version 1.1

* Dependency audit
* Project diagnostics improvements
* Enhanced reporting

### Version 1.2

* Project templates
* Release automation
* Git workflow helpers

### Version 2.0

* Plugin system
* Custom command support
* Team configuration profiles

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT License

---

Built with ❤️ using TypeScript and Node.js.

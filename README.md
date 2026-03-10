# k6 + TypeScript Performance Testing Example

A minimal example project demonstrating **API performance testing using k6 with TypeScript**.

The test simulates **3 parallel users** browsing a paginated user list endpoint.

Target endpoint:

```
GET https://reqres.in/api/users?page=1
```

Purpose:

* simulate browsing user lists
* measure pagination endpoint performance
* verify the response status (`200 OK`)

---

# Project Structure

```
k6-reqres-performance/
│
├── .github/
│   └── workflows/
│       └── k6.yml
│
├── src/
│   └── users.test.ts
│
├── dist/
│
├── package.json
├── tsconfig.json
└── README.md
```

Explanation:

| Path                       | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `.github/workflows/k6.yml` | CI pipeline running the performance test             |
| `src/users.test.ts`        | TypeScript k6 performance test                       |
| `dist/`                    | Compiled JavaScript output generated from TypeScript |
| `package.json`             | Project dependencies and npm scripts                 |
| `tsconfig.json`            | TypeScript compiler configuration                    |

---

# Requirements (Windows 11 Local Environment)

The following tools should be installed on **Windows 11**:

| Tool       | Recommended Version   | Purpose                    |
| ---------- | --------------------- | -------------------------- |
| Node.js    | ≥ 18                  | JavaScript runtime         |
| npm        | included with Node.js | dependency management      |
| TypeScript | latest                | compiling TypeScript tests |
| k6         | latest                | performance testing tool   |
| Git        | latest                | repository management      |

---

## Install Node.js

Download and install from:

https://nodejs.org

Verify installation:

```powershell
node -v
npm -v
```

---

## Install TypeScript

Install globally:

```powershell
npm install -g typescript
```

Verify:

```powershell
tsc -v
```

---

## Install k6 on Windows

The recommended method on Windows is **Scoop**.

### Install Scoop

Run in **PowerShell**:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

### Install k6

```powershell
scoop install k6
```

Verify installation:

```powershell
k6 version
```

Official documentation:

https://k6.io/docs/get-started/installation/

---

# How to Run the Project

## 1. Install dependencies

Inside the project directory:

```bash
npm install
```

---

## 2. Build TypeScript tests

Compile TypeScript files to JavaScript.

```bash
npm run build
```

The compiled files will be generated in:

```
dist/
```

---

## 3. Run the performance test

```bash
k6 run dist/users.test.js
```

---

## 4. Run using npm script

```bash
npm test
```

---

# Test Scenario

| Parameter         | Value                   |
| ----------------- | ----------------------- |
| Virtual Users     | 3                       |
| Duration          | 20 seconds              |
| Request           | `GET /api/users?page=1` |
| Expected Response | `200 OK`                |

This test simulates **multiple users browsing a paginated user list endpoint**.

---

# Continuous Integration

The project includes a **GitHub Actions workflow** that automatically runs the performance test.

Workflow steps:

1. checkout repository
2. install Node.js
3. install project dependencies
4. install k6
5. compile TypeScript
6. execute the performance test

Workflow file:

```
.github/workflows/k6.yml
```

The pipeline runs on:

* push to `main`
* pull requests

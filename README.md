# k6 + TypeScript: API Performance Testing Example

[![CI - k6 Performance Testing](https://github.com/piotrapl/k6-typescript-randomuser-performance-tests/actions/workflows/k6.yml/badge.svg)](https://github.com/piotrapl/k6-typescript-randomuser-performance-tests/actions/workflows/k6.yml)

**Performance testing project using k6 + TypeScript** targeting a public API endpoint.

**Scenario**

* Endpoint: `GET https://randomuser.me/api/?results=5`
* Purpose: simulate browsing user lists
* Expected response: `200 OK`

**Workload Model**

* Virtual users: **3**
* Test duration: **20 seconds**
* Iteration model: **constant load**
* Think time between requests: **1 second**

**Performance Thresholds**

* `http_req_failed` < **1%**
* `http_req_duration p(95)` < **800 ms**

Threshold violations cause the **CI pipeline to fail**.

**CI Pipeline**

Automated execution via **GitHub Actions**:

* install Node.js
* install dependencies
* install k6
* build TypeScript
* execute performance test

Workflow file: `.github/workflows/k6.yml`

---

# Project Structure

```
k6-typescript-randomuser-performance-tests/
│
├── .github/
│   └── workflows/
│       └── k6.yml
│
├── src/
│   └── randomUsers.test.ts
│
├── dist/
│
├── package.json
├── tsconfig.json
└── README.md
```

| Path                       | Description                           |
| -------------------------- | ------------------------------------- |
| `.github/workflows/k6.yml` | CI pipeline running performance tests |
| `src/randomUers.test.ts`   | TypeScript test scenario              |
| `dist/`                    | compiled JavaScript output            |
| `package.json`             | project dependencies and scripts      |
| `tsconfig.json`            | TypeScript configuration              |

---

# Requirements (Windows 11)

The project is intended to run locally on **Windows 11**.

Required tools:

| Tool         | Purpose                       |
| ------------ | ----------------------------- |
| Node.js ≥ 18 | JavaScript runtime            |
| npm          | dependency management         |
| TypeScript   | compile test scripts          |
| k6           | performance testing framework |
| Git          | version control               |

Verify installation:

```
node -v
npm -v
tsc -v
k6 version
```

Recommended installation method for **k6 on Windows** is using Scoop.

Install Scoop:

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

Install k6:

```
scoop install k6
```

---

# How to Run

### Install dependencies

```
npm install
```

---

### Compile TypeScript

```
npm run build
```

Compiled files will appear in:

```
dist/
```

---

### Execute performance test

```
k6 run dist/randomUsers.test.js
```

---

### Run via npm script

```
npm test
```

---

# Test Scenario Details

The test script performs repeated requests to the public API endpoint:

```
GET https://randomuser.me/api/?results=5
```

Each virtual user:

1. sends a request to the endpoint
2. verifies the response status
3. waits for a short think time
4. repeats the request until the test duration ends

This simulates **multiple users requesting random opersonal data**.

---

# Continuous Integration

The repository includes automated performance testing using **GitHub Actions**.

Pipeline steps:

1. checkout repository
2. install Node.js
3. install project dependencies
4. install k6
5. compile TypeScript
6. execute performance test

Workflow file location:

```
.github/workflows/k6.yml
```

The pipeline runs automatically on:

* push to `main`
* pull requests

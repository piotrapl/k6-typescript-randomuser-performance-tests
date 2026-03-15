import http from "k6/http";
import { check, sleep } from "k6";

// HTML report generator
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {

  scenarios: {

    sequenceA_singleUser: {
      executor: "constant-vus",
      exec: "sequenceA",
      vus: 1,
      duration: "10s",
      tags: { sequence: "A - getting data of 1 random user" }
    },

    sequenceA_parallelUsers: {
      executor: "constant-vus",
      exec: "sequenceA",
      vus: 7,
      duration: "10s",
      startTime: "10s",
      tags: { sequence: "A - getting data of 1 random user" }
    },

    sequenceB_singleUser: {
      executor: "constant-vus",
      exec: "sequenceB",
      vus: 1,
      duration: "10s",
      startTime: "20s",
      tags: { sequence: "B - getting data of 7 random users" }
    },

    sequenceB_parallelUsers: {
      executor: "constant-vus",
      exec: "sequenceB",
      vus: 7,
      duration: "10s",
      startTime: "30s",
      tags: { sequence: "B - getting data of 7 random users" }
    }

  },

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"]
  }

};


// Sequence A
export function sequenceA() {

  const url = "https://randomuser.me/api/?results=1";

  const response = http.get(url, {
    tags: { endpoint: "results=1" }
  });

  check(response, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);
}


// Sequence B
export function sequenceB() {

  const url = "https://randomuser.me/api/?results=7";

  const response = http.get(url, {
    tags: { endpoint: "results=7" }
  });

  check(response, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);
}


// generate HTML report
export function handleSummary(data: any) {

  return {
    "reports/performance-report.html": htmlReport(data)
  };

}
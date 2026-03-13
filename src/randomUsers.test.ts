import http from "k6/http";
import { check, sleep } from "k6";

// HTML reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {

  stages: [
    { duration: "10s", target: 1 },
    { duration: "10s", target: 2 }
  ],

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"]
  }

};

export default function () {

  const url = "https://randomuser.me/api/?results=5";

  const response = http.get(url);

  check(response, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);

}


// generate report after test
export function handleSummary(data: any) {

  return {
    "reports/performance-report.html": htmlReport(data)
  };

}
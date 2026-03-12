import http from "k6/http";
import { check, sleep } from "k6";

export const options = {

  stages: [
    { duration: "10s", target: 1 }, // stage 1
    { duration: "10s", target: 2 }, // stage 2
    { duration: "10s", target: 3 }  // stage 3
  ],

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"]
  }

};


// container for request logs
const requestLogs: any[] = [];


export default function () {

  const url = "https://randomuser.me/api/?results=5";

  const response = http.get(url);

  check(response, {
    "status is 200": (r) => r.status === 200
  });

  // store request log entry
  requestLogs.push({
    timestamp: new Date().toISOString(),
    vu: __VU,
    iteration: __ITER,
    request: {
      method: "GET",
      url: url
    },
    response: {
      status: response.status,
      body: response.body
    }
  });

  sleep(1);

}


// export logs after test run
export function handleSummary() {

  return {
    "logs/test-run-log.json": JSON.stringify(requestLogs, null, 2)
  };

}
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {

  stages: [
    { duration: "10s", target: 1 },
    { duration: "10s", target: 2 },
    { duration: "10s", target: 3 }
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

  // save request log
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


// export test summary and logs
export function handleSummary(data: any) {

  return {

    "logs/test-run-log.json": JSON.stringify(requestLogs, null, 2),

    stdout: JSON.stringify(data, null, 2)

  };

}
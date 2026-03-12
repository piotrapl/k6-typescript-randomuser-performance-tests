import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  stages: [
    { duration: "10s", target: 1 },
    { duration: "10s", target: 3 },
    { duration: "10s", target: 0 }
  ],
  thresholds: {
    http_req_duration: ["p(95)<800"],
    http_req_failed: ["rate<0.01"]
  }
};

export default function () {
  const res = http.get("https://randomuser.me/api/");

  check(res, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);
}
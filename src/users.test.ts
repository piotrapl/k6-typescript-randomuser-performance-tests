import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 3,
  duration: "20s"
};

export default function () {

  const url = "https://reqres.in/api/users?page=1";

  const response = http.get(url);

  check(response, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);
}
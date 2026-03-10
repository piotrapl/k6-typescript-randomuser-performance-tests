import http from "k6/http";
import { sleep } from "k6";

import { options } from "../config/options";
import { validateUsersResponse } from "../utils/checks";

export { options };

const BASE_URL = "https://reqres.in/api";

export default function () {

  const response = http.get(`${BASE_URL}/users?page=1`);

  validateUsersResponse(response);

  sleep(1);

}
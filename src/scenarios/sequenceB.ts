import { check, sleep, group } from "k6";
import { Trend, Rate } from "k6/metrics";
import { getRandomUsers } from "../services/randomUserService";

export const sequenceB_duration = new Trend("sequenceB_duration");
export const sequenceB_errors = new Rate("sequenceB_errors");

export function sequenceB() {

  group("Sequence B - getting data of 10 random users", () => {

    const res = getRandomUsers(10, "sequenceB");

    const ok = check(res, {
      "status is 200": (r) => r.status === 200
    });

    sequenceB_duration.add(res.timings.duration);
    sequenceB_errors.add(!ok);

  });

  sleep(1);

}
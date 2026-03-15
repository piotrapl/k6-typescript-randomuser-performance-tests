import { check, sleep, group } from "k6";
import { Trend, Rate } from "k6/metrics";
import { getRandomUsers } from "../services/randomUserService";

export const sequenceA_duration = new Trend("sequenceA_duration");
export const sequenceA_errors = new Rate("sequenceA_errors");

export function sequenceA() {

  group("Sequence A - getting data of 1 random user", () => {

    const res = getRandomUsers(1, "sequenceA");

    const ok = check(res, {
      "status is 200": (r) => r.status === 200
    });

    sequenceA_duration.add(res.timings.duration);
    sequenceA_errors.add(!ok);

  });

  sleep(1);

}
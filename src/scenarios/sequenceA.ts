import { check, sleep, group } from "k6";
import { Trend, Rate } from "k6/metrics";
import { getRandomUsers } from "../services/randomUserService.js";

export const sequenceA_duration = new Trend("sequenceA_duration");
export const sequenceA_errors = new Rate("sequenceA_errors");

/* To jest przykładowa sekwencja, która pobiera dane 1 losowego użytkownika z API randomuser.me. 

sequenceA_duration.add(res.timings.duration); - dodaje czas trwania odpowiedzi do trendu sequenceA_duration, 
    to pozwala nam analizować średni czas odpowiedzi dla tej sekwencji.
sequenceA_errors.add(!ok); - dodaje wartość true do rate sequenceA_errors, 
    jeśli odpowiedź nie jest poprawna (status inny niż 200),
*/
export function sequenceA() {

  group("Sequence A - pobranie danych 1 losowego użytkownika", () => {

    const res = getRandomUsers(1, "sequenceA");

    const ok = check(res, {
      "status is 200": (r) => r.status === 200
    });

    sequenceA_duration.add(res.timings.duration);
    sequenceA_errors.add(!ok);

  });

  sleep(1);

}
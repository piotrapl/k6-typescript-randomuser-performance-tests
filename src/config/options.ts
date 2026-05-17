export const options = {
/* 
opcje testowe dla k6, definiują scenariusze testowe i progi wydajności 
executor "constant-vus" - tzn. test będzie wykonywany z określoną liczbą wirtualnych użytkowników (VUs)
    przez określony czas.
exec - określa, która funkcja testowa ma być wykonywana dla danego scenariusza.
vus: - liczba wirtualnych użytkowników, którzy będą wykonywać test.
duration: - czas trwania testu.
startTime: - czas rozpoczęcia testu.
thresholds - definiują progi wydajności, które muszą być spełnione, by test został uznany za zaliczony.
*/
  scenarios: {

    sequenceA_singleUser: {
      executor: "constant-vus",
      exec: "sequenceA",
      vus: 1,
      duration: "10s"
    },

    sequenceA_parallelUsers: {
      executor: "constant-vus",
      exec: "sequenceA",
      vus: 7,
      duration: "10s",
      startTime: "10s"
    },

    sequenceB_singleUser: {
      executor: "constant-vus",
      exec: "sequenceB",
      vus: 1,
      duration: "10s",
      startTime: "20s"
    },

    sequenceB_parallelUsers: {
      executor: "constant-vus",
      exec: "sequenceB",
      vus: 7,
      duration: "10s",
      startTime: "30s"
    }

  },

  thresholds: {

    "http_req_duration{sequence:sequenceA}": ["p(95)<800"],
    "http_req_duration{sequence:sequenceB}": ["p(95)<800"],

    "http_req_failed{sequence:sequenceA}": ["rate<0.01"],
    "http_req_failed{sequence:sequenceB}": ["rate<0.01"],

    sequenceA_errors: ["rate<0.01"],
    sequenceB_errors: ["rate<0.01"]

  }

};
export const options = {

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

    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"],

    sequenceA_errors: ["rate<0.01"],
    sequenceB_errors: ["rate<0.01"]

  }

};
import { options } from "../config/options";
import { sequenceA } from "../scenarios/sequenceA";
import { sequenceB } from "../scenarios/sequenceB";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export { options };

export { sequenceA, sequenceB };

export function handleSummary(data: any) {

  return {
    "reports/performance-report.html": htmlReport(data)
  };

}
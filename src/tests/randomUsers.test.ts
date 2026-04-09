import { options } from "../config/options.js";
import { sequenceA } from "../scenarios/sequenceA.js";
import { sequenceB } from "../scenarios/sequenceB.js";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export { options };
export { sequenceA, sequenceB };


function filterMetricsBySequence(data: any, sequence: string) {

  const filtered = JSON.parse(JSON.stringify(data));

  const metrics = filtered.metrics;

  Object.keys(metrics).forEach((metric) => {

    if (metrics[metric].values) {
      return;
    }

    if (metrics[metric].thresholds) {
      return;
    }

  });

  return filtered;

}


export function handleSummary(data: any) {

  const reportA = filterMetricsBySequence(data, "sequenceA");
  const reportB = filterMetricsBySequence(data, "sequenceB");

  return {

    "reports/report-sequenceA.html": htmlReport(reportA),
    "reports/report-sequenceB.html": htmlReport(reportB)

  };

}
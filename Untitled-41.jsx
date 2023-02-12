// Define the metrics, label and weights
// metric ranges from 0-10.
// metric value could be 0, 2, 5, 7, 10
const metrics = {
  build: {
    jenkins: 10,
    automaticDeployment: 5,
    apiLint: 5,
    unitTest: 2,
  },
  test: {
    integrationTest: 0,
    functionalTest: 5,
    e2eTest: 7,
    performanceTest: 10,
  },
};

// Define the scoring scale
// scale ranges from 1 to 5
const scoring_scale = {
  build: {
    jenkins: 1,
    automaticDeployment: 1,
    apiLint: 1,
    unitTest: 2,
  },
  test: {
    integrationTest: 2,
    functionalTest: 2,
    e2eTest: 2,
    performanceTest: 3,
  },
};

// Define the scoring labels
const labels = {
  not_implemented: 0,
  low: 2,
  good: 5,
  excellent: 7,
  perfect: 10,
};

// Calculate the scores for each metric
const metric_scores = {};
for (const metric_name in metrics) {
  metric_scores[metric_name] = {};
  for (const sub_metric_name in metrics[metric_name]) {
    const metric_value = metrics[metric_name][sub_metric_name];
    const metric_weight = scoring_scale[metric_name][sub_metric_name];
    const metric_score = metric_value * metric_weight;
    metric_scores[metric_name][sub_metric_name] = metric_score;
  }
}

// Calculate the scores for each label
const label_scores = {};
for (const label_name in labels) {
  label_scores[label_name] = 0;
  for (const metric_name in metrics) {
    for (const sub_metric_name in metrics[metric_name]) {
      const metric_value = metrics[metric_name][sub_metric_name];
      const metric_weight = scoring_scale[metric_name][sub_metric_name];
      const metric_max_value = 10;
      const metric_max_score = metric_max_value * metric_weight;
      const label_value = labels[label_name];
      if (metric_value >= label_value) {
        const metric_label_score =
          metric_max_score * (label_value / metric_max_value);
        label_scores[label_name] += metric_label_score;
      }
    }
  }
}

console.log(metric_scores);
console.log(label_scores);

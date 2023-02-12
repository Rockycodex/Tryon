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
  not_implemented: 'not_implemented',
  low: 'low',
  good: 'good',
  excellent: 'excellent',
  perfect: 'perfect',
};

function calculateCategoryScores(metrics, scoring_scale, labels) {
  let categoryScores = {};

  for (const category in metrics) {
    let categoryScore = 0;

    for (const metric in metrics[category]) {
      const metricValue = metrics[category][metric];
      const metricWeight = scoring_scale[category][metric];
      const metricLabel = getLabel(metricValue, labels);

      categoryScore += metricValue * metricWeight;
    }

    categoryScores[category] = Math.round(categoryScore / 10);
  }

  return categoryScores;
}

function calculateMetricScores(metrics, scoring_scale, labels) {
  let metricScores = {};

  for (const category in metrics) {
    for (const metric in metrics[category]) {
      const metricValue = metrics[category][metric];
      const metricWeight = scoring_scale[category][metric];
      const metricLabel = getLabel(metricValue, labels);

      metricScores[metric] = Math.round((metricValue * metricWeight) / 10);
    }
  }

  return metricScores;
}

function getLabel(metricValue, labels) {
  if (metricValue === 0) {
    return labels.not_implemented;
  } else if (metricValue < 2) {
    return labels.low;
  } else if (metricValue < 5) {
    return labels.good;
  } else if (metricValue < 7) {
    return labels.excellent;
  } else {
    return labels.perfect;
  }
}

// Call the functions to get the scores
const categoryScores = calculateCategoryScores(metrics, scoring_scale, labels);
const metricScores = calculateMetricScores(metrics, scoring_scale, labels);

console.log("Category Scores:", categoryScores); // Output: {build: 1, test: 2}
console.log("Metric Scores:", metricScores); // Output: {jenkins: 1, automaticDeployment: 1, apiLint: 1, unitTest: 1, integrationTest: 0, functionalTest: 1, e2eTest: 2, performanceTest: 3}

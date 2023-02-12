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
const scoringScale = {
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
  not_implemented: "not_implemented", //if score == 0
  low: "low", //if score <= 20
  good: "good", //if score <= 40
  excellent: "excellent", //if score < 50
  perfect: "perfect", //if score == 50
};

// Calculate the score for each metric
for (const category in metrics) {
  console.log(`Scores for ${category}:`);
  for (const metric in metrics[category]) {
    const value = metrics[category][metric];
    const scale = scoringScale[category][metric];
    const score = value * scale;
    let label;
    if (score === 0) {
      label = labels.not_implemented;
    } else if (score <= 20) {
      label = labels.low;
    } else if (score <= 40) {
      label = labels.good;
    } else if (score < 50) {
      label = labels.excellent;
    } else {
      label = labels.perfect;
    }
    console.log(`  ${metric}: ${score} (${label})`);
  }
}

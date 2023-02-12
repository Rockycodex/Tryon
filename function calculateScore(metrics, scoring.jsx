function calculateScore(metrics, scoring_scale, labels) {
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

// Call the function to get the scores for each category
const categoryScores = calculateScore(metrics, scoring_scale, labels);

console.log(categoryScores); // Output: {build: 1, test: 2}

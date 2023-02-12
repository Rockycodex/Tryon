function calculateScore(metrics, scoringScale, labels) {
  const metricScores = {};
  
  for (const category in metrics) {
    metricScores[category] = {};
    
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
      
      metricScores[category][metric] = {
        score: score,
        label: label,
      };
    }
  }
  
  return metricScores;
}

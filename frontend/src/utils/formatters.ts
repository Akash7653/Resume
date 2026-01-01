export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-blue-50 border-blue-200';
  if (score >= 40) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
};

export const getVerdictColor = (verdict: string): string => {
  const verdictLower = verdict?.toLowerCase() || '';
  if (verdictLower.includes('strong') || verdictLower.includes('excellent')) {
    return 'bg-green-100 text-green-800';
  }
  if (verdictLower.includes('good') || verdictLower.includes('average')) {
    return 'bg-blue-100 text-blue-800';
  }
  if (verdictLower.includes('weak') || verdictLower.includes('poor')) {
    return 'bg-red-100 text-red-800';
  }
  return 'bg-gray-100 text-gray-800';
};

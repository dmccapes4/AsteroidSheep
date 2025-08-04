export const getThreatLevelColor = (threatLevel: string) => {
  switch (threatLevel) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getSizeColor = (size: string) => {
  switch (size) {
    case 'small':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'medium':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'large':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'massive':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

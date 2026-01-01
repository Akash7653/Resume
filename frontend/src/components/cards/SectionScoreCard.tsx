import { motion } from 'framer-motion';
import { Progress } from '../ui/Progress';

interface SectionScoreCardProps {
  section: {
    section: string;
    score: number;
    feedback?: string;
  };
  index?: number;
}

export const SectionScoreCard = ({ section, index = 0 }: SectionScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 capitalize">{section.section}</h4>
        <span className={`text-2xl font-bold ${getScoreColor(section.score)}`}>{section.score}%</span>
      </div>
      <Progress value={section.score} color={section.score >= 75 ? 'green' : section.score >= 50 ? 'blue' : section.score >= 25 ? 'yellow' : 'red'} className="mb-3" />
      {section.feedback && <p className="text-sm text-gray-600">{section.feedback}</p>}
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { Check, X, LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  type?: 'success' | 'danger' | 'neutral' | 'matched' | 'missing';
}

export const SkillBadge = ({ skill, type = 'success' }: SkillBadgeProps) => {
  const types = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-700',
      icon: Check,
    },
    danger: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: X,
    },
    neutral: {
      bg: 'bg-gray-50 border-gray-200',
      text: 'text-gray-700',
      icon: null,
    },
    matched: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-700',
      icon: Check,
    },
    missing: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: X,
    },
  };

  const config = types[type];
  const Icon = config.icon as LucideIcon | null;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.bg} ${config.text}`}
    >
      {Icon && <Icon size={14} />}
      {skill}
    </motion.span>
  );
};

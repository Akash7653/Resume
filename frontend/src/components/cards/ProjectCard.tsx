import { motion } from 'framer-motion';
import { Code, TrendingUp } from 'lucide-react';

interface Project {
  title?: string;
  name?: string;
  description?: string;
  tech_stack?: string[];
  impact?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Code className="text-blue-600" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{project.title || project.name}</h4>
          {project.tech_stack && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech_stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {project.impact && (
        <div className="flex items-start gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
          <TrendingUp className="text-green-600 mt-0.5" size={16} />
          <p>{project.impact}</p>
        </div>
      )}
    </motion.div>
  );
};

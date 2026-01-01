import {
  Gauge,
  FileCheck,
  Target,
  Sparkles,
  Search,
  Zap,
  History,
  Shield,
  MessageSquare,
  BarChart3,
  FileText,
  Award
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Gauge,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on how well your resume performs against Applicant Tracking Systems. Know exactly what recruiters see.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
    },
    {
      icon: FileCheck,
      title: 'Resume Strength Report',
      description: 'Comprehensive analysis of your resume covering formatting, keywords, achievements, and overall impact.',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
    },
    {
      icon: Target,
      title: 'Job Description Matching',
      description: 'Upload a job posting and instantly see how well your resume matches. Get specific recommendations to improve alignment.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
    },
    {
      icon: Sparkles,
      title: 'AI Resume Rewrite',
      description: 'Our AI rewrites weak bullet points into powerful, achievement-focused statements that catch recruiter attention.',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100',
    },
    {
      icon: Search,
      title: 'Keyword Gap Detection',
      description: 'Identify missing keywords from job descriptions. Never miss crucial skills or qualifications again.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
    },
    {
      icon: Zap,
      title: 'Action Verb Suggestions',
      description: 'Replace weak language with powerful action verbs. Transform passive descriptions into dynamic achievements.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100',
    },
    {
      icon: History,
      title: 'Resume Version History',
      description: 'Save multiple versions of your resume. Track changes and revert anytime. Perfect for applying to different roles.',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'from-teal-50 to-teal-100',
    },
    {
      icon: Shield,
      title: 'Secure Cloud Storage',
      description: 'Your resumes are encrypted and securely stored. Access from anywhere, anytime with complete peace of mind.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100',
    },
    {
      icon: MessageSquare,
      title: 'AI Cover Letter Generator',
      description: 'Generate tailored cover letters that complement your resume. Personalized for each job application.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'from-cyan-50 to-cyan-100',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your application success rate. See which resume versions perform best and optimize accordingly.',
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
    },
    {
      icon: FileText,
      title: 'Multiple Format Export',
      description: 'Export your optimized resume in PDF, Word, or plain text. Compatible with all job application platforms.',
      color: 'from-violet-500 to-violet-600',
      bgColor: 'from-violet-50 to-violet-100',
    },
    {
      icon: Award,
      title: 'Industry-Specific Templates',
      description: 'Choose from templates designed for tech, finance, healthcare, and more. Each optimized for ATS and industry standards.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
    },
  ];

  return (
    <section id="features" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">
              Land Your Dream Job
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Powerful AI-driven features designed to give you an unfair advantage in your job search
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-bg-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all card-hover border border-border-subtle group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-text-inverse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse rounded-xl font-bold text-lg btn-glow hover:scale-105 transition-all shadow-2xl">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}

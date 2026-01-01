import { Upload, Search, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Resume',
      description: 'Simply upload your existing resume in PDF or Word format. We support all standard formats.',
      color: 'from-blue-500 to-cyan-500',
      number: '01',
    },
    {
      icon: Search,
      title: 'AI Analyzes Resume',
      description: 'Our AI scans your resume for ATS compatibility, keywords, formatting, and more. Get instant feedback.',
      color: 'from-purple-500 to-pink-500',
      number: '02',
    },
    {
      icon: TrendingUp,
      title: 'Improve Score',
      description: 'Follow AI-powered suggestions to optimize keywords, rewrite bullet points, and improve formatting.',
      color: 'from-orange-500 to-red-500',
      number: '03',
    },
    {
      icon: CheckCircle,
      title: 'Apply Confidently',
      description: 'Download your optimized resume and apply with confidence. Track your success rate over time.',
      color: 'from-green-500 to-emerald-500',
      number: '04',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-text-inverse overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl bottom-0 right-0 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Get from zero to optimized in minutes. Our simple 4-step process transforms your resume.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all card-hover h-full">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto`}>
                  <step.icon className="w-10 h-10 text-text-inverse" />
                </div>
                <div className={`text-6xl font-extrabold text-gradient ${step.color} text-center mb-4 font-['DM_Sans'] opacity-30`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                <p className="text-white/80 leading-relaxed text-center">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-white/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse rounded-xl font-bold text-lg btn-glow hover:scale-105 transition-all shadow-2xl">
            Get Started Now
          </button>
          <p className="mt-4 text-white/60">No credit card required. Free forever.</p>
        </div>
      </div>
    </section>
  );
}

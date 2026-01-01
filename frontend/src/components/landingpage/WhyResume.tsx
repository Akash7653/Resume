import { AlertCircle, Eye, TrendingDown, Clock, Target, CheckCircle } from 'lucide-react';

export default function WhyResume() {
  return (
    <section id="why-resume" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-extrabold mb-6">
            Why Resume Optimization Is{' '}
            <span className="text-gradient from-orange-600 via-red-600 to-pink-600">
              Critical
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your resume is your first impression. In today's competitive job market, a poorly optimized resume means missed opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-bg-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all card-hover border border-border-subtle">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingDown className="w-8 h-8 text-text-inverse" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">75% Resumes Rejected by ATS</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Applicant Tracking Systems (ATS) automatically filter out resumes that don't meet specific criteria. Most resumes never reach human eyes.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Poor keyword matching</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Incompatible formatting</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Missing required skills</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all card-hover border border-border-subtle">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Eye className="w-8 h-8 text-text-inverse" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">6-7 Seconds Per Resume</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Recruiters spend an average of only 6-7 seconds scanning each resume. You have ONE chance to make an impact.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Eye-tracking studies prove it</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Strong headlines matter most</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Clear formatting is essential</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all card-hover border border-border-subtle">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-text-inverse" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">Keywords Are Everything</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              ATS systems scan for specific keywords from job descriptions. Missing the right keywords means automatic rejection.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Match job requirements exactly</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Use industry-standard terms</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-text-secondary">Include relevant skills</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl p-12 shadow-2xl text-text-inverse">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-extrabold mb-6 text-center">Why Tailored Resumes Outperform Generic Ones</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>Targeted Keywords:</strong> Each job has unique requirements. Tailoring ensures you match exactly what they're looking for.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>Relevant Experience:</strong> Highlight the most applicable achievements for each specific role.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>Industry Language:</strong> Different industries use different terminology. Speak their language.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>ATS Optimization:</strong> Each company's ATS looks for different signals. Customization is key.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>Measurable Impact:</strong> Quantify achievements in ways that matter to that specific employer.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white/80 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg"><strong>Higher Success Rate:</strong> Tailored resumes get 3x more interviews than generic ones.</p>
                </div>
              </div>
            </div>
            <div className="bg-bg-surface/10 backdrop-blur-sm border border-border-subtle rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold mb-2">The Bottom Line</p>
              <p className="text-lg">A generic resume is a wasted opportunity. Tailoring takes time — or you can let AI do it in seconds.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-bg-surface p-8 rounded-2xl shadow-xl border border-border-subtle">
            <h4 className="text-2xl font-bold mb-4 text-text-primary">Why Formatting Matters</h4>
            <p className="text-text-secondary leading-relaxed mb-4">
              Even with great content, poor formatting can cause your resume to be rejected. ATS systems struggle with:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-purple">1</span>
                </div>
                <span className="text-text-primary">Complex tables, text boxes, and graphics</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-purple">2</span>
                </div>
                <span className="text-text-primary">Non-standard section headings</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-purple">3</span>
                </div>
                <span className="text-text-primary">Unusual fonts or font sizes</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent-purple">4</span>
                </div>
                <span className="text-text-primary">Headers and footers with critical info</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-surface p-8 rounded-2xl shadow-xl border border-border-subtle">
            <h4 className="text-2xl font-bold mb-4 text-text-primary">Measurable Achievements Win</h4>
            <p className="text-text-secondary leading-relaxed mb-4">
              Weak bullet points kill your chances. Recruiters want to see impact, not just responsibilities.
            </p>
            <div className="space-y-4">
              <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-accent-red mb-1">Weak Example:</p>
                <p className="text-text-primary">"Responsible for managing projects"</p>
              </div>
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-accent-green mb-1">Strong Example:</p>
                <p className="text-text-primary">"Led 5 cross-functional projects, delivering $2M in cost savings and reducing time-to-market by 30%"</p>
              </div>
              <p className="text-sm text-text-secondary italic pt-2">
                Notice the difference? Numbers, specific outcomes, and action verbs make all the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

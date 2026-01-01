import { AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold leading-tight">
              See Exactly What{' '}
              <span className="text-gradient from-blue-600 via-purple-600 to-pink-600">
                Needs Improvement
              </span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              Our intuitive dashboard shows you real-time analysis of your resume. No guesswork. No confusion. Just clear, actionable insights.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4 p-4 bg-bg-surface rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Instant Feedback</h4>
                  <p className="text-text-secondary">Get your ATS score and recommendations in seconds</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-bg-surface rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Track Progress</h4>
                  <p className="text-text-secondary">Watch your score improve as you apply suggestions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-bg-surface rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Detailed Reports</h4>
                  <p className="text-text-secondary">Comprehensive analysis across all resume sections</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-6 rounded-3xl shadow-2xl animate-float">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-text-primary">Resume Dashboard</h3>
                  <span className="px-4 py-2 bg-gradient-to-r from-accent-green to-accent-emerald text-text-inverse text-sm font-bold rounded-full shadow-lg">
                    Score: 85/100
                  </span>
                </div>

                <div className="bg-bg-surface p-6 rounded-xl border border-border-medium">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-text-primary">Overall Progress</span>
                    <span className="text-sm font-bold text-accent-purple">85%</span>
                  </div>
                  <div className="w-full bg-border-medium rounded-full h-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-accent-green/10 border border-accent-green/20 p-4 rounded-xl flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-accent-green text-sm">Keywords: Excellent</p>
                      <p className="text-xs text-text-muted mt-1">18/20 keywords matched with job description</p>
                    </div>
                  </div>

                  <div className="bg-accent-emerald/10 border border-accent-emerald/20 p-4 rounded-xl flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-accent-emerald mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-accent-emerald text-sm">Bullet Points: Needs Work</p>
                      <p className="text-xs text-text-muted mt-1">5 bullet points lack measurable achievements</p>
                    </div>
                  </div>

                  <div className="bg-accent-green/10 border border-accent-green/20 p-4 rounded-xl flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-accent-green text-sm">Formatting: Perfect</p>
                      <p className="text-xs text-text-muted mt-1">ATS-friendly format detected</p>
                    </div>
                  </div>

                  <div className="bg-accent-blue/10 border border-accent-blue/20 p-4 rounded-xl flex items-start space-x-3">
                    <Info className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-accent-blue text-sm">Action Verbs: Good</p>
                      <p className="text-xs text-text-muted mt-1">Consider stronger alternatives for "managed"</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse rounded-xl font-bold btn-glow hover:scale-105 transition-all">
                  View Full Report
                </button>
              </div>
            </div>

            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

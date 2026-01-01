import { FileText, Sparkles, Linkedin, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-text-inverse pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <FileText className="w-8 h-8 text-blue-500" />
                <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-gradient from-blue-400 via-purple-400 to-pink-400">
                ResumeIQ
              </span>
            </div>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              AI-powered resume optimization platform that helps you land more interviews and get hired faster. Transform your career with intelligent insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-text-inverse/10 hover:bg-text-inverse/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-text-inverse/10 hover:bg-text-inverse/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-text-inverse/10 hover:bg-text-inverse/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-text-inverse/10 hover:bg-text-inverse/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Resume Templates</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">ATS Guide</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-medium pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm">
              © 2024 ResumeIQ. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">Made with AI for job seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

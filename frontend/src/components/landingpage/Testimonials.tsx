import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      image: 'SJ',
      rating: 5,
      text: "ResumeIQ completely transformed my job search. I went from getting zero responses to landing 5 interviews in 2 weeks. The ATS optimization is absolutely game-changing!",
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Amazon',
      image: 'MC',
      rating: 5,
      text: "I was skeptical at first, but the AI suggestions were spot-on. My resume score went from 62 to 94, and I got my dream job at Amazon. Worth every penny!",
    },
    {
      name: 'Priya Sharma',
      role: 'Data Analyst',
      company: 'Microsoft',
      image: 'PS',
      rating: 5,
      text: "As a career switcher, I struggled to present my experience effectively. ResumeIQ helped me rewrite my bullet points to highlight transferable skills. Landed my first tech job!",
    },
    {
      name: 'David Martinez',
      role: 'Full Stack Developer',
      company: 'Meta',
      image: 'DM',
      rating: 5,
      text: "The keyword matching feature is incredible. I was missing so many important terms. After optimization, my interview rate increased by 80%. Highly recommended!",
    },
    {
      name: 'Emily Wong',
      role: 'UX Designer',
      company: 'Apple',
      image: 'EW',
      rating: 5,
      text: "I loved how the platform showed me exactly what was wrong and how to fix it. The before/after comparison convinced me it works. Got hired within a month!",
    },
    {
      name: 'Rajesh Kumar',
      role: 'DevOps Engineer',
      company: 'Netflix',
      image: 'RK',
      rating: 5,
      text: "Coming from India, I wasn't sure how to format my resume for US companies. ResumeIQ made it perfect. Now working at my dream company!",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            Success Stories from{' '}
            <span className="text-gradient from-blue-600 via-purple-600 to-pink-600">
              Real Users
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join thousands of professionals who landed their dream jobs with ResumeIQ
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-bg-surface rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-purple-200 opacity-50" />

            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink rounded-full flex items-center justify-center text-text-inverse font-bold text-xl">
                  {testimonials[currentIndex].image}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-primary">{testimonials[currentIndex].name}</h4>
                  <p className="text-text-secondary">{testimonials[currentIndex].role}</p>
                  <p className="text-sm text-text-muted">{testimonials[currentIndex].company}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-xl text-text-primary leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>
            </div>

            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-10 blur-3xl"></div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-bg-surface rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink w-8'
                      : 'bg-border-medium hover:bg-border-subtle'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-bg-surface rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

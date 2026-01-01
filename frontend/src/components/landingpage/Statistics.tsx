import { useEffect, useState, useRef } from 'react';
import { Users, TrendingUp, CheckCircle, Star } from 'lucide-react';

export default function Statistics() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      icon: Users,
      end: 100000,
      suffix: '+',
      label: 'Resumes Analyzed',
      color: 'from-accent-blue to-accent-cyan',
      bgColor: 'from-accent-blue/10 to-accent-cyan/10',
    },
    {
      icon: TrendingUp,
      end: 78,
      suffix: '%',
      label: 'Increase in Interview Calls',
      color: 'from-accent-green to-accent-emerald',
      bgColor: 'from-accent-green/10 to-accent-emerald/10',
    },
    {
      icon: CheckCircle,
      end: 95,
      suffix: '%',
      label: 'ATS Compatibility',
      color: 'from-accent-purple to-accent-pink',
      bgColor: 'from-accent-purple/10 to-accent-pink/10',
    },
    {
      icon: Star,
      end: 4.9,
      suffix: '★',
      label: 'User Rating',
      color: 'from-accent-yellow to-accent-orange',
      bgColor: 'from-accent-yellow/10 to-accent-orange/10',
      decimal: true,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            Trusted by{' '}
            <span className="text-gradient from-accent-blue via-accent-purple to-accent-pink">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join professionals worldwide who have transformed their job search with AI-powered resume optimization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} hasAnimated={hasAnimated} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  end: number;
  suffix: string;
  label: string;
  color: string;
  bgColor: string;
  hasAnimated: boolean;
  delay: number;
  decimal?: boolean;
}

function StatCard({ icon: Icon, end, suffix, label, color, bgColor, hasAnimated, delay, decimal }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasAnimated, end]);

  return (
    <div
      className={`bg-gradient-to-br ${bgColor} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all card-hover border border-border-subtle dark:border-border-medium`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
        <Icon className="w-8 h-8 text-text-inverse" />
      </div>
      <div className="space-y-2">
        <p className={`text-5xl font-extrabold text-gradient ${color} font-['DM_Sans']`}>
          {decimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
          {suffix}
        </p>
        <p className="text-text-primary font-semibold text-lg">{label}</p>
      </div>
    </div>
  );
}

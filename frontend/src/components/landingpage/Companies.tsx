import { Building2 } from 'lucide-react';

export default function Companies() {
  const companies = [
    { name: 'Google', logo: '/logos/google.svg' },
    { name: 'Amazon', logo: '/logos/amazon.svg' },
    { name: 'Microsoft', logo: '/logos/microsoft.svg' },
    { name: 'Meta', logo: '/logos/meta.svg' },
    { name: 'Apple', logo: '/logos/apple.svg' },
    { name: 'Netflix', logo: '/logos/netflix.svg' },
    { name: 'Infosys', logo: '/logos/infosys.svg' },
    { name: 'TCS', logo: '/logos/tcs.svg' },
    { name: 'Accenture', logo: '/logos/accenture.svg' },
    { name: 'Deloitte', logo: '/logos/deloitte.svg' },
    { name: 'Cognizant', logo: '/logos/cognizant.svg' },
    { name: 'Capgemini', logo: '/logos/capgemini.svg' },
    { name: 'IBM', logo: '/logos/ibm.svg' },
    { name: 'Oracle', logo: '/logos/oracle.svg' },
    { name: 'Salesforce', logo: '/logos/salesforce.svg' },
  ];

  return (
    <section id="companies" className="py-20 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">
            Resumes Optimized for{' '}
            <span className="text-gradient from-teal-600 via-cyan-600 to-blue-600">
              Top Companies
            </span>
          </h2>
          <p className="text-lg text-text-secondary">
            Worldwide
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-8 animate-marquee">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-bg-surface px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border border-border-subtle min-w-[200px]"
              >
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback to Building2 icon if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Building2 className="w-6 h-6 text-accent-blue hidden" />
                <span className="text-xl font-bold text-text-primary whitespace-nowrap">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-secondary text-lg">
            <span className="font-bold text-text-primary">100,000+</span> resumes optimized for Fortune 500 companies and startups
          </p>
        </div>
      </div>
    </section>
  );
}

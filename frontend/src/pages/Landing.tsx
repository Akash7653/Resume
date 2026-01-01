import Navbar from '../components/landingpage/Navbar';
import Hero from '../components/landingpage/Hero';
import WhyResume from '../components/landingpage/WhyResume';
import Statistics from '../components/landingpage/Statistics';
import Companies from '../components/landingpage/Companies';
import Features from '../components/landingpage/Features';
import HowItWorks from '../components/landingpage/HowItWorks';
import DashboardPreview from '../components/landingpage/DashboardPreview';
import Testimonials from '../components/landingpage/Testimonials';
import Pricing from '../components/landingpage/Pricing';
import FinalCTA from '../components/landingpage/FinalCTA';
import Footer from '../components/landingpage/Footer';

export function Landing() {
  return (
    <div className="min-h-screen bg-bg-primary theme-transition">
      <Navbar />
      <Hero />
      <WhyResume />
      <Statistics />
      <Companies />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}

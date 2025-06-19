import { Banner } from './components/banner';
import CallToAction from './components/ctaSection';
import Faqs from './components/faqSection';
import FeaturesSection from './components/features';
import Footer from './components/footer';
import { Hero } from './components/hero';
import { Navbar } from './components/navbar';
import './globals.css';

export default function Home() {
  return (
    <main >
      <Banner />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 '>
        <Navbar />
        <Hero />
        <FeaturesSection />
        <CallToAction />
        <Faqs />
        <Footer />
      </div>
    </main>
  )
}

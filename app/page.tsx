import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import Process from './components/Process';
import Projects from './components/Projects';
import Coverage from './components/Coverage';
import Testimonials from './components/Testimonials';
import Calculator from './components/Calculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-navy focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar />
      <Toolbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Coverage />
        <Testimonials />
        <SectionDivider />
        <Calculator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

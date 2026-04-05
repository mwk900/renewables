import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Projects from './components/Projects';
import Coverage from './components/Coverage';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Toolbar />
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Coverage />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

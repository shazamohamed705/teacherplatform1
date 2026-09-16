import { useState } from 'react';
import Intro from './components/Intro/Intro';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import About from './components/About/About';
import Insight from './components/Insight/Insight';
import Gap from './components/Gap/Gap';
import Why from './components/Why/Why';
import Process from './components/Process/Process';
import Portfolio from './components/Portfolio/Portfolio';
import Doctors from './components/Doctors/Doctors';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import ContactModal from './components/Contact/ContactModal';
import PageTransition from './components/Transition/PageTransition';
import useReveal from './hooks/useReveal';
import useStackedSections from './hooks/useStackedSections';
import './App.css';

// The intro curtain plays once per browser session.
const shouldPlayIntro = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('wahaj-intro');
  } catch {
    return false;
  }
};

function App() {
  const [playIntro] = useState(shouldPlayIntro);
  const [ready, setReady] = useState(!playIntro);

  // Scroll reveals start as the curtain lifts, so the hero animates in view.
  useReveal(ready);
  // Sections slide over one another like pages while scrolling.
  useStackedSections();

  return (
    <>
      {playIntro && <Intro onReady={() => setReady(true)} />}
      <Navbar />
      <PageTransition />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Insight />
        <Gap />
        <Why />
        <Process />
        <Portfolio />
        <Doctors />
        <Team />
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}

export default App;

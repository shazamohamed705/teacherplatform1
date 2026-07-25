import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Insight from './components/Insight/Insight';
import Gap from './components/Gap/Gap';
import Why from './components/Why/Why';
import Process from './components/Process/Process';
import Portfolio from './components/Portfolio/Portfolio';
import Doctors from './components/Doctors/Doctors';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import './App.css';

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
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
    </>
  );
}

export default App;

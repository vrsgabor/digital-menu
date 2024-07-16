import '../styles/global.css';
import HeroSection from '../components/HeroSection';
import DigitalMenuSection from '../components/DigitalMenuSection';
import MainFeaturesSection from '../components/MainFeaturesSection';
import CleanDesignSection from '../components/CleanDesignSection';
import ManageDigitalMenuSection from '../components/ManageDigitalMenuSection';
import ContactSection from '../components/ContactSection';
import NavBar from '../components/NavBar'
const Home = () => (
  <div className="page-wrapper">
    <NavBar/>
    <HeroSection />
    <DigitalMenuSection />
    <MainFeaturesSection />
    <CleanDesignSection />
    <ManageDigitalMenuSection />
    <ContactSection />
  </div>
);

export default Home;

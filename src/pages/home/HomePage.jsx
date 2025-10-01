import Header from "../../components/home/Header";
import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import MissionSelection from "../../components/home/MissionSelection";
import Footer from "../../components/home/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <MissionSelection />
      <Footer />
    </div>
  );
};

export default HomePage;

import { Outlet } from "react-router-dom";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;

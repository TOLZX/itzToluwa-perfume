import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollection from "../components/FeaturedCollection";
import SignaturePerfume from "../components/SignaturePerfume";
import BestSellers from "../components/BestSellers";
import BrandStory from "../components/BrandStory";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <SignaturePerfume />
      <BestSellers />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
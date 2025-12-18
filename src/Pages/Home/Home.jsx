import Container from "../../Layout/Container/Container";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import ReadytoTransform from "./ReadytoTransform";
import WhyChooseHomeHelp from "./WhyChooseHomeHelp";
import WhyTrustHomeHelp from "./WhyTrustHomeHelp";
import Handshake from "./Handshake";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Handshake />
      <HowItWorks />
      <WhyTrustHomeHelp />
      <WhyChooseHomeHelp />
      <ReadytoTransform />
      <Footer />
    </div>
  );
};

export default Home;

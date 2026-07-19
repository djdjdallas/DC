import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import AiTechnology from "@/components/AiTechnology";
import Tour from "@/components/Tour";
import Leadership from "@/components/Leadership";
import CtaBand from "@/components/CtaBand";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";

export default function Home() {
  return (
    <>
      <Animations />
      <Nav />
      <Hero />
      <Highlights />
      <Mission />
      <Features />
      <AiTechnology />
      <Tour />
      <Leadership />
      <CtaBand />
      <ContactForm />
      <Footer />
    </>
  );
}

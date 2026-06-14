import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Contact from "@/components/sections/Contact";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <Hero />
        <Services />
        <WhyUs />
        <Pricing />
        <Gallery />
        <Testimonials />
        <Contact />
      </PageTransition>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

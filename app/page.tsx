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
      <div 
        className="fixed inset-0 z-[-1] h-full w-full bg-[#FAFAFC] pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-mint/15 blur-[120px] animate-orb-1" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-lavender/15 blur-[120px] animate-orb-2" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70%] h-[50%] rounded-full bg-mint/10 blur-[120px] animate-orb-3" />
      </div>
      <Navbar />
      <PageTransition>
        <Hero />
        <Gallery />
        <Services />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <Contact />
      </PageTransition>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

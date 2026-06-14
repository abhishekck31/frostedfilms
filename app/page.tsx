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
        className="fixed inset-0 z-[-1] h-full w-full pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            #EAF5F0 0%,
            #F4F0FA 18%,
            #EDE8F7 32%,
            #E8F3EE 48%,
            #F2EEF9 64%,
            #EAF5F0 78%,
            #2C2C3E 88%,
            #1E1E2E 100%
          )`,
          backgroundAttachment: 'fixed'
        }}
      />
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

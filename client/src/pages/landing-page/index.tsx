import { PageTransition } from "@/components";
import {
  Hero,
  Navbar,
  Features,
  Faq,
  Footer,
  Testimonials,
} from "@/components";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Faq />
      <Footer />

      <PageTransition />
    </>
  );
};

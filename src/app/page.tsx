import { Carousel } from "@/components/Carousel";
import { Comparison } from "@/components/Comparison";
import { FeatureIndex } from "@/components/FeatureIndex";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Pipeline } from "@/components/Pipeline";
import { Positioning } from "@/components/Positioning";
import { Promise } from "@/components/Promise";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Pipeline />
        <Carousel />
        <Comparison />
        <FeatureIndex />
        <Promise />
      </main>
      <Footer />
    </>
  );
}

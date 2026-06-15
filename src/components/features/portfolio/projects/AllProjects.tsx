"use client";
import { Card, Carousel } from "./apple-cards-carousel";
import { data, personalProjectsData } from "./Data";


export default function AllProjects() {
  const professionalCards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  const personalCards = personalProjectsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full space-y-16 pt-8">
      {/* Professional Projects Section - hidden */}
      {/*
      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans pl-4 md:pl-8">
          Professional Projects
        </h2>
        <Carousel items={professionalCards} />
      </div>
      */}

      {/* Personal Projects Section */}
      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans pl-4 md:pl-8">
          Personal Projects
        </h2>
        <Carousel items={personalCards} />
      </div>
    </div>
  );
}

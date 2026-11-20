import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { CourseProjectsSection } from './components/CourseProjectsSection';
import { Header } from './components/Header';
import { LabActivitiesSection } from './components/LabActivitiesSection';

const OVERVIEW_METRICS = [
  {
    value: '01',
    label: 'Featured Lab Experiment',
    sublabel: 'Arduino LED Interfacing',
  },
  {
    value: '05',
    label: 'Silent Lab Demonstrations',
    sublabel: 'Original Uncropped Footage',
  },
  {
    value: '8–11',
    label: 'Digital Output Pins',
    sublabel: '500 ms Timing Reference',
  },
  {
    value: '05',
    label: 'Course Prototypes',
    sublabel: 'Sensors, Wireless & Mobile',
  },
];

export default function App() {
  const [heroImageError, setHeroImageError] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827]">
      <Header />

      <main>
        {/* Compact Split-Screen Editorial Hero — sets up the E-Portfolio cleanly before Laboratory Activities */}
        <section id="overview" className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Typographic hierarchy */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    First-Year Engineering · Engineering Exploration E-Portfolio
                  </p>
                  <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl leading-[1.08]">
                    Khushi Gandhi
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-[17px]">
                    I am making this portfolio to give a tour of the knowledge which I got during my
                    Engineering Exploration Lab experiments and at the end all this got concluded by
                    making a Arduino-UNO based working model project.
                  </p>
                  <p className="mt-3 font-display text-base font-medium tracking-tight text-slate-500">
                    Hardware Interfacing &amp; Laboratory Showcase
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#lab-activities"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1E40AF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <span>Explore Laboratory Activities</span>
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#course-projects"
                    className="inline-flex min-h-[44px] items-center rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:text-slate-950 hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    View Course Projects
                  </a>
                </div>
              </div>

              {/* Right Column: Authentic Hardware Showcase Photo at matching height */}
              <div className="lg:col-span-5">
                <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#0B1120]">
                  <div className="relative flex-1 min-h-[240px] w-full overflow-hidden">
                    {!heroImageError ? (
                      <img
                        src="/assets/thumbnails/demo-01.jpg"
                        alt="Arduino UNO wired to four LEDs on a solderless breadboard during Experiment 01"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImageError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-6 text-sm text-slate-300">
                        Arduino UNO · Experiment 01 Setup
                      </div>
                    )}
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 border-t border-slate-800 bg-[#0F172A] px-4 py-3 text-xs text-slate-300">
                    <span className="truncate">Experiment 01 · Four-LED Breadboard Circuit</span>
                    <span className="font-mono text-slate-400 tabular-nums shrink-0">
                      Arduino UNO
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full-width 4-column summary strip directly below the hero split */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 lg:grid-cols-4">
              {OVERVIEW_METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <span className="font-mono text-2xl font-semibold tracking-tight text-slate-950 tabular-nums sm:text-3xl">
                    {metric.value}
                  </span>
                  <span className="mt-1 text-sm font-medium text-slate-800">{metric.label}</span>
                  <span className="mt-0.5 text-xs text-slate-500">{metric.sublabel}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newly Added Featured Section: ENGINEERING EXPLORATION – LABORATORY ACTIVITIES */}
        <LabActivitiesSection />

        {/* Existing Course Projects Showcase */}
        <CourseProjectsSection />
      </main>

      <footer className="border-t border-slate-200 bg-[#F8F9FA] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-sm font-semibold text-slate-900">
              Khushi Gandhi · Engineering Exploration E-Portfolio
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Laboratory documentation, Arduino hardware interfacing, and practical coursework.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600">
            <a href="#overview" className="hover:text-slate-950 whitespace-nowrap">
              Overview
            </a>
            <a href="#lab-activities" className="hover:text-slate-950 whitespace-nowrap">
              Lab Activities
            </a>
            <a href="#video-gallery" className="hover:text-slate-950 whitespace-nowrap">
              Video Gallery
            </a>
            <a href="#course-projects" className="hover:text-slate-950 whitespace-nowrap">
              Course Projects
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

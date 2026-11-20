import { EXPERIMENT_01, LAB_INTRO } from '../data/portfolioData';
import { HardwareIllustrations } from './HardwareIllustrations';
import { VideoGallery } from './VideoGallery';
import { WorkingDiagram } from './WorkingDiagram';

export function LabActivitiesSection() {
  return (
    <section
      id="lab-activities"
      aria-labelledby="lab-activities-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-[#F8F9FA] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Verbatim Introduction */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#1D4ED8]">
            Coursework Documentation · Practical Laboratory Evidence
          </p>
          <h2
            id="lab-activities-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Engineering Exploration – Laboratory Activities
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-[17px]">
            {LAB_INTRO}
          </p>
        </div>

        {/* Experiment 01 Overview Block */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
            <span className="font-mono font-semibold text-[#1D4ED8]">{EXPERIMENT_01.code}</span>
            <span aria-hidden="true">·</span>
            <span>{EXPERIMENT_01.categories.join(' | ')}</span>
          </div>

          <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {EXPERIMENT_01.title}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold text-slate-900">Objective</h4>
            </div>
            <div className="md:col-span-9">
              <p className="text-base leading-relaxed text-slate-700">{EXPERIMENT_01.objective}</p>
            </div>
          </div>
        </div>

        {/* Video Gallery — Main evidence of practical participation */}
        <div className="mt-14">
          <VideoGallery />
        </div>

        {/* Visual Working Diagram (Arduino -> Digital Output -> LED Patterns) */}
        <div className="mt-14">
          <WorkingDiagram />
        </div>

        {/* Technical Illustrations (Arduino UNO, Four LEDs, Breadboard) */}
        <div className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-medium text-slate-500">
              Circuit Reference · Key Hardware Elements
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Hardware Setup Illustrations
            </h3>
          </div>
          <HardwareIllustrations />
        </div>

        {/* Structured Experiment Details: Components Used, Working Principle & Patterns Demonstrated */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Components Used Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-5">
            <p className="text-xs font-medium text-slate-500">Bill of Materials · 5 Items</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              Components Used
            </h3>

            <ul className="mt-6 divide-y divide-slate-200/80">
              {EXPERIMENT_01.components.map((component, idx) => (
                <li key={component.name} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-slate-900">{component.name}</span>
                    <span className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#1D4ED8]">{component.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{component.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Principle & Patterns Demonstrated Column */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Working Principle */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-500">Operating Mechanism</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                Working Principle
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {EXPERIMENT_01.workingPrinciple.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Patterns Demonstrated — flat borderless cells separated cleanly via whitespace */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-500">
                Observed Blinking Logic · Four Sequence Types
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                Patterns Demonstrated
              </h3>

              <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {EXPERIMENT_01.patterns.map((pattern) => (
                  <li key={pattern.number} className="rounded-lg bg-[#F8FAFC] p-4">
                    <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                      {pattern.number}
                    </span>
                    <h4 className="mt-1 text-sm font-semibold text-slate-900">{pattern.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {pattern.description}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Specific recorded demonstration note */}
              <div className="mt-6 rounded-lg bg-[#EFF6FF] p-4">
                <p className="text-xs font-semibold text-[#1E3A8A]">Recorded Code Highlight</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {EXPERIMENT_01.recordedCodeNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What I Learned — Single-elevation 5-column cards directly on canvas */}
        <div className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Learning Outcomes · Practical Skills Gained
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                What I Learned
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              05 Core Competencies
            </span>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {EXPERIMENT_01.learningOutcomes.map((outcome, index) => (
              <li
                key={outcome}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{outcome}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Takeaway */}
        <div
          id="key-takeaway"
          className="mt-12 scroll-mt-24 rounded-xl bg-[#0F172A] p-7 text-white sm:p-10"
        >
          <p className="text-xs font-medium text-blue-300">Experiment 01 Reflection</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Key Takeaway</h3>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {EXPERIMENT_01.keyTakeaway}
          </p>
        </div>
      </div>
    </section>
  );
}

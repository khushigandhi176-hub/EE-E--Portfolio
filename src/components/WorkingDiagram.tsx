import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';

type PatternMode = 'alternating' | 'sequential' | 'all' | 'timing';

const PINS = [
  { pin: 8, label: 'LED 1', activeBg: 'bg-red-500', activeRing: 'ring-red-200' },
  { pin: 9, label: 'LED 2', activeBg: 'bg-amber-500', activeRing: 'ring-amber-200' },
  { pin: 10, label: 'LED 3', activeBg: 'bg-red-500', activeRing: 'ring-red-200' },
  { pin: 11, label: 'LED 4', activeBg: 'bg-emerald-500', activeRing: 'ring-emerald-200' },
];

const PATTERN_META: Record<
  PatternMode,
  { label: string; description: string; steps: boolean[][]; snippet: string }
> = {
  alternating: {
    label: 'Alternating Pairs',
    description: 'Pins 8 & 10 turn HIGH together, followed by pins 9 & 11 after the delay interval.',
    steps: [
      [true, false, true, false],
      [false, true, false, true],
    ],
    snippet: `int led[] = {8, 9, 10, 11};
void setup() {
  for (int i = 0; i < 4; i++) { pinMode(led[i], OUTPUT); }
}
void loop() {
  // LEDs 1 and 3 ON
  for (int i = 0; i < 4; i += 2) { digitalWrite(led[i], HIGH); }
  delay(500);
  for (int i = 0; i < 4; i += 2) { digitalWrite(led[i], LOW); }
  // LEDs 2 and 4 ON
  for (int i = 1; i < 4; i += 2) { digitalWrite(led[i], HIGH); }
  delay(500);
  for (int i = 1; i < 4; i += 2) { digitalWrite(led[i], LOW); }
}`,
  },
  sequential: {
    label: 'Sequential',
    description: 'Each digital pin turns HIGH one after another from Pin 8 through Pin 11.',
    steps: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    snippet: `int led[] = {8, 9, 10, 11};
void setup() {
  for (int i = 0; i < 4; i++) { pinMode(led[i], OUTPUT); }
}
void loop() {
  for (int i = 0; i < 4; i++) {
    digitalWrite(led[i], HIGH);
    delay(500);
    digitalWrite(led[i], LOW);
  }
}`,
  },
  all: {
    label: 'Multiple LEDs',
    description: 'All four output pins switch HIGH simultaneously and then LOW together.',
    steps: [
      [true, true, true, true],
      [false, false, false, false],
    ],
    snippet: `int led[] = {8, 9, 10, 11};
void setup() {
  for (int i = 0; i < 4; i++) { pinMode(led[i], OUTPUT); }
}
void loop() {
  for (int i = 0; i < 4; i++) { digitalWrite(led[i], HIGH); }
  delay(500);
  for (int i = 0; i < 4; i++) { digitalWrite(led[i], LOW); }
  delay(500);
}`,
  },
  timing: {
    label: 'Timing Control',
    description: 'Adjust the delay interval below to observe how delay(ms) governs ON/OFF duration.',
    steps: [
      [true, true, false, false],
      [false, false, true, true],
    ],
    snippet: `int led[] = {8, 9, 10, 11};
// Adjusting delay(ms) changes how long each
// LED state remains ON before switching OFF.
void loop() {
  digitalWrite(8, HIGH);  digitalWrite(9, HIGH);
  delay(intervalMs);
  digitalWrite(8, LOW);   digitalWrite(9, LOW);
  digitalWrite(10, HIGH); digitalWrite(11, HIGH);
  delay(intervalMs);
  digitalWrite(10, LOW);  digitalWrite(11, LOW);
}`,
  },
};

const DELAY_OPTIONS = [250, 500, 1000] as const;

export function WorkingDiagram() {
  const [mode, setMode] = useState<PatternMode>('alternating');
  const [delayMs, setDelayMs] = useState<number>(500);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const activePattern = PATTERN_META[mode];
  const currentStates = activePattern.steps[stepIndex % activePattern.steps.length];

  useEffect(() => {
    setStepIndex(0);
  }, [mode]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % activePattern.steps.length);
    }, delayMs);
    return () => window.clearInterval(timer);
  }, [isPlaying, delayMs, activePattern.steps.length]);

  const renderedSnippet = activePattern.snippet
    .replace(/delay\(500\)/g, `delay(${delayMs})`)
    .replace(/intervalMs/g, String(delayMs));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* Header row with functional interactive pattern selector */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Visual Working Diagram · Signal Flow &amp; Live State Preview
          </p>
          <h4 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Arduino → Digital Output → LED Patterns
          </h4>
        </div>

        <div
          role="tablist"
          aria-label="Select LED pattern demonstration"
          className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
        >
          {(Object.keys(PATTERN_META) as PatternMode[]).map((key) => {
            const active = mode === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(key)}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {PATTERN_META[key].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Stage Visual Working Flow Diagram — flat surface contrast, zero nested card clutter */}
      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1.15fr_auto_1.15fr]">
        {/* Stage 1: Arduino UNO */}
        <div className="flex flex-col justify-between rounded-lg bg-[#F8FAFC] p-5">
          <div>
            <p className="font-mono text-xs font-medium text-[#1D4ED8] tabular-nums">Stage 01</p>
            <h5 className="mt-1 text-base font-semibold text-slate-900">Arduino UNO</h5>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Executes the uploaded program loop and schedules pin transitions using{' '}
              <code className="font-mono text-xs text-slate-800">digitalWrite()</code> and{' '}
              <code className="font-mono text-xs text-slate-800">delay({delayMs})</code>.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 text-xs text-slate-500">
            <span>Power &amp; Sketch</span>
            <span className="font-mono text-slate-700 tabular-nums">USB · 5V DC</span>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
          <ArrowRight className="h-5 w-5 rotate-90 text-slate-400 lg:rotate-0" />
        </div>

        {/* Stage 2: Digital Output Pins */}
        <div className="flex flex-col justify-between rounded-lg bg-[#F8FAFC] p-5">
          <div>
            <p className="font-mono text-xs font-medium text-[#1D4ED8] tabular-nums">Stage 02</p>
            <h5 className="mt-1 text-base font-semibold text-slate-900">Digital Output</h5>
            <p className="mt-1 text-xs text-slate-500">Live logic states on pins 8, 9, 10 and 11</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {PINS.map((item, index) => {
                const isHigh = currentStates[index];
                return (
                  <div
                    key={item.pin}
                    className={`flex items-center justify-between rounded-md px-3 py-2 font-mono text-xs tabular-nums transition-colors duration-150 ${
                      isHigh
                        ? 'bg-[#DBEAFE] text-[#1E3A8A]'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    <span className="font-medium">Pin {item.pin}</span>
                    <span className="font-semibold">{isHigh ? 'HIGH' : 'LOW'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 text-xs text-slate-500">
            <span>Signal Levels</span>
            <span className="font-mono text-slate-700 tabular-nums">HIGH 5V / LOW 0V</span>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
          <ArrowRight className="h-5 w-5 rotate-90 text-slate-400 lg:rotate-0" />
        </div>

        {/* Stage 3: LED Patterns Output */}
        <div className="flex flex-col justify-between rounded-lg bg-[#F8FAFC] p-5">
          <div>
            <p className="font-mono text-xs font-medium text-[#1D4ED8] tabular-nums">Stage 03</p>
            <h5 className="mt-1 text-base font-semibold text-slate-900">LED Patterns</h5>
            <p className="mt-1 text-xs text-slate-500">{activePattern.description}</p>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {PINS.map((item, index) => {
                const isOn = currentStates[index];
                return (
                  <div
                    key={item.pin}
                    className="flex flex-col items-center rounded-md bg-white px-2 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-5 w-5 rounded-full transition-all duration-150 ${
                        isOn
                          ? `${item.activeBg} ring-4 ${item.activeRing}`
                          : 'bg-slate-200'
                      }`}
                    />
                    <span className="mt-2 font-mono text-[11px] font-medium text-slate-800 tabular-nums">
                      {item.label}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold ${
                        isOn ? 'text-[#1D4ED8]' : 'text-slate-400'
                      }`}
                    >
                      {isOn ? 'ON' : 'OFF'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 text-xs text-slate-500">
            <span>Active Interval</span>
            <span className="font-mono text-slate-700 tabular-nums">{delayMs} ms</span>
          </div>
        </div>
      </div>

      {/* Controls & Recorded Code Reference */}
      <div className="mt-6 grid grid-cols-1 gap-6 border-t border-slate-200 pt-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause Preview' : 'Play Preview'}</span>
            </button>

            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {DELAY_OPTIONS.map((ms) => (
                <button
                  key={ms}
                  type="button"
                  onClick={() => setDelayMs(ms)}
                  className={`min-h-[34px] rounded-md px-2.5 py-1 font-mono text-xs tabular-nums transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                    delayMs === ms
                      ? 'bg-white font-semibold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ms} ms
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            Use the pattern and delay controls above to walk through how loop step increments (
            <code className="font-mono text-xs text-slate-800">i++</code> vs.{' '}
            <code className="font-mono text-xs text-slate-800">i += 2</code>) and the{' '}
            <code className="font-mono text-xs text-slate-800">delay()</code> interval translate
            directly into physical LED illumination sequences.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg bg-[#0F172A] text-slate-100 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 text-xs text-slate-400">
            <span className="font-mono">Arduino Sketch Reference · {activePattern.label}</span>
            <span className="font-mono tabular-nums">Pins 8, 9, 10, 11</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
            <code>{renderedSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

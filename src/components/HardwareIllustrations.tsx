export function HardwareIllustrations() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Illustration 1: Arduino UNO */}
      <figure className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <div className="flex items-baseline justify-between gap-2 text-xs text-slate-500">
            <span>Technical Illustration 01</span>
            <span className="font-mono tabular-nums">5V Logic</span>
          </div>
          <h4 className="mt-1.5 text-base font-semibold text-slate-900">Arduino UNO Board</h4>
        </div>

        <div className="my-5 flex items-center justify-center rounded-lg bg-[#F8FAFC] p-4 border border-slate-100">
          <svg
            viewBox="0 0 280 185"
            className="h-40 w-full max-w-[260px]"
            role="img"
            aria-label="Technical schematic illustration of an Arduino UNO board highlighting digital output pins 8, 9, 10, and 11 and GND"
          >
            <title>Arduino UNO Technical Schematic</title>
            {/* PCB Board Body */}
            <path
              d="M36 22 H242 L254 34 V152 L242 164 H36 V22 Z"
              fill="#EFF6FF"
              stroke="#1E3A8A"
              strokeWidth="1.75"
            />
            {/* USB-B Port */}
            <rect x="14" y="38" width="32" height="36" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
            <line x1="22" y1="45" x2="38" y2="45" stroke="#64748B" strokeWidth="1.2" />
            <line x1="22" y1="67" x2="38" y2="67" stroke="#64748B" strokeWidth="1.2" />
            <text x="15" y="87" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              USB
            </text>

            {/* DC Power Jack */}
            <rect x="18" y="116" width="28" height="30" rx="2" fill="#334155" />
            <circle cx="32" cy="131" r="4" fill="#94A3B8" />

            {/* Reset button */}
            <rect x="52" y="28" width="12" height="12" rx="2" fill="#FFFFFF" stroke="#475569" strokeWidth="1.2" />
            <circle cx="58" cy="34" r="3" fill="#DC2626" />

            {/* Top Digital Header */}
            <rect x="78" y="27" width="146" height="13" rx="1.5" fill="#1E293B" />
            {/* Highlight Pins 8, 9, 10, 11 */}
            <rect x="115" y="25" width="46" height="17" rx="2" fill="none" stroke="#1D4ED8" strokeWidth="1.8" />
            {[84, 94, 104, 121, 132, 143, 154, 168, 178, 188, 198, 208, 218].map((x, idx) => (
              <rect
                key={x}
                x={x}
                y="31"
                width="4"
                height="5"
                fill={idx >= 3 && idx <= 6 ? '#60A5FA' : '#94A3B8'}
              />
            ))}
            {/* GND & Pin labels */}
            <text x="80" y="16" fontSize="8" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              GND
            </text>
            <text x="115" y="16" fontSize="8.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#1D4ED8">
              D11 D10 D9 D8
            </text>
            <line x1="138" y1="19" x2="138" y2="25" stroke="#1D4ED8" strokeWidth="1.2" />

            {/* ATmega328P MCU DIP Package */}
            <rect x="114" y="96" width="106" height="28" rx="2" fill="#1E293B" />
            <text
              x="167"
              y="113"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="IBM Plex Mono, monospace"
              fill="#E2E8F0"
            >
              ATmega328P
            </text>

            {/* Crystal & Board Label */}
            <rect x="74" y="66" width="22" height="10" rx="4" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
            <text x="118" y="75" fontSize="12" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif" fill="#1E3A8A">
              ARDUINO UNO
            </text>
            <text x="118" y="86" fontSize="7.5" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              DIGITAL OUTPUT (8–11)
            </text>

            {/* Bottom Power & Analog Headers */}
            <rect x="86" y="146" width="66" height="12" rx="1.5" fill="#1E293B" />
            <rect x="164" y="146" width="60" height="12" rx="1.5" fill="#1E293B" />
            <text x="103" y="176" fontSize="8" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              POWER / GND
            </text>
            <text x="172" y="176" fontSize="8" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              ANALOG IN
            </text>
          </svg>
        </div>

        <figcaption className="text-xs leading-relaxed text-slate-600">
          Programmed via USB to drive digital pins <span className="font-mono text-slate-800">8, 9, 10, 11</span> between{' '}
          <span className="font-mono text-slate-800">HIGH (5V)</span> and <span className="font-mono text-slate-800">LOW (0V)</span>.
        </figcaption>
      </figure>

      {/* Illustration 2: Four LEDs */}
      <figure className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <div className="flex items-baseline justify-between gap-2 text-xs text-slate-500">
            <span>Technical Illustration 02</span>
            <span className="font-mono tabular-nums">4 Channels</span>
          </div>
          <h4 className="mt-1.5 text-base font-semibold text-slate-900">Four LED Output Array</h4>
        </div>

        <div className="my-5 flex items-center justify-center rounded-lg bg-[#F8FAFC] p-4 border border-slate-100">
          <svg
            viewBox="0 0 280 185"
            className="h-40 w-full max-w-[260px]"
            role="img"
            aria-label="Technical schematic illustration of four 5mm LEDs showing anode and cathode leads connected to digital pins 8 through 11"
          >
            <title>Four LEDs Schematic</title>
            {[
              { x: 46, pin: 'D8', color: '#DC2626', fill: '#FEE2E2', label: 'LED 1' },
              { x: 108, pin: 'D9', color: '#D97706', fill: '#FEF3C7', label: 'LED 2' },
              { x: 170, pin: 'D10', color: '#DC2626', fill: '#FEE2E2', label: 'LED 3' },
              { x: 232, pin: 'D11', color: '#059669', fill: '#D1FAE5', label: 'LED 4' },
            ].map((led) => (
              <g key={led.pin}>
                {/* Pin Label */}
                <text
                  x={led.x}
                  y="24"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#1D4ED8"
                >
                  {led.pin}
                </text>
                {/* LED Dome */}
                <path
                  d={`M${led.x - 14} 84 V58 A14 14 0 0 1 ${led.x + 14} 58 V84 Z`}
                  fill={led.fill}
                  stroke={led.color}
                  strokeWidth="1.75"
                />
                {/* LED Rim */}
                <rect
                  x={led.x - 17}
                  y="84"
                  width="34"
                  height="6"
                  rx="1.5"
                  fill={led.color}
                  fillOpacity="0.2"
                  stroke={led.color}
                  strokeWidth="1.5"
                />
                {/* Internal anvil/post detail */}
                <line x1={led.x - 5} y1="84" x2={led.x - 5} y2="62" stroke={led.color} strokeWidth="1.2" opacity="0.6" />
                <line x1={led.x + 5} y1="84" x2={led.x + 5} y2="66" stroke={led.color} strokeWidth="1.2" opacity="0.6" />

                {/* Anode (+) Longer Leg */}
                <line x1={led.x - 6} y1="90" x2={led.x - 6} y2="146" stroke="#1E293B" strokeWidth="1.8" />
                {/* Cathode (-) Shorter Leg */}
                <line x1={led.x + 6} y1="90" x2={led.x + 6} y2="132" stroke="#64748B" strokeWidth="1.8" />

                {/* Polarity symbols */}
                <text x={led.x - 12} y="158" fontSize="9" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#1E293B">
                  +
                </text>
                <text x={led.x + 3} y="144" fontSize="9" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#64748B">
                  −
                </text>

                {/* LED Number */}
                <text
                  x={led.x}
                  y="174"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#475569"
                >
                  {led.label}
                </text>
              </g>
            ))}

            {/* Common GND bus hint */}
            <line x1="28" y1="132" x2="256" y2="132" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        <figcaption className="text-xs leading-relaxed text-slate-600">
          Each LED anode (<span className="font-mono text-slate-800">+</span>) connects to an assigned digital pin while all cathodes (
          <span className="font-mono text-slate-800">−</span>) share a common ground return.
        </figcaption>
      </figure>

      {/* Illustration 3: Breadboard */}
      <figure className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <div className="flex items-baseline justify-between gap-2 text-xs text-slate-500">
            <span>Technical Illustration 03</span>
            <span className="font-mono tabular-nums">Common GND</span>
          </div>
          <h4 className="mt-1.5 text-base font-semibold text-slate-900">Solderless Breadboard Layout</h4>
        </div>

        <div className="my-5 flex items-center justify-center rounded-lg bg-[#F8FAFC] p-4 border border-slate-100">
          <svg
            viewBox="0 0 280 185"
            className="h-40 w-full max-w-[260px]"
            role="img"
            aria-label="Technical schematic illustration of a solderless breadboard with four LEDs wired to digital pins 8 through 11 and a common ground rail"
          >
            <title>Breadboard Wiring Schematic</title>
            {/* Breadboard Frame */}
            <rect x="20" y="34" width="240" height="122" rx="6" fill="#FFFFFF" stroke="#334155" strokeWidth="1.6" />

            {/* Top Power Rail */}
            <line x1="30" y1="48" x2="250" y2="48" stroke="#2563EB" strokeWidth="1.4" opacity="0.6" />
            <text x="26" y="45" fontSize="8" fontFamily="IBM Plex Mono, monospace" fill="#1D4ED8">
              − GND RAIL
            </text>

            {/* Center Channel Divider */}
            <rect x="24" y="90" width="232" height="10" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.9" />

            {/* Terminal Hole Grid (Clean simplified rows) */}
            {[64, 76, 112, 124].map((y) =>
              [44, 64, 84, 104, 124, 144, 164, 184, 204, 224, 240].map((x) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="3.5" height="3.5" rx="0.6" fill="#94A3B8" />
              ))
            )}

            {/* Bottom Ground Rail */}
            <line x1="30" y1="142" x2="250" y2="142" stroke="#DC2626" strokeWidth="1.2" opacity="0.45" />

            {/* 4 Mounted LEDs + Jumper Wires */}
            {[
              { x: 65.5, color: '#DC2626', wire: '#1D4ED8', pin: 'D8' },
              { x: 115.5, color: '#D97706', wire: '#2563EB', pin: 'D9' },
              { x: 165.5, color: '#DC2626', wire: '#3B82F6', pin: 'D10' },
              { x: 215.5, color: '#059669', wire: '#0EA5E9', pin: 'D11' },
            ].map((node) => (
              <g key={node.pin}>
                {/* Jumper wire to top pins */}
                <path
                  d={`M${node.x} 64 V22`}
                  fill="none"
                  stroke={node.wire}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <text
                  x={node.x}
                  y="16"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#1D4ED8"
                >
                  {node.pin}
                </text>
                {/* Ground bridge from LED cathode to GND rail */}
                <path d={`M${node.x + 12} 76 V48`} fill="none" stroke="#334155" strokeWidth="1.5" />
                {/* LED indicator circle spanning columns */}
                <circle cx={node.x + 6} cy="72" r="7" fill={node.color} fillOpacity="0.18" stroke={node.color} strokeWidth="1.8" />
                <circle cx={node.x + 6} cy="72" r="2.8" fill={node.color} />
              </g>
            ))}

            {/* Common GND Return Wire */}
            <path d="M40 48 H28 V170 H72" fill="none" stroke="#1E293B" strokeWidth="1.8" />
            <text x="78" y="173" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#334155">
              TO ARDUINO GND
            </text>
          </svg>
        </div>

        <figcaption className="text-xs leading-relaxed text-slate-600">
          Vertical terminal columns link each LED lead to its jumper wire, keeping connections organized and testable without soldering.
        </figcaption>
      </figure>
    </div>
  );
}

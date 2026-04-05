'use client';

import { useState } from 'react';
import { calculatorTechnologies, type TechnologyType } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAnimatedCounter, formatNumber } from '../hooks/useAnimatedCounter';

/* Simple capacity-factor model */
const capacityFactors: Record<TechnologyType, number> = {
  solar: 0.11,
  wind: 0.27,
  bess: 0.0, // BESS doesn't generate
};
const CO2_PER_MWH = 0.233; // UK grid average tCO₂/MWh displaced
const HOMES_PER_MWH = 0.29; // ~3.5 MWh/home/year → 1/3.5

function ResultCard({ label, value, suffix, active }: { label: string; value: number; suffix: string; active: boolean }) {
  const count = useAnimatedCounter(value, 1800, active);
  return (
    <div className="text-center">
      <p className="font-heading text-2xl sm:text-3xl text-teal">
        {formatNumber(count)}{suffix}
      </p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}

export default function Calculator() {
  const [tech, setTech] = useState<TechnologyType>('solar');
  const [capacity, setCapacity] = useState(25);
  const { ref, isVisible } = useScrollReveal();
  const [calculated, setCalculated] = useState(false);

  const annualMWh = capacity * capacityFactors[tech] * 8760;
  const co2 = Math.round(annualMWh * CO2_PER_MWH);
  const homes = Math.round(annualMWh * HOMES_PER_MWH);

  const handleCalculate = () => setCalculated(true);

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-surface/30" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <p className="text-teal text-sm font-semibold tracking-wide uppercase mb-3">Impact Calculator</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">
            Estimate Your Project&apos;s Impact
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            See the potential carbon savings and homes powered by your
            renewable energy project.
          </p>
        </div>

        <div
          className={`glass rounded-2xl p-8 sm:p-10 transition-all duration-500 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Technology */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Technology
              </label>
              <div className="flex gap-2">
                {calculatorTechnologies.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { setTech(t.value); setCalculated(false); }}
                    className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      tech === t.value
                        ? 'bg-teal/15 text-teal border border-teal/30'
                        : 'bg-surface-elevated text-text-muted border border-transparent hover:text-text-secondary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity slider */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Capacity: <span className="text-teal font-semibold">{capacity} MW</span>
              </label>
              <input
                type="range"
                min={5}
                max={150}
                step={5}
                value={capacity}
                onChange={(e) => { setCapacity(Number(e.target.value)); setCalculated(false); }}
                className="w-full accent-teal"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>5 MW</span>
                <span>150 MW</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="btn-magnetic w-full rounded-xl bg-teal py-3.5 text-sm font-semibold text-navy"
          >
            Calculate Impact
          </button>

          {calculated && tech !== 'bess' && (
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-surface-elevated">
              <ResultCard label="Annual MWh" value={Math.round(annualMWh)} suffix="" active={calculated} />
              <ResultCard label="tCO₂ Avoided/yr" value={co2} suffix="" active={calculated} />
              <ResultCard label="Homes Powered" value={homes} suffix="" active={calculated} />
            </div>
          )}

          {calculated && tech === 'bess' && (
            <div className="mt-8 pt-8 border-t border-surface-elevated text-center">
              <p className="text-text-secondary text-sm">
                Battery storage doesn&apos;t generate electricity directly — it stores and dispatches
                renewable energy, providing grid stability, frequency response, and revenue through arbitrage.
              </p>
              <p className="text-teal font-heading text-2xl mt-4">
                {capacity} MW / {capacity * 2} MWh capacity
              </p>
              <p className="text-xs text-text-muted mt-1">Typical 2-hour duration system</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

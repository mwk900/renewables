'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ukCountryData } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

const countryPaths: Record<string, string> = {
  england:
    `M204,395L204,395L204,397L205,399L202,398L198,397L196,398L192,398L191,397L192,396L191,397L192,398L188,399L187,401L184,399L185,397L184,397L181,397L178,397L180,398L179,399L176,397L174,395L173,394L175,398L171,400L170,401L167,400L166,401L163,401L162,402L161,401L159,401L161,402L162,403L161,405L159,405L158,404L151,404L150,405L152,407L147,403L143,401L141,400L139,401L133,402L133,404L131,405L129,402L129,405L128,407L127,411L129,412L128,412L128,413L125,415L125,417L123,418L120,417L120,415L118,415L117,415L115,414L115,413L114,413L113,414L111,413L108,413L106,414L103,414L103,413L101,414L100,418L99,417L96,419L96,420L96,419L94,422L95,423L94,425L93,425L91,426L90,423L89,422L85,421L84,423L81,424L81,420L84,418L86,418L91,415L91,414L93,413L93,411L95,410L95,406L97,406L97,407L99,408L99,407L98,407L97,406L99,405L100,405L101,402L102,402L103,401L104,399L105,399L105,394L106,390L108,391L109,391L111,391L113,389L112,385L115,384L120,383L122,383L126,384L127,383L130,385L133,385L136,384L137,384L139,383L139,380L143,374L145,374L146,371L150,367L147,368L146,370L146,366L146,362L145,362L142,359L140,360L137,356L136,352L137,348L139,347L140,344L138,344L134,341L137,339L138,339L139,336L137,337L136,336L138,334L139,331L140,331L139,330L136,329L136,326L136,325L137,324L138,324L140,323L141,323L142,323L143,325L145,324L145,322L143,321L141,317L139,316L141,315L140,314L137,312L136,310L135,307L138,305L139,308L140,310L142,311L144,310L142,309L139,307L138,302L137,302L137,300L140,295L139,294L138,294L138,288L142,286L141,284L143,282L143,280L142,278L141,278L140,279L139,280L138,277L138,279L135,282L134,281L134,279L135,277L134,276L134,277L133,278L132,278L130,274L130,273L128,270L126,267L127,263L127,261L128,258L130,257L130,253L131,252L133,253L132,251L134,250L136,251L138,250L139,250L138,250L136,250L138,248L138,246L140,246L142,244L143,243L145,241L147,238L149,236L150,235L152,235L153,233L157,230L156,227L153,224L155,223L159,219L160,219L163,222L164,223L168,226L169,229L170,232L169,233L170,236L170,237L171,241L171,243L173,248L174,249L175,253L175,256L178,259L179,262L177,262L179,261L182,263L184,264L187,264L190,267L191,267L193,270L196,276L198,277L199,279L202,280L200,281L199,283L199,285L200,289L203,293L206,297L207,299L204,298L201,298L199,296L197,294L194,295L192,296L190,295L189,296L189,297L187,301L188,302L186,305L187,307L186,305L188,302L188,301L188,299L189,296L190,295L192,297L193,296L197,295L199,298L202,300L204,303L206,304L207,304L208,306L210,311L211,314L211,318L210,318L207,321L205,324L207,326L208,328L211,328L212,330L211,331L211,335L209,339L205,344L204,344L205,344L209,339L211,335L211,331L212,330L211,328L213,326L214,323L216,322L219,322L219,323L222,322L222,323L223,323L226,322L231,323L233,324L238,328L240,331L241,334L238,336L237,337L234,335L233,335L232,334L232,334L233,335L234,335L237,337L238,337L239,338L239,336L241,335L242,340L240,346L239,347L238,350L238,353L235,354L235,355L234,357L232,355L234,357L232,359L231,358L229,358L227,358L231,359L230,360L229,361L231,361L230,363L228,364L226,365L225,363L224,363L222,366L219,366L220,367L222,366L223,365L224,366L224,369L221,371L222,372L220,373L217,373L216,373L217,373L213,374L213,375L210,375L206,373L205,374L201,374L199,375L198,374L199,375L201,374L205,374L206,373L210,376L212,376L214,374L219,375L219,376L217,376L217,377L215,377L217,378L219,378L220,379L223,379L226,379L231,378L234,378L234,380L233,380L234,383L234,385L233,386L229,388L226,389L225,390L224,392L225,394L220,393L218,395L212,397L211,398L209,400Z`,
  scotland:
    `M164,155L163,156L161,158L159,164L159,166L159,167L156,172L156,174L156,176L153,179L152,180L150,184L150,186L149,188L147,188L145,191L145,192L143,191L139,192L137,192L133,196L139,194L141,192L143,193L143,195L144,197L146,197L148,199L145,202L143,203L140,202L136,205L135,207L133,208L130,209L127,208L123,209L126,209L132,211L135,210L138,212L141,211L142,208L143,207L146,208L149,210L151,210L153,212L156,212L158,213L159,215L160,217L159,218L158,220L155,223L153,224L156,227L156,231L153,233L152,235L150,235L149,236L147,238L145,241L143,243L142,244L140,246L138,246L138,248L136,249L127,249L127,247L126,253L124,252L122,253L121,252L121,254L118,256L116,256L116,254L115,257L113,255L113,253L112,254L108,252L109,254L110,255L110,259L109,260L105,258L105,256L102,254L101,254L100,253L97,254L97,255L98,257L99,261L97,260L97,259L96,256L94,254L92,251L92,249L93,248L94,247L94,250L96,251L95,247L96,242L99,239L99,236L101,234L101,233L103,231L104,229L102,225L100,224L98,221L99,220L98,217L99,212L100,211L101,212L105,213L106,213L102,211L102,210L101,209L101,210L99,210L98,208L101,203L99,206L98,204L98,205L99,206L98,208L98,210L96,215L95,215L94,212L93,211L94,213L94,214L92,212L91,214L92,216L89,215L88,214L89,210L92,205L94,204L95,202L97,200L94,201L93,203L92,204L88,210L86,208L86,211L87,214L89,217L89,218L87,219L86,221L86,224L86,226L84,230L84,232L85,234L83,236L79,237L79,233L80,232L80,226L81,224L81,222L82,221L84,219L86,217L86,216L84,218L83,219L82,218L82,215L83,213L81,214L81,213L83,209L81,212L81,211L85,203L83,205L85,199L83,200L83,197L86,193L90,192L91,193L92,192L94,188L92,192L88,192L87,192L86,190L88,189L87,188L90,185L89,185L91,183L94,183L91,182L94,178L92,177L93,178L91,180L91,182L89,182L87,185L85,186L84,189L82,190L80,190L76,188L74,186L74,185L76,184L77,185L80,183L77,184L76,184L76,183L75,184L73,183L70,183L70,182L70,181L71,180L75,180L78,181L77,179L80,179L77,178L80,177L79,176L80,175L78,175L77,176L77,175L78,171L80,170L82,172L81,169L79,168L80,166L83,166L85,168L84,165L82,165L81,164L82,162L82,161L85,160L87,162L86,161L85,160L80,160L81,158L84,157L86,155L86,154L84,156L83,157L82,155L79,157L78,156L79,153L77,152L78,148L78,147L82,151L85,149L82,149L80,146L78,145L79,143L81,143L81,142L78,141L78,136L81,136L81,139L83,140L83,139L83,137L82,136L83,134L84,134L84,136L86,137L87,134L89,136L91,137L88,134L91,134L93,136L94,138L94,136L91,134L92,132L89,131L88,129L86,128L86,127L88,128L90,128L90,126L89,124L87,121L88,120L89,121L91,120L92,121L93,120L95,121L98,120L94,120L92,116L93,114L94,115L95,115L94,113L94,112L94,111L93,109L96,107L96,105L97,105L101,107L103,109L101,112L103,111L105,109L105,107L107,107L108,108L108,109L107,113L110,109L111,109L113,109L113,108L114,108L115,107L115,108L116,108L117,106L117,107L118,107L120,108L122,108L123,106L127,105L128,106L130,106L131,106L131,105L130,104L131,103L132,104L135,104L136,105L138,104L138,106L136,110L137,111L138,111L137,116L134,118L133,118L131,120L128,124L127,125L123,128L121,129L121,130L118,132L117,133L117,136L115,137L112,136L111,137L113,136L114,137L116,138L118,137L121,138L122,136L122,137L118,143L117,143L117,141L114,143L111,144L108,147L108,148L112,144L114,145L117,144L118,144L116,145L112,151L109,150L109,152L114,151L117,148L117,147L120,147L124,145L128,144L128,143L132,142L136,144L138,144L142,143L144,143L150,144L151,144L153,144L154,143L156,144L158,143L160,143L162,144L164,146L165,152L165,153L164,153L164,154ZM47,155L47,156L47,157L48,157L48,158L48,160L46,161L45,161L45,162L46,162L47,163L47,165L46,165L45,165L47,165L48,167L45,167L44,165L43,161L44,158L44,156L45,155ZM66,126L67,129L66,131L64,130L62,131L65,131L64,133L62,134L60,134L59,132L59,130L58,131L60,134L59,134L60,136L57,135L58,138L57,139L56,138L56,140L55,140ZM71,163L67,164L65,160L64,158L64,157L64,155L62,156L62,157L59,156L58,154L57,154L59,150L61,154L61,153L61,151L62,151L61,149L61,147L62,147L62,149L64,150L65,152L66,150L67,151L66,148L66,146L65,145L68,143L69,145L71,146L71,148L71,154L70,154L72,155L71,156L72,158L73,158L73,160L74,159L77,161L79,160L82,160L81,162L79,164L79,166L77,166L76,169L74,170L74,169L74,166L76,164L75,164L74,163L72,166L72,163ZM143,91L142,91L144,93L144,92L145,91L145,93L144,93L143,95L141,94L141,95L142,96L140,101L139,97L141,96L141,94L139,91L139,92L135,93L134,90L132,92L131,91L131,89L131,87L131,85L132,85L131,85L132,84L135,83L139,86L139,88L137,89L139,89L140,90L141,89L141,91L142,90ZM175,48L175,47L176,41L176,39L175,40L176,37L174,38L172,41L171,40L171,39L170,39L171,37L169,38L167,37L167,36L167,35L167,34L169,34L171,33L172,35L172,34L173,33L174,35L174,32L176,31L174,31L173,30L172,29L173,28L172,26L171,27L171,26L168,26L169,25L170,25L170,24L171,24L173,22L173,21L173,20L174,21L175,20L175,19L175,24L174,24L175,26L175,28L177,26L179,28L177,30L179,30L181,28L179,30L180,32L178,32L178,33L180,33L179,35L180,36L178,37L177,40L179,38L179,39L179,41L178,42L177,43L178,44L178,45L177,46L178,47L176,47L177,49L176,53L175,53L175,51L174,52L174,51L174,50L175,49ZM74,222L73,222L73,223L71,224L70,224L69,226L67,225L68,223L69,223L67,220L69,218L67,218L65,221L64,222L63,222L63,221L64,221L64,219L65,215L67,215L68,215L72,212L72,214L73,218L74,222ZM77,214L77,214L76,215L75,218L73,217L72,214L73,212L77,211L76,211L74,211L75,210L77,207L81,204L81,206L79,209L78,211ZM68,188L67,186L70,186L70,185L71,184L73,185L75,188L75,189L79,190L81,192L82,192L82,195L80,195L79,196L81,195L78,198L76,197L73,198L70,199L69,199L67,199L66,198L66,197L67,196L68,197L70,197L74,196L75,195L70,196L70,195L72,192L74,192L74,190L72,192L69,189L67,189ZM85,193L84,195L83,195ZM70,190L71,192L69,192ZM87,188L85,191L84,191L86,188ZM57,191L56,191L55,193L53,192L53,190L55,189L55,190L58,188L59,189L57,190ZM64,185L63,186L62,187L59,187L63,184L64,183L65,183Z`,
  wales:
    `M114,313L111,316L110,316L108,316L105,312L105,311L105,307L108,306L111,306L111,308L112,308L113,311L115,310L117,310L116,312ZM112,369L113,370L114,370L116,368L114,369L114,368L110,368L109,366L110,366L109,364L107,366L105,366L103,366L102,369L101,369L99,369L97,371L95,370L95,367L96,367L98,366L98,365L98,367L96,367L94,366L93,367L90,366L94,364L93,361L89,361L89,360L94,358L94,356L96,356L96,357L99,356L99,355L101,354L102,352L105,351L106,352L109,349L110,349L113,347L115,345L115,343L116,338L118,337L116,337L115,335L116,332L114,328L115,327L114,325L116,325L115,324L109,325L108,326L107,327L107,328L104,327L104,328L101,328L103,325L105,323L106,323L110,320L111,317L115,313L116,313L121,311L120,309L122,309L123,310L126,311L128,310L129,311L128,310L132,308L136,312L140,315L139,316L141,317L143,321L145,322L145,324L143,325L142,323L140,323L138,324L137,324L135,327L136,329L139,329L140,331L139,331L137,335L136,336L137,338L139,336L139,337L138,339L137,339L134,341L138,344L140,344L139,347L136,351L137,351L136,354L137,356L140,360L142,359L145,362L146,362L146,368L146,370L145,371L141,373L139,372L139,373L136,374L135,377L132,378L127,377L125,375L123,374L122,371L121,370L118,370L118,372L116,372L115,371L114,373L112,372L111,372L111,370ZM137,312L140,314L140,315L137,312Z`,
  'northern-ireland':
    `M77,259L76,261L77,262L80,260L83,260L84,261L85,263L86,264L86,268L86,269L86,271L85,273L83,276L82,277L80,276L78,276L77,277L77,279L76,281L73,284L72,283L70,282L70,281L68,281L68,282L66,281L67,282L65,283L62,283L61,284L60,282L61,280L60,278L59,278L57,277L55,272L53,270L52,269L50,273L49,272L50,277L47,277L48,279L47,281L47,279L46,280L46,281L43,279L42,280L41,280L39,279L38,277L35,278L34,277L34,274L32,273L31,272L30,271L27,268L30,267L31,265L35,265L38,262L35,261L34,262L33,259L35,258L37,259L39,257L41,257L41,256L42,254L43,252L43,250L44,250L44,248L45,246L47,245L52,246L53,245L54,241L56,242L59,241L63,240L64,238L66,239L69,240L71,239L74,242L73,245L75,246L75,248L76,249L77,251L79,253L80,253L81,255L81,257L80,258Z`,
};

const cityMarkers = [
  { name: 'London', x: 201, y: 374 },
  { name: 'Edinburgh', x: 135, y: 212 },
  { name: 'Cardiff', x: 136, y: 375 },
  { name: 'Belfast', x: 76, y: 263 },
];

export default function Coverage() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal(0.15);

  const activeCountry = ukCountryData.find((c) => c.id === hoveredCountry);

  const statusDot = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-teal';
      case 'Construction':
        return 'bg-amber';
      case 'Planning':
        return 'bg-text-muted';
      default:
        return 'bg-teal';
    }
  };

  return (
    <section id="coverage" className="py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-text-muted mb-12 sm:mb-16"
        >
          Coverage
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-start"
        >
          {/* Map Panel */}
          <div className="coverage-map-panel glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="coverage-map-backdrop absolute inset-0 pointer-events-none" />

            <svg
              viewBox="0 0 260 440"
              className="relative z-10 w-full h-auto max-h-[28rem] sm:max-h-[34rem] mx-auto"
              style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.12))' }}
            >
              <defs>
                <radialGradient id="map-glow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="var(--coverage-map-glow)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <pattern
                  id="map-grid"
                  x="0"
                  y="0"
                  width="26"
                  height="26"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="26"
                    className="coverage-grid-line"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="26"
                    y2="0"
                    className="coverage-grid-line"
                  />
                </pattern>
              </defs>

              <rect
                x="0"
                y="0"
                width="260"
                height="440"
                fill="url(#map-glow)"
              />
              <rect
                x="30"
                y="5"
                width="220"
                height="430"
                fill="url(#map-grid)"
                opacity="0.15"
              />

              {/* Country paths */}
              {ukCountryData.map((country) => (
                <path
                  key={country.id}
                  d={countryPaths[country.id]}
                  className={`coverage-country${hoveredCountry === country.id ? ' coverage-country-active' : ''}`}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() =>
                    setHoveredCountry(
                      hoveredCountry === country.id ? null : country.id,
                    )
                  }
                />
              ))}

              {/* City markers */}
              {cityMarkers.map((city) => (
                <g key={city.name} className="pointer-events-none">
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="2"
                    className="coverage-city-dot"
                  />
                  <text
                    x={city.x + 6}
                    y={city.y + 2.5}
                    className="coverage-city-label"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center lg:min-h-[28rem]">
            <AnimatePresence mode="wait">
              {activeCountry ? (
                <motion.div
                  key={activeCountry.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <button
                      onClick={() => setHoveredCountry(null)}
                      className="text-xs text-text-muted hover:text-teal transition-colors mb-2 flex items-center gap-1"
                    >
                      <span>←</span> All countries
                    </button>
                    <h3 className="font-heading text-2xl sm:text-3xl text-text-primary">
                      {activeCountry.name}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {activeCountry.projects.length} project
                      {activeCountry.projects.length !== 1 ? 's' : ''} ·{' '}
                      {activeCountry.totalCapacity}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeCountry.projects.map((project, i) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="glass rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {project.name}
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              {project.technology}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-teal whitespace-nowrap">
                            {project.capacity}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusDot(project.status)}`}
                          />
                          <span className="text-[10px] text-text-muted uppercase tracking-wider">
                            {project.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl text-text-primary">
                      Nationwide Coverage
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      Hover over a country to explore our projects
                    </p>
                  </div>

                  <div className="space-y-2">
                    {ukCountryData.map((country) => (
                      <button
                        key={country.id}
                        onMouseEnter={() => setHoveredCountry(country.id)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() =>
                          setHoveredCountry(
                            hoveredCountry === country.id
                              ? null
                              : country.id,
                          )
                        }
                        className="w-full coverage-summary-card glass rounded-xl p-4 text-left transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {country.name}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">
                              {country.projects.length} project
                              {country.projects.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-teal">
                            {country.totalCapacity}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-8">
          {[
            { status: 'Operational', color: 'bg-teal' },
            { status: 'Construction', color: 'bg-amber' },
            { status: 'Planning', color: 'bg-text-muted' },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

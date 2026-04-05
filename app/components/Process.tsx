'use client';

import { motion } from 'framer-motion';
import { timelineSteps } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Process() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-16"
        >
          <p className="text-teal text-sm font-semibold tracking-wide uppercase mb-3">How We Work</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">
            From Site to Grid
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Our proven five-stage development process delivers projects on time
            and on budget — every time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-surface-elevated md:left-1/2 md:-translate-x-px overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={isVisible ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-teal/30"
            />
          </div>

          <div className="space-y-12">
            {timelineSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30, x: isLeft ? -20 : 20 }}
                  animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-start gap-6 md:gap-0"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-none md:absolute md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{
                        delay: i * 0.2 + 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="h-10 w-10 rounded-full bg-surface border-2 border-teal/40 grid place-items-center text-sm font-bold text-teal"
                    >
                      {step.id}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)] ${
                      isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                    }`}
                  >
                    <div className="glass rounded-xl p-6 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,212,161,0.06)]">
                      <h3 className="font-heading text-lg text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'solar' | 'wind' | 'bess';
}

export interface Project {
  id: number;
  name: string;
  location: string;
  technology: string;
  capacity: string;
  year: number;
  description: string;
  gradient: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
}

export interface CountryProject {
  name: string;
  technology: string;
  capacity: string;
  status: 'Operational' | 'Construction' | 'Planning';
}

export interface UKCountry {
  id: string;
  name: string;
  projects: CountryProject[];
  totalCapacity: string;
}

/* ── Live Stats ── */
export const stats: Stat[] = [
  { label: 'Installed Capacity', value: 847, suffix: 'MW' },
  { label: 'Emissions Avoided', value: 412, suffix: 'k tCO₂' },
  { label: 'Counties', value: 12, suffix: '' },
  { label: 'Projects', value: 34, suffix: '' },
];

/* ── Services ── */
export const services: Service[] = [
  {
    id: 'solar',
    title: 'Solar Farms',
    description:
      'Utility-scale ground-mount solar from 5 MW to 100 MW+. Optimised panel layouts, single-axis trackers, and integrated inverter stations for maximum yield.',
    icon: 'solar',
  },
  {
    id: 'wind',
    title: 'Onshore Wind',
    description:
      'Tip heights up to 200 m using latest-generation turbines. Full lifecycle support from wind resource assessment through to 25-year O&M contracts.',
    icon: 'wind',
  },
  {
    id: 'bess',
    title: 'Battery Storage (BESS)',
    description:
      'Grid-scale lithium-ion and flow battery installations from 10 MWh to 200 MWh. Revenue-stacked for FFR, wholesale arbitrage, and capacity markets.',
    icon: 'bess',
  },
];

/* ── Featured Projects ── */
export const projects: Project[] = [
  {
    id: 1,
    name: 'Lincolnshire Solar Park',
    location: 'Lincolnshire',
    technology: 'Solar',
    capacity: '48 MW',
    year: 2023,
    description:
      'One of the East Midlands\' largest solar installations, spanning 240 acres of Grade 3b agricultural land with biodiversity net gain.',
    gradient: 'linear-gradient(135deg, #1a2a18 0%, #2a4a25 30%, #3d6535 60%, #1a2a18 100%)',
  },
  {
    id: 2,
    name: 'Northumberland Wind Array',
    location: 'Northumberland',
    technology: 'Onshore Wind',
    capacity: '62 MW',
    year: 2024,
    description:
      'Eight V150-class turbines across exposed upland terrain, delivering clean power equivalent to 38,000 homes annually.',
    gradient: 'linear-gradient(135deg, #0f1c2e 0%, #1a3555 30%, #245080 60%, #0f1c2e 100%)',
  },
  {
    id: 3,
    name: 'Midlands BESS Hub',
    location: 'West Midlands',
    technology: 'BESS',
    capacity: '80 MWh',
    year: 2024,
    description:
      'Co-located battery storage providing frequency response and wholesale arbitrage, de-risking grid balancing for the West Midlands region.',
    gradient: 'linear-gradient(135deg, #1a1428 0%, #2e2045 30%, #452e68 60%, #1a1428 100%)',
  },
  {
    id: 4,
    name: 'Yorkshire Solar-Storage Hybrid',
    location: 'Yorkshire',
    technology: 'Solar + BESS',
    capacity: '35 MW + 40 MWh',
    year: 2025,
    description:
      'Integrated solar-plus-storage delivering dispatchable clean energy, maximising revenue through time-shifted export and ancillary services.',
    gradient: 'linear-gradient(135deg, #1a2420 0%, #264038 30%, #2d5a4a 60%, #1a2420 100%)',
  },
];

/* ── Process Timeline ── */
export const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Site Assessment',
    description:
      'Desktop feasibility, grid capacity analysis, and environmental screening to confirm project viability.',
  },
  {
    id: 2,
    title: 'Planning & Consenting',
    description:
      'Full planning applications, community engagement, and environmental impact assessments managed in-house.',
  },
  {
    id: 3,
    title: 'Engineering Design',
    description:
      'Detailed electrical and civil design, procurement strategy, and construction programme development.',
  },
  {
    id: 4,
    title: 'Construction',
    description:
      'Principal contractor coordination, health and safety management, and quality assurance on-site.',
  },
  {
    id: 5,
    title: 'Grid Connection & Commissioning',
    description:
      'DNO liaison, SAT/FAT testing, energisation, and handover to the operations team for long-term management.',
  },
];

/* ── Testimonials (dedicated section) ── */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Meridian turned a complex brownfield site into a 30 MW solar farm that\'s now one of our top-performing assets. Their technical rigour and commercial acumen set them apart.',
    author: 'Catherine Voss',
    role: 'Head of Renewables',
    company: 'Foresight Group',
  },
  {
    id: 2,
    quote:
      'From the first site visit to grid energisation, the Meridian team were meticulous. Our 62 MW wind project was delivered on budget with zero lost-time incidents.',
    author: 'Andrew Blackwell',
    role: 'Managing Director',
    company: 'Blackwell Estates',
  },
  {
    id: 3,
    quote:
      'Working with Meridian on the grid connection strategy saved us eighteen months on our programme. They understand the DNO landscape better than anyone.',
    author: 'Fiona Cresswell',
    role: 'Grid Strategy Lead',
    company: 'National Grid ESO',
  },
  {
    id: 4,
    quote:
      'The BESS installation was completed three weeks early and has been generating ancillary revenue from day one. Meridian\'s approach to revenue stacking is genuinely innovative.',
    author: 'Marcus Thorne',
    role: 'Chief Investment Officer',
    company: 'Greencoat Capital',
  },
  {
    id: 5,
    quote:
      'As a landowner, I was cautious about leasing for wind. Meridian\'s transparency throughout planning and their community benefit fund made the decision straightforward.',
    author: 'Helen Ridley',
    role: 'Estate Owner',
    company: 'Ridley Farm Partnership',
  },
  {
    id: 6,
    quote:
      'Meridian\'s environmental assessments are sector-leading. BNG delivery exceeded our requirements and the ecological monitoring programme is exemplary.',
    author: 'Dr. Liam Osborne',
    role: 'Principal Ecologist',
    company: 'Natural England',
  },
];

/* ── UK Country Data (Coverage Map) ── */
export const ukCountryData: UKCountry[] = [
  {
    id: 'scotland',
    name: 'Scotland',
    projects: [
      { name: 'Highland Wind Farm', technology: 'Onshore Wind', capacity: '45 MW', status: 'Operational' },
      { name: 'Aberdeenshire BESS', technology: 'BESS', capacity: '60 MWh', status: 'Planning' },
    ],
    totalCapacity: '105 MW',
  },
  {
    id: 'england',
    name: 'England',
    projects: [
      { name: 'Lincolnshire Solar Park', technology: 'Solar', capacity: '48 MW', status: 'Operational' },
      { name: 'Northumberland Wind Array', technology: 'Onshore Wind', capacity: '62 MW', status: 'Operational' },
      { name: 'Yorkshire Solar-Storage', technology: 'Solar + BESS', capacity: '75 MW', status: 'Construction' },
      { name: 'Midlands BESS Hub', technology: 'BESS', capacity: '80 MWh', status: 'Operational' },
      { name: 'Cornwall Wind Farm', technology: 'Onshore Wind', capacity: '28 MW', status: 'Planning' },
    ],
    totalCapacity: '293 MW',
  },
  {
    id: 'wales',
    name: 'Wales',
    projects: [
      { name: 'Pembrokeshire Solar', technology: 'Solar', capacity: '22 MW', status: 'Construction' },
      { name: 'Snowdonia Wind Park', technology: 'Onshore Wind', capacity: '36 MW', status: 'Planning' },
    ],
    totalCapacity: '58 MW',
  },
  {
    id: 'northern-ireland',
    name: 'Northern Ireland',
    projects: [
      { name: 'Antrim Wind Array', technology: 'Onshore Wind', capacity: '18 MW', status: 'Planning' },
    ],
    totalCapacity: '18 MW',
  },
];

/* ── Calculator Presets ── */
export const calculatorTechnologies = [
  { value: 'solar', label: 'Solar' },
  { value: 'wind', label: 'Onshore Wind' },
  { value: 'bess', label: 'Battery Storage (BESS)' },
] as const;

export type TechnologyType = (typeof calculatorTechnologies)[number]['value'];

/* ── Nav links ── */
export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Contact', href: '#contact' },
];

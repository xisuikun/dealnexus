export interface Deal {
  id: string;
  name: string;
  industry: string;
  revenue: string;
  ebitda: string;
  valuation: string;
  location: string;
  description: string;
  growth: number;
  tags: string[];
  status: 'active' | 'pending' | 'closed';
  isBookmarked: boolean;
  logoUrl?: string;
  yearFounded: number;
  employees: string;
}

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'CloudScale AI',
    industry: 'SaaS / AI',
    revenue: '$12.5M',
    ebitda: '$3.2M',
    valuation: '$85M',
    location: 'San Francisco, CA',
    description: 'A leading provider of enterprise-grade AI infrastructure and cloud optimization tools for Fortune 500 companies.',
    growth: 45,
    tags: ['Artificial Intelligence', 'B2B SaaS', 'Cloud'],
    status: 'active',
    isBookmarked: true,
    yearFounded: 2019,
    employees: '50-100',
  },
  {
    id: '2',
    name: 'FinFlow Payments',
    industry: 'Fintech',
    revenue: '$45M',
    ebitda: '$12M',
    valuation: '$250M',
    location: 'London, UK',
    description: 'Next-generation payment processing platform specialized in cross-border transactions for e-commerce giants.',
    growth: 120,
    tags: ['Fintech', 'Payments', 'Global'],
    status: 'active',
    isBookmarked: false,
    yearFounded: 2017,
    employees: '200-500',
  },
  {
    id: '3',
    name: 'GreenPulse Energy',
    industry: 'CleanTech',
    revenue: '$8.2M',
    ebitda: '$1.5M',
    valuation: '$42M',
    location: 'Austin, TX',
    description: 'Smart grid management software that helps residential neighborhoods transition to renewable energy sources.',
    growth: 30,
    tags: ['Renewable Energy', 'IOT', 'Sustaintability'],
    status: 'active',
    isBookmarked: false,
    yearFounded: 2020,
    employees: '25-50',
  },
  {
    id: '4',
    name: 'BioGenix Labs',
    industry: 'HealthTech',
    revenue: '$22M',
    ebitda: '$6.8M',
    valuation: '$110M',
    location: 'Boston, MA',
    description: 'Advanced genetic testing and personalized medicine platform with multiple FDA-cleared diagnostics.',
    growth: 15,
    tags: ['Biotech', 'Health', 'Diagnostics'],
    status: 'active',
    isBookmarked: true,
    yearFounded: 2015,
    employees: '100-200',
  },
  {
    id: '5',
    name: 'SwiftLogix',
    industry: 'Logistics / Supply Chain',
    revenue: '$120M',
    ebitda: '$24M',
    valuation: '$450M',
    location: 'Chicago, IL',
    description: 'End-to-end supply chain visibility platform using real-time sensor data and predictive analytics.',
    growth: 22,
    tags: ['Logistics', 'Supply Chain', 'Analytics'],
    status: 'active',
    isBookmarked: false,
    yearFounded: 2014,
    employees: '500-1000',
  },
];

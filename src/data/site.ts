export const siteConfig = {
  shortName: "UPEC",
  fullName: "University of Port Harcourt Entrepreneurial Centre",
  university: "University of Port Harcourt",
  domain: "upec.uniport.edu.ng",

  // Replace these before public launch with verified official UPEC details.
  email: "admissions@upec.uniport.edu.ng",
  phone: "+234 800 000 0000",
  whatsapp: "2348000000000",
  address:
    "Abuja Park, near the Faculty of Management Sciences, University of Port Harcourt, Choba, Rivers State, Nigeria.",

  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    x: "#",
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About UPEC", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Admissions", href: "/admissions" },
  { label: "Incubation Hub", href: "/incubation" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const programmes = [
  {
    slug: "digital-entrepreneurship-ecommerce",
    title: "Digital Entrepreneurship & E-Commerce",
    category: "Professional Certificate",
    duration: "8 Weeks",
    mode: "Online & Hybrid",
    fee: "₦35,000",
    description:
      "Build practical digital-business skills, sell online, understand customer acquisition and grow an enterprise with confidence.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    outcomes: [
      "Understand digital business models and online markets",
      "Set up and manage an e-commerce presence",
      "Attract and retain customers online",
      "Plan pricing, sales and simple digital marketing",
    ],
    modules: [
      "Foundations of Digital Entrepreneurship",
      "Finding and Validating a Business Idea",
      "Building Your Online Store and Brand",
      "Digital Marketing and Customer Acquisition",
      "Payments, Logistics and Operations",
      "Growth, Analytics and Next Steps",
    ],
  },
  {
    slug: "small-business-finance-bookkeeping",
    title: "Small Business Finance & Bookkeeping",
    category: "Professional Certificate",
    duration: "6 Weeks",
    mode: "Online & Hybrid",
    fee: "₦45,000",
    description:
      "Learn how to manage cash flow, keep proper business records, price products and make informed financial decisions.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
    outcomes: [
      "Keep accurate and simple business records",
      "Understand cash flow and profit",
      "Price products and services correctly",
      "Make informed financial decisions",
    ],
    modules: [
      "Why Business Records Matter",
      "Recording Income and Expenses",
      "Understanding Cash Flow",
      "Pricing and Profit",
      "Basic Financial Statements",
      "Planning and Financial Decisions",
    ],
  },
  {
    slug: "agribusiness-venture-development",
    title: "Agribusiness Venture Development",
    category: "Enterprise Programme",
    duration: "8 Weeks",
    mode: "Hybrid",
    fee: "₦50,000",
    description:
      "Turn agricultural opportunities into sustainable ventures through practical planning, market research and business strategy.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85",
    outcomes: [
      "Identify viable agribusiness opportunities",
      "Conduct simple market research",
      "Plan production and operations",
      "Develop a basic agribusiness plan",
    ],
    modules: [
      "The Agribusiness Landscape",
      "Opportunity and Market Research",
      "Production and Value Chains",
      "Costing and Financial Planning",
      "Marketing and Sales",
      "Building a Sustainable Venture",
    ],
  },
  {
    slug: "ai-digital-tools-for-business",
    title: "AI & Digital Tools for Business",
    category: "Future Skills Course",
    duration: "6 Weeks",
    mode: "Online",
    fee: "₦50,000",
    description:
      "Use artificial intelligence and digital tools to improve productivity, marketing, research and business operations.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    outcomes: [
      "Use AI tools to save time and improve output",
      "Apply digital tools to marketing and research",
      "Improve productivity and operations",
      "Understand responsible and practical AI use",
    ],
    modules: [
      "Introduction to AI for Business",
      "Everyday AI Productivity Tools",
      "AI for Marketing and Content",
      "AI for Research and Decisions",
      "Digital Tools for Operations",
      "Building an AI-Ready Mindset",
    ],
  },
];

export const events = [
  {
    date: "18",
    month: "SEP",
    title: "UPEC Entrepreneurship Open Day",
    description:
      "Explore new opportunities, meet facilitators and discover how UPEC can support your enterprise journey.",
    type: "Campus Event",
  },
  {
    date: "02",
    month: "OCT",
    title: "Business Plan & Startup Finance Bootcamp",
    description:
      "A practical bootcamp for entrepreneurs who want to structure, fund and grow viable business ideas.",
    type: "Paid Workshop",
  },
  {
    date: "15",
    month: "NOV",
    title: "UPEC Innovation & Pitch Day",
    description:
      "Student founders and startup teams present ideas, connect with mentors and access new opportunities.",
    type: "Innovation Event",
  },
];

export const successStories = [
  {
    name: "Adaeze N.",
    role: "Creative Enterprise Founder",
    quote:
      "UPEC helped me move from having an idea to building a business plan I could confidently present to customers and partners.",
  },
  {
    name: "David E.",
    role: "Digital Services Entrepreneur",
    quote:
      "The practical learning approach gave me tools I could apply immediately. I now understand my market, pricing and customer journey.",
  },
  {
    name: "Blessing T.",
    role: "Agribusiness Startup Founder",
    quote:
      "The mentorship and business support helped me organise my agribusiness idea into a venture with clear goals.",
  },
];

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2025',
    excerpt: 'Explore the emerging trends, AI tools, and consumer behaviors that will shape digital marketing in the coming years.',
    content: 'Digital marketing is evolving rapidly with AI, voice search, and hyper-personalization leading the way. In 2025, brands will need to focus on data-driven strategies, immersive content, and seamless customer journeys to stay competitive.',
    image: '/assets/blog/blog1.jpg',
    author: 'Jaya Jayswal',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Digital Marketing',
    slug: 'future-of-digital-marketing-2025'
  },
  {
    id: 2,
    title: 'AI-Powered Personalization: Next-Level Customer Experiences',
    excerpt: 'Discover how AI is enabling brands to deliver highly personalized experiences at scale across digital platforms.',
    content: 'From predictive analytics to dynamic content delivery, AI is transforming how businesses engage with customers. Learn how machine learning models can help tailor messaging, recommend products, and improve retention.',
    image: '/assets/blog/blog2.jpg',
    author: 'Neha Sharma',
    date: '2025-02-02',
    readTime: '6 min read',
    category: 'AI & Automation',
    slug: 'ai-powered-personalization'
  },
  {
    id: 3,
    title: 'Video Marketing Strategies That Convert in 2025',
    excerpt: 'Learn how to use short-form and long-form video content to drive engagement, build trust, and boost conversions.',
    content: 'Video remains one of the most powerful tools in digital marketing. In 2025, brands must focus on storytelling, mobile-first formats, and interactive video experiences to capture attention and drive action.',
    image: '/assets/blog/blog3.jpg',
    author: 'Amit Verma',
    date: '2025-03-10',
    readTime: '7 min read',
    category: 'Content Marketing',
    slug: 'video-marketing-strategies-2025'
  },
  {
    id: 4,
    title: 'Voice Search Optimization: How to Get Found',
    excerpt: 'Optimize your content for voice queries and smart assistants to stay ahead in search rankings.',
    content: 'With the rise of smart speakers and mobile voice assistants, optimizing for voice search is no longer optional. Learn how to structure your content, use natural language, and target conversational keywords.',
    image: '/assets/blog/blog4.jpg',
    author: 'Priya Desai',
    date: '2025-04-05',
    readTime: '4 min read',
    category: 'SEO',
    slug: 'voice-search-optimization'
  },
  {
    id: 5,
    title: 'Influencer Marketing: Beyond the Basics',
    excerpt: 'Explore how micro- and nano-influencers are reshaping brand collaborations and driving niche engagement.',
    content: 'Influencer marketing is evolving. Smaller creators with loyal audiences are delivering higher ROI than traditional celebrities. Learn how to identify the right influencers, build authentic partnerships, and measure success.',
    image: '/assets/blog/blog5.jpg',
    author: 'Kunal Joshi',
    date: '2025-05-12',
    readTime: '6 min read',
    category: 'Social Media',
    slug: 'influencer-marketing-beyond-basics'
  },
  {
    id: 6,
    title: 'SEO in 2024: E-A-T, Core Web Vitals & Beyond',
    excerpt: 'Master Google’s latest updates and learn how to improve your site’s credibility, speed, and user experience.',
    content: 'SEO is more than keywords. In 2024 and beyond, Google prioritizes expertise, authority, and trustworthiness (E-A-T), along with technical performance like Core Web Vitals. This post breaks down what you need to do to rank higher.',
    image: '/assets/blog/blog6.jpg',
    author: 'Anjali Gupta',
    date: '2025-06-20',
    readTime: '8 min read',
    category: 'SEO',
    slug: 'seo-2024-eat-core-web-vitals'
  },
  {
    id: 7,
    title: 'Augmented Reality in Retail: Bridging Physical & Digital',
    excerpt: 'See how AR is enhancing customer experiences in stores and online, from virtual try-ons to interactive displays.',
    content: 'Retailers are using AR to create immersive shopping experiences. Whether it’s trying on clothes virtually or visualizing furniture in your home, AR is helping brands connect with customers in exciting new ways.',
    image: '/assets/blog/blog7.jpg',
    author: 'Ritika Nair',
    date: '2025-07-08',
    readTime: '7 min read',
    category: 'Emerging Tech',
    slug: 'ar-in-retail-bridging-physical-digital'
  },
  {
    id: 8,
    title: 'Data Privacy & Marketing: Navigating GDPR & CCPA',
    excerpt: 'Understand how to build trust with customers while staying compliant with global data protection laws.',
    content: 'As privacy regulations tighten, marketers must balance personalization with transparency. Learn how to collect and use data ethically, gain consent, and build trust through clear communication.',
    image: '/assets/blog/blog8.jpg',
    author: 'Manish Reddy',
    date: '2025-08-14',
    readTime: '5 min read',
    category: 'Compliance',
    slug: 'data-privacy-marketing-gdpr-ccpa'
  },
  {
    id: 9,
    title: 'Blockchain for Brand Loyalty Programs',
    excerpt: 'Discover how blockchain can make loyalty programs more secure, transparent, and rewarding.',
    content: 'Blockchain is revolutionizing customer loyalty. By decentralizing rewards and making transactions transparent, brands can build trust and offer more flexible, personalized incentives.',
    image: '/assets/blog/blog9.jpg',
    author: 'Sneha Kulkarni',
    date: '2025-09-03',
    readTime: '6 min read',
    category: 'Innovation',
    slug: 'blockchain-brand-loyalty-programs'
  }
];


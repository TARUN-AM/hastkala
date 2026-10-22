export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
}

export const GUIDE_CATEGORIES = [
  'Getting Started',
  'Shopping',
  'Artisan Studio',
  'AI Tools',
  'Troubleshooting & FAQs'
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: 'start-1',
    title: 'Finding Your Way Around',
    category: 'Getting Started',
    content: 'Hastkala is designed to be intuitive. Use the navigation bar to switch between Shop, Artisans, Craft Stories, and Our Impact. If you have an account, click the Account icon to access your orders, or switch personas if you are a demo user.',
    keywords: ['navigation', 'header', 'getting started']
  },
  {
    id: 'shop-1',
    title: 'How to Purchase',
    category: 'Shopping',
    content: 'Browse our collection, add items to your cart, and proceed to checkout. Hastkala uses a simulated payment gateway for demonstration purposes—orders are processed atomically to ensure stock integrity.',
    keywords: ['checkout', 'purchase', 'buying', 'cart']
  },
  {
    id: 'studio-1',
    title: 'Using the AI Artisan Studio',
    category: 'Artisan Studio',
    content: 'Access your studio dashboard via the artisan account. Click "Add New Craft" to launch the AI Product Studio. Follow the 4-step workflow to upload images, generate descriptions using AI, set fair prices, and publish.',
    keywords: ['artisan', 'studio', 'product', 'listing', 'ai']
  },
  {
    id: 'ai-1',
    title: 'How AI Tools Assist You',
    category: 'AI Tools',
    content: 'The AI tools assist with product photography enhancement, generating multilingual descriptions from voice notes, and calculating fair pricing. Always review the output before publishing, as AI suggestions are meant to assist, not replace, your expert artisan judgment.',
    keywords: ['ai', 'photography', 'cataloguer', 'pricing', 'gemini']
  },
  {
    id: 'faq-1',
    title: 'Troubleshooting Common Issues',
    category: 'Troubleshooting & FAQs',
    content: 'If you encounter issues, ensure your browser is up to date. For microphone issues during voice cataloguing, ensure you have granted microphone permissions. If images fail to upload, verify the file format (JPEG/PNG) and size (under 8MB).',
    keywords: ['troubleshooting', 'faq', 'error', 'microphone', 'images']
  }
];

import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'SLGold — Premium Imitation Jewellery',
  description:
    'SL Gold Covering – Premium imitation jewellery crafted with artisan precision. Explore bridal sets, necklaces, bangles, rings and earrings.',
  keywords: ['gold jewellery', 'imitation jewellery', 'bridal jewellery', 'SL Gold', 'premium jewellery'],
  openGraph: {
    title: 'SLGold — Premium Imitation Jewellery',
    description: "Discover SL Gold stunning collection of premium imitation jewellery.",
    images: ['/images/ssllogo.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}

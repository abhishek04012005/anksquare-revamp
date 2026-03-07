import { StaticImageData } from 'next/image';
import maleImage from "../../public/assets/testimonial/male.png"
import femaleImage from "../../public/assets/testimonial/jaya.png"

export interface TestimonialItem {
    id: number;
    name: string;
    position: string;
    image: StaticImageData | string;
    quote: string;
    rating: number;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: 'Virendra Bavarva',
    position: 'Terra Soil Clayart',
    image: maleImage,
    quote:
      'Ank Square made our Amazon and Flipkart launch seamless. They handled account setup, product listings, and even guided us on pricing. Our online journey started strong.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sunil Kumar Kushwaha',
    position: 'SM ENTERPRISES',
    image: maleImage,
    quote:
      'We were struggling with seller account issues until Ank Square stepped in. Their team took over operations, optimized our listings, and made everything run smoothly.',
    rating: 5
  },
  {
    id: 3,
    name: 'Shubham Walia',
    position: 'Evaware International',
    image: maleImage,
    quote:
      'Managing multiple platforms was a challenge. Ank Square now handles our accounts across six marketplaces—keeping listings updated and operations hassle-free.',
    rating: 5
  },
  {
    id: 4,
    name: 'Atif Siddiqui',
    position: 'Maya All Care',
    image: maleImage,
    quote:
      'Ank Square helped us onboard Blinkit and JioMart with ease. Their account management service is reliable, and they take care of everything from cataloging to logistics.',
    rating: 5
  },
  {
    id: 5,
    name: 'Abbas',
    position: 'Kaminomoto India',
    image: maleImage,
    quote:
      'Thanks to Ank Square, our seller accounts are now professionally managed. They handle listings, updates, and platform coordination so we can focus on growing our brand.',
    rating: 5
  },
  {
    id: 6,
    name: 'Raj Aghara',
    position: 'Backbone Sanitaryware',
    image: maleImage,
    quote:
      'We rely on Ank Square for complete account management across marketplaces. Their team ensures smooth operations, timely updates, and consistent support.',
    rating: 5
  }
]

import { Banner } from '../types';

export const HERO_BANNERS: Banner[] = [
  {
    id: 'banner-pharmacy',
    title: 'Pharmacy at your doorstep!',
    subtitle: 'Pain relief, cough syrups, wellness & more delivered in 10 minutes',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg',
    linkToCategory: 'pharma-wellness',
    tag: '⚡ 10 MIN DELIVERY'
  },
  {
    id: 'banner-pet-care',
    title: 'Pet Care Store',
    subtitle: 'Food, treats, grooming & toys for your furry best friends',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg',
    linkToCategory: 'pet-care',
    tag: '⚡ 10 MIN DELIVERY'
  },
  {
    id: 'banner-baby-care',
    title: 'Baby Care Store',
    subtitle: 'Diapers, wipes, baby food & gentle skincare at best prices',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg',
    linkToCategory: 'baby-care',
    tag: '⚡ INSTANT DELIVER'
  },
  {
    id: 'banner-print',
    title: 'Print Store in 10 Minutes',
    subtitle: 'Upload documents & get black & white or color prints delivered',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/print_crystal_WEB_0.jpg',
    linkToCategory: 'home-office',
    tag: '⚡ ₹2 PER PAGE'
  },
  {
    id: 'banner-paan',
    title: 'Paan Corner Specials',
    subtitle: 'Mints, mouth fresheners, candies & party needs delivered in minutes',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2022-12/paan-corner_web.png',
    linkToCategory: 'paan-corner',
    tag: '⚡ OPEN 24x7'
  }
];

export const PROMO_STRIPS = [
  {
    id: 'strip-1',
    title: 'Get FREE delivery',
    description: 'on orders above ₹199',
    badge: 'SUPER SAVINGS',
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'strip-2',
    title: 'Flat ₹50 OFF',
    description: 'Use code BLINKIT50 on your first order',
    badge: 'NEW USER OFFER',
    bg: 'bg-amber-50 text-amber-900 border-amber-200'
  },
  {
    id: 'strip-3',
    title: 'Assured 10 Min Delivery',
    description: 'Directly from your neighborhood dark store',
    badge: 'BLINKIT PROMISE',
    bg: 'bg-blue-50 text-blue-900 border-blue-200'
  }
];

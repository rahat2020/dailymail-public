'use client'

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '../customSvg';

export const companyLinks = [
    { title: 'Contact', path: '/Contact' },
    { title: 'Careers', path: '/Careers' },
    { title: 'News', path: '/News' }
  ];

export const quickLinks = [
    { title: 'Support Center', path: '/' },
    { title: 'Security', path: '/' },
    { title: 'Privacy Policy', path: '/' },
    { title: 'Documentation', path: '/' }
  ];

export const socialLinks = [
  { platform: 'Instagram', url: 'https://www.instagram.com/kazirahat1020', IconComponent: InstagramIcon },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kazi-rahat2020/', IconComponent: LinkedinIcon },
  { platform: 'Facebook', url: 'https://www.facebook.com/rahatwebdev', IconComponent: FacebookIcon },
  { platform: 'Twitter', url: 'https://twitter.com/KaziRahat2020', IconComponent: TwitterIcon },
];

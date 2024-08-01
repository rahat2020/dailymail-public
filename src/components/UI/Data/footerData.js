'use client'

import InstagramIcon from '@material-ui/icons/Instagram'; 
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

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
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kazi-rahat2020/', IconComponent: LinkedInIcon },
  { platform: 'Facebook', url: 'https://www.facebook.com/rahatwebdev', IconComponent: FacebookIcon },
  { platform: 'Twitter', url: 'https://twitter.com/KaziRahat2020', IconComponent: TwitterIcon },
];

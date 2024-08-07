import React from 'react'
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
import Link from 'next/link';

const SocialIcons = () => {
    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="TH_socialIcon_container">
                <Link href="https://www.instagram.com/kazirahat1020" target="_blank">
                    <Instagram className='TH_socialIcon' />
                </Link>
            </div>
            <div className="TH_socialIcon_container">
                <Link href="https://www.linkedin.com/in/kazi-rahat2020/" target="_blank">
                    <Linkedin className='TH_socialIcon' />
                </Link>
            </div>
            <div className="TH_socialIcon_container">
                <Link href="https://www.facebook.com/rahatwebdev" target="_blank">
                    <Facebook className='TH_socialIcon' />
                </Link>
            </div>
            <div className="TH_socialIcon_container">
                <Link href="https://twitter.com/KaziRahat2020" target="_blank">
                    <Twitter className='TH_socialIcon' />
                </Link>
            </div>
        </div>
    )
}

export default SocialIcons
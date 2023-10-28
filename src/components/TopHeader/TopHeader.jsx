"use client"
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './TopHeader.css';
import Link from 'next/link';
import { toHijri, toGregorian } from "hijri-converter";
import { usePathname } from 'next/navigation';

const TopHeader = () => {

    const newdate = new Date();
    const monthName = newdate.toLocaleString('default', { month: 'long' });
    const month = newdate.getMonth() + 1;
    const currentYear = newdate.getFullYear()
    const currentDate = newdate.getDate()

    const formattedDate = `${currentYear},${month},${currentDate}`;
    const gregorianDate = new Date();
    const hijriDate = toHijri(formattedDate);
    // Print the Hijri date
    // console.log(`Hijri Date: ${hijriDate}`);
    // console.log(`formattedDate: ${formattedDate}`);
    // console.log(monthName, currentDate, currentYear)
    const Tpath = usePathname()
    return (
        <div className='bg-light p-2'>
            <Container className=''>
                <Row>
                    <Col md={10}>
                        <div className="w-50 w-sm-100 ">
                            <div className="d-flex justify-content-between align-items-center mt-3 ">
                                <p className='text-secondary'>{monthName} {currentDate}, {currentYear}</p>
                                <p className=' text-secondary d-none d-md-block d-lg-block d-xl-block'>
                                    <Link href="/advirtisement"
                                        className={Tpath === '/advirtisement' ?
                                            'activecls text-decoration-none ' :
                                            'text-secondary text-decoration-none'}
                                    >
                                        Advertisement
                                    </Link>
                                </p>
                                <p className=' text-secondary d-none d-md-block d-lg-block d-xl-block'>
                                    <Link href="/contact"
                                        className={Tpath === '/contact' ?
                                            'activecls text-decoration-none ' :
                                            'text-secondary text-decoration-none'}
                                    >
                                        Contact
                                    </Link>
                                </p>
                                <p className=' text-secondary d-none d-md-block d-lg-block d-xl-block'>
                                    <Link href="/about"
                                        className={Tpath === '/about' ?
                                            'activecls text-decoration-none ' :
                                            'text-secondary text-decoration-none'}
                                    >
                                        About
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="TH_socialIcon_container">
                                <Link href="https://www.instagram.com/kazirahat1020" target="_blank">
                                    <InstagramIcon className='TH_socialIcon' />
                                </Link>
                            </div>
                            <div className="TH_socialIcon_container">
                                <Link href="https://www.linkedin.com/in/kazi-rahat2020/" target="_blank">
                                    <LinkedInIcon className='TH_socialIcon' />
                                </Link>
                            </div>
                            <div className="TH_socialIcon_container">
                                <Link href="https://www.facebook.com/rahatwebdev" target="_blank">
                                    <FacebookIcon className='TH_socialIcon' />
                                </Link>
                            </div>
                            <div className="TH_socialIcon_container">
                                <Link href="https://twitter.com/KaziRahat2020" target="_blank">
                                    <TwitterIcon className='TH_socialIcon' />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TopHeader
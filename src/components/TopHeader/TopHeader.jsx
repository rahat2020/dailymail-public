"use client"
import React, { useEffect, useState } from 'react';
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

    // TIME FUNCTIONS
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, [1000]);
        return () => clearInterval(intervalID);
    }, []); 

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    // console.log("time", hours, minutes, seconds, formattedHours)


    return (
        <div className='featureds p-2'>
            <Container className=''>
                <Row>
                    <Col md={10}>
                        <div className="w-50 w-sm-50 ">
                            <div className="d-flex justify-content-start align-items-center mt-3 m-1">
                                <p className='text-secondary fw-bold'>
                                    {monthName} {currentDate}, {currentYear} ||  {formattedHours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {ampm}
                                </p>
                                {/* <p className=' text-secondary d-none d-md-block d-lg-block d-xl-block'>
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
                                </p> */}
                                <p className='ms-2 text-secondary d-none d-md-block d-lg-block d-xl-block fw-bold'>
                                    <Link href="/documentations"
                                        className={Tpath === '/documentations' ?
                                            'activecls text-decoration-none ' :
                                            'text-secondary text-decoration-none'}
                                    >
                                    Documentation

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
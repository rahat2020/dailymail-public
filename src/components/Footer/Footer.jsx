"use client"
import React from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import './Footer.css';
import Link from 'next/link';
import { companyLinks, quickLinks, socialLinks } from '../UI/Data/footerData';
import { MapPin, Send } from 'react-feather';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    <footer className="mt-5 pt-4 h-100 shadow-sm">
      <div className="bg-light p-3">
        <Container>
          <Row className='mt-3'>
            <Col md={4}>
              <div className="d-flex justify-content-start flex-column align-items-start h-100">
                <Image src="/dm.png" alt="Logo" style={{ width: '10rem' }} />
                <p className='text-secondary'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, animi! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, rem.</p>
                <div className="d-flex">
                  <MapPin className='text-secondary' /> <p className='text-secondary ms-2'> Chattogram, Bangladesh</p>
                </div>

              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-evenly align-items-start">
                <div className="d-flex flex-column">
                  <h5 className='text-secondary border-bottom w-100'>Company</h5>
                  <div className="d-flex justify-content-start flex-column">
                    {companyLinks?.map((link, index) => (
                      <Link href={link.path} key={index} className='text-decoration-none text-secondary'>
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <h5 className='text-secondary border-bottom w-100'>Quick links</h5>
                  <div className="d-flex justify-content-start flex-column">
                    {quickLinks?.map((link, index) => (
                      <Link href={link.path} key={index} className='text-decoration-none text-secondary'>
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="w-100">
                <div>
                  <h5 className='text-secondary border-bottom w-100'>Subscribe</h5>
                  <Form className="d-flex mt-3 bg-light justify-content-center align-items-center rounded border-0 border-bottom ">
                    <Form.Control
                      type="search"
                      className="me-2 rounded border-0 text-secondary"
                      aria-label="Search"
                    />
                    <Send className='text-muted' />
                  </Form>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    {socialLinks?.map((link, index) => (
                      <div className="" key={index}>
                        <Link href={link.url} target="_blank" className='text-decoration-none'>
                          <link.IconComponent className='TH_socialIcon' />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className=" h-100 p-1 text-center shadow" style={{ backgroundColor: '#dfe8f6' }}>
        <small className='text-secondary fw-bold'>© {getCurrentYear} | All rights reserved to DailyMail</small>
      </div>
    </footer >
  )
}

export default Footer
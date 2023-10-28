"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import './LatestBlogs.css';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useGetAllPostQuery } from '@/redux/apiSlice';


export const Data = [
    {
        id: 1,
        title: 'Beauty of deep space. Billions of galaxies in',
        category: 'Technology',
        name: 'rahat',
        cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg',
        profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
        date: 'January 22, 2023',
        needTime: '10 min'
    },
    {
        id: 2,
        title: 'Rocket Lab mission fails shortly after launch',
        category: 'Science',
        name: 'rahat',
        cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-13-300x169.jpg',
        profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
        date: 'June 22, 2023',
        needTime: '3 min'
    },
    {
        id: 3,
        title: 'The Morning After: Uber sets its sights on Postmates',
        category: 'Technology',
        name: 'rahat',
        cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-14-300x169.jpg',
        profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
        date: 'March 10, 2023',
        needTime: '9 min'
    },
    {
        id: 4,
        title: 'Sony’s Wf-sp800n Earbuds Are A Noise-canceling Alternative.',
        category: 'Mobile',
        cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg',
        profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
        name: 'rahat',
        date: 'March 10, 2023',
        needTime: '4 min'
    },
]


const LatestBlogs = () => {
    const { data, isLoading } = useGetAllPostQuery(undefined)
    const filteredData = data?.filter((item) => item?.status === "approved")
    // console.log('latese blogs', filteredData)
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     setData(Data)
    // }, [])
    return (
        <div>
            <Container className='mt-5 h-100'>
                <h3 className='fw-bold'>Latest Blogs</h3>
                <Row>
                    <Col md={8}>
                        <Carousel data-bs-theme="light" fade indicators={false} >
                            <Carousel.Item>
                                <div className="lb_adImgContainer">
                                    <Card.Img src='/rahatad2.png' className='lb_adImg shadow rounded' />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="lb_adImgContainer">
                                    <Card.Img src='/rahatad.png' className='lb_adImg shadow rounded' />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="lb_adImgContainer">
                                    <Card.Img src='/banner-01.png' className='lb_adImg shadow rounded' />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="lb_adImgContainer">
                                    <Card.Img src='/front.png' className='lb_adImg shadow rounded' />
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col md={4}>
                        <Card className='bg-muted border-0 shadow h-100 w-100 p-4'>
                            <h5 className='fw-bold border-2 border-bottom border-light text-center text-dark'>Search</h5>
                            <Form className="d-flex mt-3 bg-light justify-content-center align-items-center rounded border-0 border-bottom ">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 rounded border-0 "
                                    aria-label="Search"
                                />
                                <SearchIcon className='text-muted' />
                            </Form>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        {
                            isLoading ?
                                <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                    <Spinner animation="grow" />
                                </div>
                                :
                                <>
                                    {
                                        filteredData?.slice(0, 8).map((item, index) => (
                                            <Row key={index} className="g-4 my-3 lb_row">
                                                <Col md={4}>
                                                    <Link href={`/singleblog/${item?._id}`} className='text-decoration-none'>
                                                        <div className="lb_imgConainer">
                                                            <Card.Img src={item?.photoUrlOne ? item?.photoUrlOne : 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg'} className='lb_lftImg' />
                                                        </div>
                                                    </Link>
                                                </Col>
                                                <Col md={8}>
                                                    <Link href={`/singleblog/${item?._id}`} className='text-decoration-none'>
                                                        <Card className='lb_right_cards border-0 shadow p-2'>
                                                            <Card.Header className='text-secondary'>
                                                                <div className="d-flex">
                                                                    <Card.Img src={item?.user[0]?.photo ? item?.user[0]?.photo : 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg'} className='' style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover' }} />
                                                                    <div className="d-flex flex-column justify-content-start align-items-start ms-2">
                                                                        <span style={{ color: '#e97623', fontWeight: 'bold' }}>{item?.name}</span>
                                                                        <small><strong>Author:</strong> {item?.user[0]?.username}</small>
                                                                        <small><strong>Category:</strong> {item?.category}</small>
                                                                        <small><strong>Date:</strong> {item?.publicationDate?.slice(0, 10)}</small>
                                                                    </div>
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body className='lb_right_body'>
                                                                <Card.Title className='lb_rightTitle'>{item?.title}</Card.Title>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </>
                        }

                    </Col>
                    <Col md={4}>
                        <Card className='border-0 rounded shadow h-auto mt-5'>
                            <h5 className='fw-bold border-2 border-bottom border-light text-center text-dark my-3'>Recent Blogs</h5>
                            <Row className='gap-3'>
                                {
                                    filteredData?.slice(0.5)?.map((item, index) => (
                                        <Col md={12} key={index} className='rb_cards'>
                                            <div className="d-flex border-top border-bottom py-2 border-light border-2 shadow-sm">
                                                <div className="w-50 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                                    <Card.Img src={item?.photoUrlOne ? item?.photoUrlOne : 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg'} className=' rb_cardsImg' />
                                                </div>
                                                <div className="d-flex justify-content-start align-items-start flex-column rcb_textPara">
                                                    <h6 className="fw-bold text-secondary">{item?.title}</h6>
                                                    <small className='text-secondary'>{
                                                        item?.user[0]?.username
                                                    }</small>
                                                    <small className='text-secondary'>Need 4 min to read</small>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }

                            </Row>
                        </Card>
                        <Card className='border-0 shadow my-3'>
                            <h5 className='fw-bold border-2 border-bottom border-light text-center text-dark my-3'>Stay in touch</h5>
                            <Row>
                                <Col md={12}>
                                    <div className="d-flex justify-content-evenly align-items-center my-4">
                                        <div className="socialIcon_container">
                                            <InstagramIcon className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <LinkedInIcon className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <FacebookIcon className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <TwitterIcon className='socialIcon' />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default LatestBlogs
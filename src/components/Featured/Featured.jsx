"use client"
import { useGetAllPostQuery, useGetCategoryQuery } from '@/redux/apiSlice';
import './featured.css';
import { Col, Container, Image, Row, Spinner } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';

const Featured = () => {

    const { data, isLoading } = useGetCategoryQuery(undefined)
    const { data: posts, isLoading: loading } = useGetAllPostQuery(undefined)
    const filteredData = posts?.filter((item) => item?.status === "approved")
    console.log('featured blogs', filteredData)
    console.log('featured blog number', filteredData ? filteredData[1] : 'none')
    // console.log('featured category', data)
    return (
        <div className='featureds py-4'>
            <Container className=''>
                <Row className='my-2'>
                    <Col md={6} >
                        <Carousel>
                            <Carousel.Item>
                                <div className="img_container d-flex justify-content-center align-items-cetner shadow-sm">
                                    <Image src={
                                        filteredData ? filteredData[0]?.photoUrlOne : "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg"
                                    } alt={filteredData ? filteredData[0]?.title : 'N/A'} className='feature_left shadow-sm' loading='lazy' />
                                    <div className="overlay">
                                        <small className='category'>{filteredData ? filteredData[0]?.category : 'N/A'}</small>
                                        <h3>{filteredData ? filteredData[0]?.title : 'N/A'}</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="img_container d-flex justify-content-center align-items-cetner shadow-sm">
                                    <Image src={
                                        filteredData ? filteredData[1]?.photoUrlOne : "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg"
                                    } alt={filteredData ? filteredData[1]?.title : 'N/A'} className='feature_left shadow-sm' loading='lazy' />
                                    <div className="overlay">
                                        <small className='category'>{filteredData ? filteredData[1]?.category : 'N/A'}</small>
                                        <h3>{filteredData ? filteredData[1]?.title : 'N/A'}</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="img_container d-flex justify-content-center align-items-cetner shadow-sm">
                                    <Image src={
                                        filteredData ? filteredData[2]?.photoUrlOne : "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg"
                                    } alt={filteredData ? filteredData[1]?.title : 'N/A'} className='feature_left shadow-sm' loading='lazy' />
                                    <div className="overlay">
                                        <small className='category'>{filteredData ? filteredData[2]?.category : 'N/A'}</small>
                                        <h3>{filteredData ? filteredData[2]?.title : 'N/A'}</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="img_container d-flex justify-content-center align-items-cetner shadow-sm">
                                    <Image src={
                                        filteredData ? filteredData[3]?.photoUrlOne : "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg"
                                    } alt={filteredData ? filteredData[1]?.title : 'N/A'} className='feature_left shadow-sm' loading='lazy' />
                                    <div className="overlay">
                                        <small className='category'>{filteredData ? filteredData[3]?.category : 'N/A'}</small>
                                        <h3>{filteredData ? filteredData[3]?.title : 'N/A'}</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="img_container d-flex justify-content-center align-items-cetner shadow-sm">
                                    <Image src="https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-13-390x260.jpg" alt={filteredData ? filteredData[0]?.title : 'N/A'} className='feature_left shadow-sm' loading='lazy' />
                                    <div className="overlay">
                                        <small className='category'>Technology</small>
                                        <h3>Beauty of deep space. Billions of galaxies in</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                    {/* right side content */}
                    <Col md={6} className='gy-3'>

                        <Row className='gy-3'>
                            {
                                loading ?
                                    <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                        <Spinner animation="grow" />
                                    </div> :
                                    <>
                                        {
                                            filteredData?.slice(0, 4)?.map((item, index) => (
                                                <Col md={6} key={index}>
                                                    <Link href={`/singleblog/${item?._id}`} className='text-decoration-none'>
                                                        <Card style={{ height: '15rem' }} className='bg-transparent border-0 cards'>
                                                            <div className="ImagContainer">
                                                                <Card.Img variant="top" src={item?.photoUrlOne ? item?.photoUrlOne : "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-13-390x260.jpg"} className='rounded feature_rghtImg' loading='lazy' />
                                                            </div>
                                                            <div className="p-1">
                                                                <small className='fw-bold category'>{item?.category}</small>
                                                                <p className='fw-bold'>
                                                                    {item?.title}
                                                                </p>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))
                                        }
                                    </>
                            }

                        </Row>
                    </Col>
                </Row>

                {/* card category */}
                <div className="mt-5">
                    <Row className='gy-2'>
                        {
                            isLoading ?
                                <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                    <Spinner animation="grow" />
                                </div> :
                                <>
                                    {
                                        data?.map((item, i) => (
                                            <Col md={2} className='gy-3' key={i}>
                                                <Link href={`/category-post/${item?.title}`} className='text-decoration-none'>
                                                    <Card className='bg-transparent border-0 trnding_cards'>
                                                        <Image src={item?.photo ? item?.photo : 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-13-390x260.jpg'} alt="trending" className=' rounded trendImg' loading='lazy' />
                                                        <div className="overlay ">
                                                            <h5 className='text-center'>{item?.title}</h5>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        ))
                                    }
                                </>
                        }

                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Featured
"use client"
import React from 'react';
import './BlogsCards.css';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCategoryByPostsQuery, useGetCategoryPostsQuery } from '@/redux/apiSlice';
import DOMPurify from 'dompurify';
import Link from 'next/link';

const BlogsCards = () => {
    const propsData = "Programming"
    const { data, isLoading } = useGetCategoryPostsQuery(propsData)
    const filteredData = data?.filter((item) => item?.status === "approved")
    // console.log('latese blogs', filteredData)
    console.log('blogscard', filteredData)

    return (

        <Container className='mt-5'>
            <h3 className='fw-bold'><span style={{ color: '#EF7C2A' }}>Programming Blogs</span> you may like</h3>
            <Row>
                {
                    isLoading ?
                        <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                            <Spinner animation="grow" />
                        </div>
                        :
                        <>
                            {
                                filteredData?.map((item, i) => (
                                    <Col md={4} className='gy-3' key={i}>
                                        <div className='BC_wrapper'>
                                            <div className="BC_card">
                                                <div className="header p-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex">
                                                            <Image src={
                                                                item?.user[0]?.photo ? item?.user[0]?.photo :
                                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s"
                                                            }
                                                                alt="prson"
                                                                className='rounded-circle' loading='lazy'
                                                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                                            />
                                                            <div className="d-flex justify-content-start align-items-start flex-column ms-2">
                                                                <small className='text-white fw-bold fs-5'>
                                                                    {item?.user[0]?.username ? item?.user[0]?.username : 'N/A'}
                                                                </small>
                                                                <small style={{ color: '#e97623', backgroundColor: 'white', padding: '0 10px', borderRadius: '20px', fontWeight: 'bold', fontSize: '.6em' }}>{item?.category}</small>
                                                            </div>
                                                        </div>
                                                        <div className="BC_likedWrapper">
                                                            <FavoriteIcon style={{ width: '2rem', height: '2rem', color: '#F70099' }} />
                                                            <span className='BC_likedNum'>{item?.likes?.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-100 p-1">
                                                        <h4 className='text-white fw-bold'>{item?.title}</h4>
                                                        <small
                                                            className='text-start text-light'
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.desc?.slice(0, 200)) }}></small>
                                                        <small>{data?.desc}</small>
                                                    </div>
                                                </div>
                                                <div className="wave-container">
                                                    <div className="wave" />
                                                    <div className="wave" />
                                                    <div className="wave" />
                                                </div>
                                                <div className="icons mt-4">
                                                    <a href="#" className="link">
                                                        <FacebookIcon />
                                                    </a>
                                                    <a href="#" className="link">
                                                        <LinkedInIcon />
                                                    </a>
                                                    <a href="#" className="link">
                                                        <InstagramIcon />
                                                    </a>
                                                </div>
                                                <div className="more">
                                                    <Link href={`/singleblog/${item?._id}`} className='text-decoration-none text-uppercase'>
                                                        More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                            {
                                !filteredData && <p>Not found any approved posts</p>
                            }
                            {/* {
                                filteredData?.length >= 0 && <p className='fw-bold text-dark'>Not found any approved posts</p>
                            } */}
                        </>


                }


            </Row>
        </Container>
    )
}

export default BlogsCards
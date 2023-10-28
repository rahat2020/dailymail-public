"use client"
import React, { useState, useEffect } from 'react';
import './BlogVideos.css';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Video from './Video';
import ReactPlayer from 'react-player';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useGetAllVideosQuery } from '@/redux/apiSlice';

export const Data = [
    {
        id: 1,
        title: 'Thousands of free CSS Animations styles',
        url: 'https://www.youtube.com/watch?v=jd1--Rre08Y&t=4s&ab_channel=RahatWebDev',
        desc: "In this video, I've talked about CSS animations Animista website, where a developer can get a lot of CSS animations to integrate into their projects. "
    },
    {
        id: 2,
        title: 'How to debug API using chrome devtools in react js.',
        url: 'https://www.youtube.com/watch?v=XXLaa5d0Fj0&t=51s',
        desc: "In this video, I've explained how you can debug API requests and responses using Chrome dev tools in react js. I hope this video will help you to learn and know something."
    },
    {
        id: 3,
        title: 'How to deploy node, express js, Rest API project at Cyclic for free',
        url: 'https://www.youtube.com/watch?v=aoGIrdWTTJY&ab_channel=RahatWebDev',
        desc: "In Railway there are some limitations like 5$ or 500 hours when the limit is reached deployment shuts off automatically"
    },
]

const BlogVideos = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { data, isLoading } = useGetAllVideosQuery(undefined)
    console.log('videocard', data)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     setData(Data)
    // }, []);
    return (
        <>
            <Container className='mt-5 bv_main'>
                <h3 className='fw-bold'>Videos you may like</h3>
                <Row>
                    {
                        isLoading ?
                            <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                <Spinner animation="grow" />
                            </div> :
                            <>
                                {
                                    data?.map((item, index) => (
                                        <Col md={4} key={index} className='gy-3'>
                                            <div className='BV_wrapper'>
                                                <div className="BV_card">
                                                    <div className="header">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-flex flex-column">
                                                                {
                                                                    hasWindow &&
                                                                    <ReactPlayer url={item.videoOne} controls
                                                                        width="360px" height="200px" light
                                                                    />
                                                                }
                                                                <div className="d-flex justify-content-between align-items-center w-100 p-2">
                                                                    <div className="w-50 d-flex">
                                                                        <Image src={
                                                                            item?.user[0]?.photo ? item?.user[0]?.photo :
                                                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s"
                                                                        }
                                                                            alt="prson"
                                                                            className='rounded-circle' loading='lazy'
                                                                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                                                        />
                                                                        <div className="d-flex justify-content-start align-items-start flex-column ms-2">
                                                                            <small className='text-dark fw-bold fs-5'>
                                                                                {item?.user[0]?.username ? item?.user[0]?.username : 'N/A'}
                                                                            </small>
                                                                            <small style={{
                                                                                color: '#fff',
                                                                                backgroundColor: '#e97623',
                                                                                padding: '0 10px',
                                                                                borderRadius: '20px',
                                                                                fontWeight: 'bold',
                                                                                fontSize: '.6em'
                                                                            }}>{item?.category}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="BC_likedWrapper">
                                                                        <FavoriteIcon style={{ width: '2rem', height: '2rem', color: '#F70099' }} />
                                                                        <span className='BC_likedNum'>{item?.likes?.length}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="w-100 p-1">
                                                            <h6 className='text-dark fw-bold fs-5'>{item?.title}</h6>
                                                            <small className='text-start text-secondary'
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.desc?.slice(0, 70)) }}
                                                        ></small>
                                                        </div>
                                                    </div>
                                                  

                                                    <div className="more">
                                                        <Link href={`/singlevide/${item?._id}`} 
                                                        className='text-decoration-none text-capitalize'>watch</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </>
                    }


                </Row>
            </Container>
        </>
    )
}

export default BlogVideos
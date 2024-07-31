"use client"
import React, { useState, useEffect } from 'react';
import './BlogVideos.css';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactPlayer from 'react-player';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useGetAllVideosQuery } from '@/redux/apiSlice';
import { alterredUserAvatar } from '../UI/helpers/appHelpers';
import { size } from 'lodash';

const BlogVideos = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { data, isLoading } = useGetAllVideosQuery([])
    const filteredData = data?.filter((item) => item?.status === "approved")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);
    return (
        <>
            <Container className='mt-5 bv_main'>
                <h3 className='fw-bold'><span style={{ color: '#EF7C2A' }}>Videos you</span> may like</h3>
                <Row>
                    {
                        isLoading ?
                            <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                <Spinner animation="grow" />
                            </div> :
                            <>
                                {
                                    filteredData && filteredData?.slice(0, 6)?.map((item, index) => {
                                        const {category, desc, user,title, videoOne, likes, _id  } = item || {}
                                        const [{ username = '', photo = '' } = {}] = user || [];
                                        const userAvatar = photo || alterredUserAvatar
                                        return (
                                            	<Col md={4} key={index} className='gy-3'>
                                                	<div className='BV_wrapper'>
                                                    	<div className="BV_card">
                                                        	<div className="header">
                                                            	<div className="d-flex justify-content-between align-items-center">
                                                                	<div className="d-flex flex-column">
                                                                    	{
                                                                        	hasWindow &&
                                                                        	<ReactPlayer url={videoOne} controls
                                                                            	width="360px" height="200px" light
                                                                        	/>
                                                                    	}
                                                                    	<div className="d-flex justify-content-between align-items-center w-100 p-2">
                                                                        	<div className="w-50 d-flex">
                                                                            	<Image 
                                                                                    src={userAvatar}
                                                                                	alt="prson"
                                                                                	className='rounded-circle' loading='lazy'
                                                                                	style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                                                            	/>
                                                                            	<div className="d-flex justify-content-start align-items-start flex-column ms-2">
                                                                                	<small className='text-dark fw-bold fs-5'>
                                                                                    	{username}
                                                                                	</small>
                                                                                	<small style={{
                                                                                    	color: '#fff',
                                                                                    	backgroundColor: '#e97623',
                                                                                    	padding: '0 10px',
                                                                                    	borderRadius: '20px',
                                                                                    	fontWeight: 'bold',
                                                                                    	fontSize: '.6em'
                                                                                	}}>{category}</small>
                                                                            	</div>
                                                                        	</div>
    	
                                                                        	<div className="BC_likedWrapper">
                                                                            	<FavoriteIcon style={{ width: '2rem', height: '2rem', color: '#F70099' }} />
                                                                            	<span className='BC_likedNum'>{size(likes)}</span>
                                                                        	</div>
                                                                    	</div>
                                                                	</div>
    	
                                                            	</div>
                                                            	<div className="w-100 p-1">
                                                                	<h6 className='bv_title'>{title}</h6>
                                                                	<small className='text-start text-secondary'
                                                                    	dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc?.slice(0, 70)) }}
                                                                	></small>
                                                            	</div>
                                                        	</div>
    	
    	
                                                        	<div className="more">
                                                            	<Link href={`/singlevideo/${_id}`}
                                                                	className='text-decoration-none text-capitalize '>watch</Link>
                                                        	</div>
                                                    	</div>
                                                	</div>
                                            	</Col>
                                        )
                                    })
                                }

                                {
                                    !filteredData && <p>Not found any approved posts</p>
                                }
                                {/* {
                                    filteredData?.length >= 0 && <p className='fw-bold text-dark'>Not found any approved posts</p>
                                } */}
                            </>
                    }

                    <div className="d-flex justify-content-center align-items-center">
                        <Link href="/all-videos" className='text-decoration-none'>
                            <Button className='btn_filter'>view more</Button>
                        </Link>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default BlogVideos
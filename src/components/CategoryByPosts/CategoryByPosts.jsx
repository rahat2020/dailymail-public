"use client"
import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './CategoryByPosts.css';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useGetCategoryPostsQuery, useGetCategoryvideosQuery } from '@/redux/apiSlice';
import Spinner from 'react-bootstrap/Spinner';
import { usePathname } from 'next/navigation';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';
import { Facebook, Heart, Instagram, Linkedin } from 'react-feather';
import { size } from 'lodash';



const CategoryByPosts = ({ params }) => {
    // POSTS DATA
    const { data, isLoading } = useGetCategoryPostsQuery(params?.category)
    const approvedData = data?.filter((item) => item?.status === "approved")
    // VIDEOS DATA
    const { data: catVideos, isLoading: loading } = useGetCategoryvideosQuery(params?.category)
    const approvedVideoData = catVideos?.filter((item) => item?.status === "approved")

    // BREADCUMB
    const routerPath = usePathname()


    // PAGINATIONS
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = approvedData?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(approvedData?.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % approvedData?.length;
        setItemOffset(newOffset)
    };

    // SEARACH QUERY DATA
    const [searchQuery, setSearchQuery] = useState('');
    const filteredData = currentItems?.filter(item =>
        (item?.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?.category?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?.desc?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?.author?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // FILTERING DATA BY NAME
    //   const [status, setStatus] = useState('all');
    //   const filteredStatus = filteredData?.filter((item: { launch_success: boolean, all: string }) => {
    //       if (status === 'all') {
    //           return true;
    //       }
    //       return (
    //           item.launch_success?.toString().toLowerCase().includes(status.toLowerCase()) ||
    //           item.all?.toString().toLowerCase().includes(status.toLowerCase())
    //       );
    //   });


    return (
        <Container className='mt-5'>

            <Breadcrumb className="text-decoration-none">
                <Breadcrumb.Item href="/" className="text-decoration-none">Home</Breadcrumb.Item>
                <Breadcrumb.Item href={routerPath} className="text-decoration-none">{routerPath}</Breadcrumb.Item>
            </Breadcrumb>
            <h3 className='fw-bold text-capitalize'>{params?.category} blogs you may like</h3>

            <div className="d-flex justify-content-between align-items-center py-3">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search blogs"
                        className="me-2 border border-1 shadow-sm"
                        size='sm'
                        aria-label="Search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        defaultValue={searchQuery}
                    />
                </Form>
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Select aria-label="Default select example" className="border border-1 shadow-sm text-secondary" size="sm">
                        <option>select blogs</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Button className="btn_filter ms-2">Filter</Button>
                </div>
            </div>

            <Row>
                {
                    isLoading ?
                        <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                            <Spinner animation="grow" />
                        </div> :
                        <>
                            {
                                filteredData?.map((item, index) => (
                                    <Col md={4} className='gy-3' key={index}>
                                        <div className='BC_wrapper'>
                                            <div className="BC_card">
                                                <div className="header p-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex">
                                                            <Image src={item?.user[0]?.photo ? item?.user[0]?.photo : "https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g"} alt="prson"
                                                                className='rounded-circle' loading='lazy'
                                                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                                            />
                                                            <div className="d-flex justify-content-start align-items-start flex-column ms-2">
                                                                <small className='text-white fw-bold fs-5'>{item?.user[0]?.username}</small>
                                                                {/* <small className='text-white fw-bold fs-5'>{item?.author}</small> */}
                                                                <small style={{ color: '#e97623', backgroundColor: 'white', padding: '0 10px', borderRadius: '20px', fontWeight: 'bold', fontSize: '.6em' }}>
                                                                    {item?.category}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="BC_likedWrapper">
                                                            <Heart style={{ width: '2rem', height: '2rem', color: '#F70099' }} />
                                                            <span className='BC_likedNum'>{item?.likes?.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-100 p-1">
                                                        <h4 className='text-white fw-bold'>{item?.title}</h4>
                                                        <small className='text-start text-light'
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.desc.slice(0, 140)) }}></small>
                                                    </div>
                                                </div>
                                                <div className="wave-container">
                                                    <div className="wave" />
                                                    <div className="wave" />
                                                    <div className="wave" />
                                                </div>
                                                <div className="icons mt-4">
                                                    <Link href={item?.facebook} target='_blank' className="link">
                                                        <Facebook />
                                                    </Link>
                                                    <Link href={item?.linkedin} target='_blank' className="link">
                                                        <Linkedin />
                                                    </Link>
                                                    <Link href={item?.instagram} target='_blank' className="link">
                                                        <Instagram />
                                                    </Link>
                                                </div>
                                                <div className="more">
                                                    <Link href={`/singleblog/${item._id}`}>
                                                        MORE
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </>
                }


                {
                    size(data) === 0 && !isLoading ? 
                    <div className='fw-bold text-dark d-flex justify-content-center align-items-center'>
                        <p className='text-center'>Posts not found</p>
                    </div> 
                    : ''
                }

            </Row>
            <div className="d-flex justify-content-center align-items-center w-100 mt-5">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName='page-num'
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    activeLinkClassName='active'

                />
            </div>

        </Container>
    )
}

export default CategoryByPosts
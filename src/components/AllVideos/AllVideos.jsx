"use client"
import React, { useState, useEffect } from 'react';
import './AllVideos.css';
import { Breadcrumb, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useGetAllVideosQuery } from '@/redux/apiSlice';
import ReactPaginate from 'react-paginate';
import { usePathname } from 'next/navigation';
import { Heart } from 'react-feather';

const AllVideos = () => {
    // DATA FETCHING FORM REDUX API
    const [hasWindow, setHasWindow] = useState(false);
    const { data, isLoading } = useGetAllVideosQuery(undefined)
    const approvedData = data?.filter((item) => item?.status === "approved")

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

    // BREADCUMB
    const routerPath = usePathname()

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <div>
            <>
                <Container className='mt-5 bv_main'>
                    <Breadcrumb className="text-decoration-none">
                        <Breadcrumb.Item href="/" className="text-decoration-none">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href={routerPath} className="text-decoration-none">{routerPath}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className='fw-bold text-capitalize'>All Video Posts</h3>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search videos"
                                className="me-2 border border-1 shadow-sm"
                                size='sm'
                                aria-label="Search"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                defaultValue={searchQuery}
                            />
                        </Form>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Select aria-label="Default select example" className="border border-1 shadow-sm text-secondary" size="sm">
                                <option>select category</option>
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
                                                                            <Heart style={{ width: '2rem', height: '2rem', color: '#F70099' }} />
                                                                            <span className='BC_likedNum'>{item?.likes?.length}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="w-100 p-1">
                                                                <h6 className=' bv_title'>{item?.title}</h6>
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

                                    {
                                        !filteredData && <p>Not found any approved posts</p>
                                    }
                                </>
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
            </>
        </div>
    )
}

export default AllVideos
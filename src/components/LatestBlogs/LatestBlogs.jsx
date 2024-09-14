"use client"
import { Card, Carousel, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useGetAllPostQuery } from '@/redux/apiSlice';
import './LatestBlogs.css';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import { Facebook, Instagram, Linkedin, Search, Twitter } from 'react-feather';
import { alterredUserAvatar, smallThumbnail } from '../utils/helpers/appHelpers';
import AppSpinner from '@/components/UI/common/AppSpinner';

const LatestBlogs = () => {
    const { data, isLoading } = useGetAllPostQuery(undefined)
    const filteredData = data?.filter((item) => item?.status === "approved")
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
                                <Search className='text-muted' />
                            </Form>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        {
                            isLoading ?
                             <AppSpinner/>
                                :
                                <>
                                    {
                                        filteredData?.slice(0, 8).map((item, index) => {
                                            const { _id, photoUrlOne, user, name, category, publicationDate, title } = item || {};
                                            const [{ username = '', photo = '' } = {}] = user || [];
                                            const blogAvatar = photoUrlOne || smallThumbnail;
                                            const userAvatar = photo || alterredUserAvatar;
                                            return (
                                                <Row key={index} className="g-4 my-3 lb_row">
                                                    <Col md={4}>
                                                        <Link href={`/singleblog/${_id}`} className='text-decoration-none'>
                                                            <div className="lb_imgConainer">
                                                                <Card.Img src={blogAvatar} className='lb_lftImg' />
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Link href={`/singleblog/${_id}`} className='text-decoration-none'>
                                                            <Card className='lb_right_cards border-0 shadow p-2'>
                                                                <Card.Header className='text-secondary'>
                                                                    <div className="d-flex">
                                                                        <Card.Img
                                                                            src={userAvatar}
                                                                            style={{
                                                                                width: '4rem',
                                                                                height: '4rem',
                                                                                borderRadius: '50%',
                                                                                objectFit: 'cover'
                                                                            }}
                                                                        />
                                                                        <div className="d-flex flex-column justify-content-start align-items-start ms-2">
                                                                            <span style={{ color: '#e97623', fontWeight: 'bold' }}>{name}</span>
                                                                            <small><strong>Writer:</strong> {username}</small>
                                                                            <small><strong>Category:</strong> {category}</small>
                                                                            <small><strong>Date:</strong> {publicationDate?.slice(0, 10)}</small>
                                                                        </div>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body className='lb_right_body'>
                                                                    <Card.Title className='lb_rightTitle'>{title}</Card.Title>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </>
                        }

                    </Col>
                    <Col md={4}>
                        <Card className='border-0 rounded shadow h-auto mt-5'>
                            <h5 className='fw-bold border-2 border-bottom border-light text-center text-dark my-3'>Recent Blogs</h5>
                            <Row className='gap-3'>
                                {
                                    filteredData?.slice(0.5)?.map((item, index) => {
                                        const {_id, photoUrlOne, title,user, timeToRead } = item || {};
                                        const [{ username = ''} = {}] = user || [];
                                        const blogAvatar = photoUrlOne || smallThumbnail;
                                        return  (
                                            <Col md={12} key={index} className='rb_cards'>
                                                <Link href={`/singleblog/${_id}`} className='text-decoration-none'>
                                                    <div className="d-flex border-top border-bottom py-2 border-light border-2 shadow-sm">
                                                        <div className="w-50 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                                            <Card.Img src={blogAvatar} className=' rb_cardsImg' />
                                                        </div>
                                                        <div className="d-flex justify-content-start align-items-start flex-column rcb_textPara">
                                                            <h6 className="fw-bold text-secondary">{title}</h6>
                                                            <small className='text-secondary'>{username}</small>
                                                            <small className='text-secondary'>{timeToRead}</small>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }

                            </Row>
                        </Card>
                        <Card className='border-0 shadow my-3'>
                            <h5 className='fw-bold border-2 border-bottom border-light text-center text-dark my-3'>Stay in touch</h5>
                            <Row>
                                <Col md={12}>
                                    <div className="d-flex justify-content-evenly align-items-center my-4">
                                        <div className="socialIcon_container">
                                            <Instagram className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <Linkedin className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <Facebook className='socialIcon' />
                                        </div>
                                        <div className="socialIcon_container">
                                            <Twitter className='socialIcon' />
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
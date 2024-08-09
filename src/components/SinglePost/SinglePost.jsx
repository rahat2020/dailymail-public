"use client"
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row, Spinner, Nav } from 'react-bootstrap';
import './SinglePost.css';
import Link from 'next/link';
import { size } from 'lodash';
import DOMPurify from 'dompurify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useCreateCommentsMutation, useCreateLikesMutation, useGetAllPostQuery, useGetSinglePostQuery, useIncreaseViewsMutation, useUserDataByEmailQuery } from '@/redux/apiSlice';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import { alterredUserAvatar, dummyBlogThumbnail, formatDate } from '@/components/utils/helpers/appHelpers';
import { Eye, Facebook, Heart, Instagram, Linkedin, Send, Twitter } from 'react-feather';


const SinglePost = ({ params }) => {

    // AUTH CONTEXT 
    const { user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data, isLoading } = useGetSinglePostQuery(params)
    const { _id, title, category, photoUrlOne, author, desc, likes, website, user: authUser, viewers, createdAt, timeToRead, facebook, instagram, linkedin } = data || {}
    const [{ username = '', photo = '' } = {}] = authUser || [];
    const userAvatar = photo || alterredUserAvatar
    const blogThumbnail = photoUrlOne || dummyBlogThumbnail
    const { data: item } = useGetAllPostQuery([])
    const filteredData = item?.filter((item) => item?.status === "approved")
    const [CommetsData] = useCreateCommentsMutation()
    const { data: userData } = useUserDataByEmailQuery(user)
    const [IncData] = useIncreaseViewsMutation()
    const [LikesData] = useCreateLikesMutation()

    // ADD VIEWERS OR VISITORS TO THIS POST
    const [show, setShow] = useState(true);
    const handleClose = async () => {
        const id = params
        try {
            const obj = { id }
            await IncData(obj)
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    };

    // USER IS ONLINE TOOLTIP
    const pathname = usePathname()
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            user is online
        </Tooltip>
    );

    // CREATEING COMMENTS
    const [descriptions, setDescriptions] = useState('')
    const handleComment = async () => {
        const Obj = {
            id: _id,
            commentor: [userData],
            desc: descriptions,
        }
        if (!descriptions) {
            toast('Field can not be empty')
        } else if (!userData) {
            toast('You must logged in before do comments')
        } else {
            try {
                const res = await CommetsData(Obj)
                if (res?.data === "comments created") {
                    toast('Comments created')
                    setDescriptions('')
                } else if (res?.error?.data === "wrong credentials") {
                    toast('Comments not created')
                } else {
                    toast('Login Failed')
                }

            } catch (err) {

            }
        }
    }

    // CREATE LIKES
    const [likeRes, setLikesRes] = useState('')
    const handleLikes = async (params) => {
        const Obj = {
            id: data?._id,
            liker: [userData],
            like: params,
        }
        if (!userData) {
            toast('You must logged in before do like')
        } else {
            try {
                const res = await LikesData(Obj)
                if (res?.data === "you liked the post") {
                    toast('you liked the post')
                    setLikesRes(res?.data)
                } else if (res?.error?.data === "wrong credentials") {
                    toast('Comments not created')
                } else {
                    toast('Likes Failed')
                }
                setDescriptions('')
            } catch (err) {

            }
        }
    }
    // CHECING ALREADY THIS USER IS LIKED POST OR NOT
    const isUserLikedThePost = likes?.some(item => item?.liker?.[0]?.email?.includes(user));
    const handleLikeBtnClick = (e) => {
        e.preventDefault()
        toast('Already, you liked the post')
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={8}>
                        {
                            isLoading ?
                                <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
                                    <Spinner animation="grow" />
                                </div> :
                                <div className="my-3 w-100">
                                    <p className='text-secondary fw-bold'>•{category}</p>
                                    <h1>{title}</h1>
                                    <Row className='border-bottom border-light border-2 py-2 shadow-sm rounded'>
                                        <Col md={9} className='gy-3'>
                                            <div className="d-flex w-100 position-relative">
                                                <Image
                                                    src={userAvatar}
                                                    alt="user"
                                                    style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '50%' }}
                                                    loading='lazy'
                                                />
                                                {
                                                    userData?.username === data?.user[0]?.username ?
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={renderTooltip}
                                                        >
                                                            <span
                                                                className="rounded-circle bg-success position-absolute top-0 start-0 translate-middle start-25"
                                                                style={{ width: '.88rem', height: '.88rem' }}>
                                                            </span>
                                                        </OverlayTrigger>
                                                        : ''
                                                }

                                                <div className="d-flex flex-column justify-content-start align-items-start ms-2">
                                                    <span className='fw-bold text-secondary'>{username} </span>
                                                    <div className="d-flex jsutify-content-start align-items-start flex-wrap">
                                                        <small className='text-secondary'>{formatDate(createdAt)} | {timeToRead} </small>
                                                        <small className='text-secondary ms-2 '>| <Eye style={{ width: '1rem', height: '1rem' }} /> {viewers} views</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3} className='gy-3'>
                                            <div className="gap-2 d-flex justify-content-center justify-content-md-end justify-content-lg-end align-items-center h-100 w-100">
                                                <Link href={instagram || '#'} target='_blank' className='text-decoration-none'>
                                                    <Instagram className='socialIcon' />
                                                </Link>
                                                <Link href={linkedin || '#'} target='_blank' className='text-decoration-none'>
                                                    <Linkedin className='socialIcon ms-1 cursor-pointer' />
                                                </Link>
                                                <Link href={facebook || '#'} target='_blank' className='text-decoration-none'>
                                                    <Facebook className='socialIcon ms-1' />
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <ToastContainer />
                                    <div className="py-2">
                                        <small className='text-primary fw-bold'>home{pathname}</small>
                                        <p className='fw-bold text-muted py-2'
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc.slice(0, 80)) }}></p>
                                        <div className="d-flex justify-content-center align-items-center flex-column">
                                            <Image
                                                src={blogThumbnail}
                                                alt='img-1'
                                                className='w-sm-50 h-sm-100 img-fluid  w-md-100 w-lg-100 w-xl-100'
                                            // style={{width:'90%', height:'100%'}}
                                            />
                                            <small className='text-secondary'>Source: {author}</small>

                                            <small className='text-primary'>
                                                <Nav.Link href={website} target='_blank' >source website</Nav.Link>
                                            </small>
                                        </div>
                                        <p className='text-muted py-2 letter-1'
                                            dangerouslySetInnerHTML={{ __html: DOMPurify?.sanitize(desc) }}></p>
                                    </div>
                                </div>
                        }
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <Image src="/banner-03.png" alt="banners" className='img-fluid' />
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-light py-2 border-bottom">
                            <div className="d-flex">
                                {
                                    isUserLikedThePost ?
                                        <Heart className={`${likeRes === "you liked the post" ? 'activeLikes' : 'text-secondary fw-bold'}`} style={{ cursor: 'pointer' }} onClick={handleLikeBtnClick} />
                                        :
                                        <Heart className={`${likeRes === "you liked the post" ? 'activeLikes' : 'text-secondary fw-bold'}`} style={{ cursor: 'pointer' }} onClick={() => handleLikes(1)} />
                                }

                                <span className='fw-bold tex-dark mx-2'>{size(data?.likes)}</span>
                                {
                                    isUserLikedThePost ?
                                        <span className='text-secondary fw-bold'>(You liked the post!)</span>
                                        :
                                        <span className='text-secondary fw-bold'>(You did not like the post yet!)</span>
                                }
                            </div>
                            <div className="d-flex">
                                <Link href={instagram || '#'} target='_blank' className='text-decoration-none'>
                                    <Instagram className='socialIcon' />
                                </Link>
                                <Link href={linkedin || '#'} target='_blank' className='text-decoration-none'>
                                    <Linkedin className='socialIcon ms-1 cursor-pointer' />
                                </Link>
                                <Link href={facebook || '#'} target='_blank' className='text-decoration-none'>
                                    <Facebook className='socialIcon ms-1' />
                                </Link>
                            </div>
                        </div>
                        <h6 className='text-dark fw-bold my-2'>All Comments</h6>
                        <div className="border-top">
                            <div className="d-flex flex-column justify-content-start align-items-start my-3">
                                {
                                    data?.comments?.map((item, i) => (
                                        <div className="position-relative d-flex justify-content-start rounded align-items-center w-100 border-top border-bottom border-light shadow-sm p-2 my-1" key={i}>
                                            <Image src={item?.commentor[0]?.photo ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s'} alt="rahat"
                                                style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '50%' }}
                                            />
                                            {
                                                userData?.username === data?.user[0]?.username ?
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip}
                                                    >
                                                        <span
                                                            className="rounded-circle bg-success position-absolute top-0 start-0 translate-middle start-25"
                                                            style={{ width: '.88rem', height: '.88rem' }}>
                                                        </span>
                                                    </OverlayTrigger>
                                                    : ''
                                            }
                                            <div className="d-flex flex-column jsutify-content-start align-items-start ms-2">
                                                <span className='fw-bold text-secondary'>{item?.commentor[0]?.username}</span>
                                                <small className='text-dark'>{item?.desc}</small>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='fw-bold text-dark'>Write your comment:</Form.Label>
                                    <Form.Control className='comment_textBox' as="textarea" rows={3} placeholder='your comment' value={descriptions} onChange={(e) => setDescriptions(e.target.value)} />
                                    <Button className='btn_filter my-4' size='sm' onClick={handleComment}>Submit</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>

                    {/* RELATED BLOGS */}
                    <Col md={4}>
                        <Card className='border-0 rounded shadow h-auto mt-5'>
                            <h5 className='fw-bold text-center text-dark my-3'>Related Blogs</h5>
                            <Row className='gap-3'>
                                {
                                    filteredData?.map((item, index) => (
                                        <Col md={12} key={index} className='rb_cards'>
                                            <Nav.Link href={`/singleblog/${item?._id}`} className='text-decoration-none'>
                                                <div className="d-flex border-top border-bottom py-2 border-light border-2 shadow-sm">
                                                    <div className="w-50 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                                        <Card.Img src={
                                                            item?.photoUrlOne ?
                                                                item.photoUrlOne :
                                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGaBjAWQvd1_0xvpZXg2W1tNxISVTqOXm35gaf403u&s"}
                                                            className='rb_cardsImg'
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-start align-items-start flex-column w-50">
                                                        <h6 className="fw-bold text-secondary">{item?.title}</h6>
                                                        <small className='text-secondary'>{item?.date}</small>
                                                        <small className='text-secondary'>{item?.timeToRead}</small>
                                                    </div>
                                                </div>
                                            </Nav.Link>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Card>
                        <Card className='my-3 shadow-sm'>
                            <div className="w-100">
                                <Card.Img src='/banner-02.png' alt='banner' className='img-fluid' />
                            </div>
                        </Card>
                        <Card className='border-0 shadow my-3 p-2 h-auto'>
                            <h5 className='fw-bold text-center text-dark my-1'>Never Miss A Post!</h5>
                            <Form className=" d-flex my-4 bg-light justify-content-center align-items-center rounded border-0 border-bottom ">
                                <Form.Control
                                    type="search"
                                    className="me-2 rounded border text-secondary"
                                    aria-label="Search"
                                />
                                <Send className='text-muted' />
                            </Form>
                        </Card>
                        <Card className='border-0 shadow my-3'>
                            <h5 className='fw-bold border-bottom border-light text-center text-dark my-3'>Stay in touch</h5>
                            <Row>
                                <Col md={12}>
                                    <div className="d-flex justify-content-evenly align-items-center my-4">
                                        <div className="socialIcon_container">
                                            <Link href="https://www.instagram.com/kazirahat1020" target="_blank">
                                                <Instagram className='socialIcon' />
                                            </Link>
                                        </div>
                                        <div className="socialIcon_container">
                                            <Link href="https://www.linkedin.com/in/kazi-rahat2020/" target="_blank">
                                                <Linkedin className='socialIcon' />
                                            </Link>
                                        </div>
                                        <div className="socialIcon_container">
                                            <Link href="https://www.facebook.com/rahatwebdev" target="_blank">
                                                <Facebook className='socialIcon' />
                                            </Link>
                                        </div>
                                        <div className="socialIcon_container">
                                            <Link href="https://twitter.com/KaziRahat2020" target="_blank">
                                                <Twitter className='socialIcon' />
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>

                    </Col>
                </Row>

                <>
                    <Modal show={show} onHide={handleClose} size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>Post visited</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{data?.title}</Modal.Body>
                        <Modal.Footer>
                            <Button className='btn_filter' onClick={handleClose}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>

            </Container>
        </div>
    )
}

export default SinglePost
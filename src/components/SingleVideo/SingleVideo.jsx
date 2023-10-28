"use client"
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useCreateCommentsMutation, useCreateLikesMutation, useGetAllPostQuery, useGetSinglePostQuery, useUserDataByEmailQuery } from '@/redux/apiSlice';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';


// export const Data = [
//     {
//         id: 1,
//         title: 'Beauty of deep space. Billions of galaxies in',
//         category: 'Technology',
//         name: 'rahat',
//         cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-1-300x169.jpg',
//         profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
//         date: 'January 22, 2023',
//         needTime: '10 min'
//     },
//     {
//         id: 2,
//         title: 'Rocket Lab mission fails shortly after launch',
//         category: 'Science',
//         name: 'rahat',
//         cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-13-300x169.jpg',
//         profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
//         date: 'June 22, 2023',
//         needTime: '3 min'
//     },
//     {
//         id: 3,
//         title: 'The Morning After: Uber sets its sights on Postmates',
//         category: 'Technology',
//         name: 'rahat',
//         cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-14-300x169.jpg',
//         profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
//         date: 'March 10, 2023',
//         needTime: '9 min'
//     },
//     {
//         id: 4,
//         title: 'Sony’s Wf-sp800n Earbuds Are A Noise-canceling Alternative.',
//         category: 'Mobile',
//         cardImg: 'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg',
//         profle: 'https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g',
//         name: 'rahat',
//         date: 'March 10, 2023',
//         needTime: '4 min'
//     },
// ]

const SingleVideo = ({ params }) => {

    // REDUX
    const { data, isLoading } = useGetSinglePostQuery(params)
    const { data: item } = useGetAllPostQuery(undefined)
    const filteredData = item?.filter((item) => item?.status === "approved")
    const userEmail = typeof window !== "undefined"? window.localStorage.getItem('user') || '': false
    // const activeUser = typeof window !== "undefined"? window.localStorage.getItem('Imin') || '' : false;
    const [CommetsData] = useCreateCommentsMutation()
    const { data: userData } = useUserDataByEmailQuery(userEmail)
    const [LikesData] = useCreateLikesMutation()
    // console.log('single post loggedInUserData', userData)
    console.log('single post', data)


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const inputDateString = data?.createdAt;
    const formattedDate = formatDate(inputDateString);

    const pathname = usePathname()
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            user is online
        </Tooltip>
    );

    // CREATEING COMMENTS
    const [desc, setDesc] = useState('')
    const handleComment = async () => {
        const Obj = {
            id: data?._id,
            commentor: [userData],
            desc,
        }
        if (!desc) {
            toast('Field can not be empty')
        } else if (!userData) {
            toast('You must logged in before do comments')
        } else {
            try {
                const res = await CommetsData(Obj)
                // console.log('comments obj', Obj)
                // console.log('comments res', res)
                if (res?.data === "comments created") {
                    toast('Comments created')
                } else if (res?.error?.data === "wrong credentials") {
                    toast('Comments not created')
                } else {
                    toast('Login Failed')
                }
                setDesc('')
            } catch (err) {

            }
        }
    }

    // CREATE LIKES
    const [likeRes, setLikesRes] = useState('')
    // console.log('like', like)
    const handleLikes = async (params) => {
        console.log('setlikes_params', params)
        const Obj = {
            id: data?._id,
            liker: [userData],
            like: params,
        }
        console.log('like_Obj', Obj)
        if (!userData) {
            toast('You must logged in before do comments')
        } else {
            try {
                const res = await LikesData(Obj)
                console.log('like obj', Obj)
                console.log('comments res', res)
                if (res?.data === "you liked the post") {
                    toast('you liked the post')
                    setLikesRes(res?.data)
                } else if (res?.error?.data === "wrong credentials") {
                    toast('Comments not created')
                } else {
                    toast('Likes Failed')
                }
                setDesc('')
            } catch (err) {

            }
        }
    }


    const abc = data?.likes?.map((item) => (item?.liker[0]?.email?.includes(userEmail)))
    const trueValues = abc?.filter((value) => value === true);
    const stringResult = trueValues?.toString();
    // const falseValues = abc?.filter((value) => value === false);
    // console.log('abc', abc)
    // console.log('stringResult', stringResult)
    // console.log('trueValues', trueValues)
    // console.log('userEmail', userEmail)

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
                                    <p className='text-secondary fw-bold'>•{data?.category}</p>
                                    <h1>{data?.title}</h1>
                                    <Row className='border-bottom border-light border-2 py-2 shadow-sm rounded'>
                                        <Col md={9} className='gy-3'>
                                            <div className="d-flex w-100 position-relative">
                                                <Image src={data?.user[0]?.photo ? data.user[0]?.photo : "https://secure.gravatar.com/avatar/1b70c830da30f39d5c6fab323017430c?s=50&d=mm&r=g"}
                                                    alt="rahat"
                                                    style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '50%' }}
                                                    loading='lazy'
                                                />
                                                {
                                                    userData?.activeUser === 'yes' ?
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
                                                    <span className='fw-bold text-secondary'>{data?.user[0]?.username} </span>
                                                    <div className="d-flex jsutify-content-start align-items-start flex-wrap">
                                                        <small className='text-secondary'>{formattedDate} | 4 min to read </small>
                                                        <small className='text-secondary ms-2 '>| <VisibilityIcon style={{ fontSize: "1.11rem" }} /> 45 views</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3} className='gy-3'>
                                            <div className="d-flex justify-content-center justify-content-md-end justify-content-lg-end align-items-center h-100 w-100">
                                                <Link href="/" className='text-decoration-none'>
                                                    <InstagramIcon className='socialIcon' />
                                                </Link>
                                                <Link href="/" className='text-decoration-none'>
                                                    <LinkedInIcon className='socialIcon ms-1 cursor-pointer' />
                                                </Link>
                                                <Link href="/" className='text-decoration-none'>
                                                    <FacebookIcon className='socialIcon ms-1' />
                                                </Link>
                                                <Link href="/" className='text-decoration-none'>
                                                    <TwitterIcon className='socialIcon ms-1' />
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <ToastContainer />
                                    <div className="py-2">
                                        <small className='text-primary fw-bold'>home{pathname}</small>
                                        <p className='fw-bold text-dark py-2' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.desc.slice(0, 80)) }}></p>
                                        <div className="d-flex justify-content-center align-items-center flex-column">
                                            <Image src="https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-12-1440x720.jpg"
                                                alt='img-1'
                                                className='w-sm-50 h-sm-100 img-fluid  w-md-100 w-lg-100 w-xl-100'
                                            // style={{width:'90%', height:'100%'}}
                                            />
                                            <small className='text-secondary'>Source: {data?.author}</small>
                                        </div>
                                        <p className='text-dark py-2 letter-1' 
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.desc) }}></p>
                                    </div>
                                </div>
                        }


                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <Image src="/banner-03.png" alt="banners" className='img-fluid' />
                        </div>

                        <div className="d-flex justify-content-between align-items-center border-light py-2 border-bottom">
                            <div className="d-flex">
                                {
                                    stringResult === 'true' ?
                                        <FavoriteIcon className={`${likeRes === "you liked the post" ? 'activeLikes' : 'text-secondary fw-bold'}`} style={{ cursor: 'pointer' }} onClick={handleLikeBtnClick} /> :
                                        <FavoriteIcon className={`${likeRes === "you liked the post" ? 'activeLikes' : 'text-secondary fw-bold'}`} style={{ cursor: 'pointer' }} onClick={() => handleLikes(1)} />
                                }

                                <span className='fw-bold tex-dark mx-2'>{data?.likes?.length}</span>
                                {
                                    stringResult === 'true' ?
                                        <span className='text-secondary fw-bold'>(You liked the post!)</span> :
                                        <span className='text-secondary fw-bold'>(You did not like the post yet!)</span>
                                }
                            </div>
                            <div className="d-flex">
                                <Link href="/" className='text-decoration-none'>
                                    <InstagramIcon className='socialIcon' />
                                </Link>
                                <Link href="/" className='text-decoration-none'>
                                    <LinkedInIcon className='socialIcon ms-1 cursor-pointer' />
                                </Link>
                                <Link href="/" className='text-decoration-none'>
                                    <FacebookIcon className='socialIcon ms-1' />
                                </Link>
                                <Link href="/" className='text-decoration-none'>
                                    <TwitterIcon className='socialIcon ms-1' />
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
                                                userData?.activeUser === 'yes' ?
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
                                    <Form.Control as="textarea" rows={3} placeholder='your comment' onChange={(e) => setDesc(e.target.value)} />
                                    <Button variant='danger mt-2 fw-bold' size='sm' onClick={handleComment}>Submit</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 rounded shadow h-auto mt-5'>
                            <h5 className='fw-bold text-center text-dark my-3'>Related Blogs</h5>
                            <Row className='gap-3'>
                                {
                                    filteredData?.map((item, index) => (
                                        <Col md={12} key={index} className='rb_cards'>
                                            <div className="d-flex border-top border-bottom py-2 border-light border-2 shadow-sm">
                                                <div className="w-50 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                                    <Card.Img src={item?.photoOne ? item.photoOne : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGaBjAWQvd1_0xvpZXg2W1tNxISVTqOXm35gaf403u&s"} className='w-75 h-100 rb_cardsImg' />
                                                </div>
                                                <div className="d-flex justify-content-start align-items-start flex-column">
                                                    <h6 className="fw-bold text-secondary">{item?.title}</h6>
                                                    <small className='text-secondary'>{item?.date}</small>
                                                    <small className='text-secondary'>Need {item?.needTime} to read</small>
                                                </div>
                                            </div>
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
                                <SendIcon className='text-muted' />
                            </Form>
                        </Card>
                        <Card className='border-0 shadow my-3'>
                            <h5 className='fw-bold border-bottom border-light text-center text-dark my-3'>Stay in touch</h5>
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
        </div>
    )
}

export default SingleVideo 
"use client"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import React from 'react'
import { Container, Image } from 'react-bootstrap';
import './TopStories.css';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useGetAllPostQuery } from '@/redux/apiSlice';

const TopStories = () => {
    const { data, isLoading } = useGetAllPostQuery(undefined)
    const travelData = data?.filter((item) => item?.category === "Travel")
    const technologylData = data?.filter((item) => item?.category === "Technology")
    const innovationlData = data?.filter((item) => item?.category === "Innovation")
    const motivationData = data?.filter((item) => item?.category === "Motivational")
    const javasacriptData = data?.filter((item) => item?.category === "Javascript")

    const travelApprovedData = travelData?.filter((item) => item?.status === "approved")
    const technologyApprovedData = technologylData?.filter((item) => item?.status === "approved")
    const innovationApprovedData = innovationlData?.filter((item) => item?.status === "approved")
    const motivationalApprovedData = motivationData?.filter((item) => item?.status === "approved")
    const javasacriptApprovedData = javasacriptData?.filter((item) => item?.status === "approved")
    console.log('travelData', travelData)
    return (
        <Container className='mt-5 pt-3'>
            <h3 className='fw-bold'>Top Stories</h3>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className='fw-bold text-danger'>Travel</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className='fw-bold text-danger'>Technology</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className='fw-bold text-danger'>Innovation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" className='fw-bold text-danger'>Motivational</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth" className='fw-bold text-danger'>Javascript</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Row>
                                    {
                                        travelApprovedData?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Stack gap={3}>
                                                    <div className="">
                                                        <Card className="text-dark shadow ts_smallCard">
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Img src={item?.photoUrlOne ? item?.photoUrlOne :
                                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className='rounded tp_smllCardImg'
                                                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <small className='text-secondary fw-bold'>{item?.category}</small>  <br />
                                                                    <span className='text-secondary fw-bold'><CalendarMonthIcon />
                                                                        {item?.publicationDate}
                                                                    </span>
                                                                    <Card.Text className='text-muted fw-normal'>
                                                                        {item?.title}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>

                                                </Stack>
                                            </Col>
                                        ))
                                    }

                                    {
                                        travelApprovedData?.slice(0, 1)?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image src={item?.photoUrlOne ? item?.photoUrlOne :
                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className="img-fluid  rounded tp_imgBig" />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                                <Row>
                                    {
                                        technologyApprovedData?.map((item, i) => (
                                            <Col md={6} key={i} className='gy-3'>
                                                <Stack gap={3}>
                                                    <div className="">
                                                        <Card className="text-dark shadow ts_smallCard">
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Img src={item?.photoOne ? item?.photoOne :
                                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className='rounded tp_smllCardImg'
                                                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <small className='text-secondary fw-bold'>{item?.category}</small>  <br />
                                                                    <span className='text-secondary fw-bold'><CalendarMonthIcon />
                                                                        {item?.publicationDate}
                                                                    </span>
                                                                    <Card.Text className='text-muted fw-normal'>
                                                                        {item?.title}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>

                                                </Stack>
                                            </Col>
                                        ))
                                    }

                                    {
                                        technologyApprovedData?.slice(0, 1)?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image src={item?.photoOne ? item?.photoOne :
                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className="img-fluid  rounded tp_imgBig" />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                                <Row>
                                    {
                                        innovationApprovedData?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Stack gap={3}>
                                                    <div className="">
                                                        <Card className="text-dark shadow ts_smallCard">
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Img src={item?.photoOne ? item?.photoOne :
                                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className='rounded tp_smllCardImg'
                                                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <small className='text-secondary fw-bold'>{item?.category}</small>  <br />
                                                                    <span className='text-secondary fw-bold'><CalendarMonthIcon />
                                                                        {item?.publicationDate}
                                                                    </span>
                                                                    <Card.Text className='text-muted fw-normal'>
                                                                        {item?.title}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>

                                                </Stack>
                                            </Col>
                                        ))
                                    }

                                    {
                                        innovationApprovedData?.slice(0, 1)?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image src={item?.photoOne ? item?.photoOne :
                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className="img-fluid  rounded tp_imgBig" />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="fourth">
                                <Row>
                                    {
                                        motivationalApprovedData?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Stack gap={3}>
                                                    <div className="">
                                                        <Card className="text-dark shadow ts_smallCard">
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Img src={item?.photoOne ? item?.photoOne :
                                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className='rounded tp_smllCardImg'
                                                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <small className='text-secondary fw-bold'>{item?.category}</small>  <br />
                                                                    <span className='text-secondary fw-bold'><CalendarMonthIcon />
                                                                        {item?.publicationDate}
                                                                    </span>
                                                                    <Card.Text className='text-muted fw-normal'>
                                                                        {item?.title}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>

                                                </Stack>
                                            </Col>
                                        ))
                                    }

                                    {
                                        motivationalApprovedData?.slice(0, 1)?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image src={item?.photoOne ? item?.photoOne :
                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className="img-fluid  rounded tp_imgBig" />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="fifth">
                                <Row>
                                    {
                                        javasacriptApprovedData?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Stack gap={3}>
                                                    <div className="">
                                                        <Card className="text-dark shadow ts_smallCard">
                                                            <Row>
                                                                <Col md={4}>
                                                                    <Card.Img src={item?.photoOne ? item?.photoOne :
                                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className='rounded tp_smllCardImg'
                                                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                                                </Col>
                                                                <Col md={8}>
                                                                    <small className='text-secondary fw-bold'>{item?.category}</small>  <br />
                                                                    <span className='text-secondary fw-bold'><CalendarMonthIcon />
                                                                        {item?.publicationDate}
                                                                    </span>
                                                                    <Card.Text className='text-muted fw-normal'>
                                                                        {item?.title}
                                                                    </Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>

                                                </Stack>
                                            </Col>
                                        ))
                                    }

                                    {
                                        javasacriptApprovedData?.slice(0, 1)?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image src={item?.photoOne ? item?.photoOne :
                                                        "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"} alt="post-img" className="img-fluid  rounded tp_imgBig" />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default TopStories
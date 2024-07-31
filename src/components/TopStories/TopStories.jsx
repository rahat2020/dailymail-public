"use client"
import React from 'react';
import { Container, Row, Col, Nav, Tab, Image, Stack, Card } from 'react-bootstrap';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useGetAllPostQuery } from '@/redux/apiSlice';
import './TopStories.css';

const categories = ["Travel", "Technology", "Innovation", "Motivational", "Javascript"];
const alterredImg = "https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-20-705x660.jpg"
const filterDataByCategoryAndStatus = (data, category, status) => {
    return data?.filter(item => item?.category === category && item?.status === status);
};

const TopStories = () => {
    const { data } = useGetAllPostQuery(undefined);

    const approvedData = categories?.reduce((acc, category) => {
        acc[category] = filterDataByCategoryAndStatus(data, category, "approved");
        return acc;
    }, {});

    return (
        <Container className='mt-5 pt-3'>
            <h3 className='fw-bold'>Top Stories</h3>
            <Tab.Container id="left-tabs-example" defaultActiveKey="Travel">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {categories?.map(category => (
                                <Nav.Item key={category}>
                                    <Nav.Link eventKey={category} className='fw-bold text-danger'>{category}</Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {categories?.map(category => (
                                <Tab.Pane eventKey={category} key={category}>
                                    <Row>
                                        {approvedData[category]?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Stack gap={3}>
                                                    <Card className="text-dark shadow ts_smallCard">
                                                        <Row>
                                                            <Col md={4}>
                                                                <Card.Img
                                                                    src={item?.photoUrlOne || alterredImg }
                                                                    alt="post-img"
                                                                    className='rounded tp_smllCardImg'
                                                                    style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                                                />
                                                            </Col>
                                                            <Col md={8}>
                                                                <small className='text-secondary fw-bold'>{item?.category}</small>
                                                                <br />
                                                                <span className='text-secondary fw-bold'>
                                                                    <CalendarMonthIcon /> {item?.publicationDate}
                                                                </span>
                                                                <Card.Text className='text-muted fw-normal'>
                                                                    {item?.title}
                                                                </Card.Text>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Stack>
                                            </Col>
                                        ))}
                                        {approvedData[category]?.slice(0, 1).map((item, i) => (
                                            <Col md={6} key={i}>
                                                <div className="tp_imgContainer">
                                                    <Image
                                                        src={item?.photoUrlOne || alterredImg}
                                                        alt="post-img"
                                                        className="img-fluid rounded tp_imgBig"
                                                    />
                                                    <div className="TS_overlay">
                                                        <small>{item?.category}</small>
                                                        <h4>{item?.title}</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default TopStories;

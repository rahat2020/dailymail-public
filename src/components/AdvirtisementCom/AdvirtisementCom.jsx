"use client"
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './AdvirtisementCom.css';

const AdvirtisementCom = () => {
    return (
        <div className="ad_head">
            <Container>
                <Row>
                    <Col md={4}>
                        <Card className='ad_Cards shadow border-0 rounded'>
                            <div class="imgbox">
                                <Card.Img src="/rahatad.png" alt="ad image" className='adCard_img' loading='lazy'/>
                                <div class="ad_content">
                                    <h5 className='text-dark fw-bold'>Kazi Rahat</h5>
                                    <p className='text-muted fw-bold'>Front-End Developer</p>
                                    <Button variant='primary fw-bold'>Message me</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdvirtisementCom
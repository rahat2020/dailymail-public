import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const dummyImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR8AAACvCAMAAADzNCq+AAAAMFBMVEX5+fnU1NTc3NzR0dH19fXW1tb4+Pj09PTY2Njq6urm5ubx8fHu7u7i4uLb29vf39/ZFNdeAAAFHUlEQVR4nO2dAZaqMAxFRREVRtz/bj/K6McWStImTc4kdwN2riXta4NzODiO4ziO4ziO4ziO4ziO89fpLj9PLp30QDQy3K/Naaa53gfp4eii68+nZsnp3Pss+tA333ZehppeelhKGM6xnXkO+VM20a/beRnyKXR4bOuZBD2khydNUs8k6Cg9QFnuaT3WZ9BtT88k6CY9SDnafT2ToIv0MMUYAXqa5io9TCl+INNnmkA/0gMV4grS0zRn6YHKAJw+ZifQA6inaWxugqDTZ5pA0kOVAPx4GX3AerAemzn1CPdjsgBBV/cnFld4hJ6mkR6sAPDybHMBcz9p/PlKc0bosVifMev7KD1YAe4IP3fpwQqAyRcWz1g7hB+Td82w09UnFssP5nzM4uN1QOyApAcqBOD26zV9LJ5uvIBtES1uDmcG0P2gxcPDXxK9LR89FveGH/bXeLO3pzN7p4jG9ewJuprcOX+R6JCS7Y4alHw3m9sg4Y3PWUtrVntcM3Q6tqKjeijKNcPxdArtCDf3Pme1otasth+b2dHzBYOxl507h8NF3+rZDbe+v9/7m4bCOC+rtrtDE7z7avWUIFX8P5pSVIL00PoGPskyFXoJivg+VfASFBCdSknvNZQRnWp6CVoSt9XaPqILWEvLlo94A9rYjpegBRvHdV6CZraaSrwEvdi+8vYSNNFt2Xmi4FBBmuRtk80mkiXp20q7bQC/7N12n4z/nMN+t4TpEgR4Xc/iazJvIM1IvCVI9e9CgV7FZy1BrepNOvBtK75erWfw0yto93dA3nCVoDkXaxUE71VnOm19Hxvo7FdJ5opQEMeFT/vZW6gUBO9Ub1hKULvYeikUBOiCXEJ+4dN97UzVCQJ10S6gLkFdsHHXVqQxL+rNgkhPW0M92gTBfwaE5Q/oVnZemgQBX3L4hq4ErenRJOiSYYewBK3rUVSkMb/isBREU4K29KiZQeBcwTP+xLdz1jCDEO/AhlBc+CQnrwJBmFwRQnDhs/NsywtC5YqI0hK0W/qkBSFzRUhhCQKsDLKCsLkipOzOGbRwigpC54pIUEEJGmFfjqCgjFwRkT16cOUTE5SVK0Jy75wRC4OQoLxcEZJ54YP56RohQZm5IhKUc+GD0iMjKDtXEAx+9W03XYIKckUI+sIHrWcSVLn9caMJMwtsCdr5hwQqBJXlilAQqgRl6aksqDBXRGNHlIdMPVUFleaKCHgJytZTUVB8X1AK+LS1QE89QRS5IgBYggo3FXUEkeSKaOiQTy7ec9UQRJMrIgAXPgRb0gqCiHJFyH4JItmxswvC/Ggnir22F6JAwyyIMFdEI09+MNmWi1UQZa6ISJUgyh0poyDSXBGSKEG0G3Y2QcS5ImSzBFF/LpMg8lwRsnHhQ/+18AgizxURqyWIY9ZyCGLIFSFrFz48DzW9IJZcERK3vXB9LLUg2PsVxYQliO9bIW7DZsoVIcGdM+ekJRVEdl+xx1cJ4n2mCQUx5oqI/6et3CWPrAaV9EGh+ZQg/hWBagax5oqQ94VPjQWTRhBzrgiZS1CV/QSJIPZcEdHVq3gEgvhzRchYcUEoFlQhV0TU/MxCQXXqgCRFgliPDJVQIqhSrpAlX1C1XCFLrqCauUKUPEEWis8vWYKq5gphMhpFK+cKYdCC6ucKWbCC6ucKYXCCJHKFMBhBfz9XrAAXxNQHpR2wIBO5YgWgICO5IgbWKjqMR6uM/g87HMdxHMdxHMdxHMdxHMdxHEcD/wBb1EOVDQIN/gAAAABJRU5ErkJggg=='

const FeaturedSkelton = () => {
    
    return (
        <div>
            <Row className='gy-2'>
                <Col md={6}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} />
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} />
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} />
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} />
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

        </div >
    )
}

export default FeaturedSkelton



export const FeaturedCatSkelton = () => {
    return (
        <div>
            <Row className='gy-2'>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card >
                        <Card.Img variant="top" src={dummyImg} style={{width:'8rem', height:'5rem', objectFit:'contain'}}/>
                        <Card.Body>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


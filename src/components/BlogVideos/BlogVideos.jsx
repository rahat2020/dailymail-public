"use client"
import React, { useState, useEffect } from 'react';
import './BlogVideos.css';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useGetAllVideosQuery } from '@/redux/apiSlice';
import { alterredUserAvatar, truncateText } from '@/components/utils/helpers/appHelpers';
import { size } from 'lodash';
import { Heart } from 'react-feather';
import useScreenSize from '@/components/utils/hooks/useScreenSize';
import getPlayerDimensions from '@/components/utils/helpers/getPlayerDimensions';
import Image from 'next/image';

const BlogVideos = () => {
	const [hasWindow, setHasWindow] = useState(false);
	const { data, isLoading } = useGetAllVideosQuery([])
	const filteredData = data?.filter((item) => item?.status === "approved")
	const screenSize = useScreenSize();
	const { width, height } = getPlayerDimensions(screenSize);
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
										const { category, desc, user, title, videoOne, likes, _id } = item || {}
										const [{ username = '', photo = '' } = {}] = user || [];
										const userAvatar = photo || alterredUserAvatar
										return (
											<Col md={4} key={index} className='py-3'>
												<Card style={{ width: '100%', border: 'none' }} key={_id} className='BV_wrapper'>
													{
														hasWindow &&
														<ReactPlayer
															url={videoOne}
															controls
															light
															width={width}
															height={height}
														/>
													}
													<Card.Body>
														<div className="d-flex justify-content-between text-center">
															<div style={{ backgroundColor: 'green' }} className="w-100 d-flex justify-content-center flex-row text-center">
																<Image
																	src={userAvatar}
																	alt="person"
																	width={50}
																	height={50}
																	className="rounded-circle"
																	loading="lazy"
																	style={{ objectFit: 'contain' }}
																/>
																<div className="d-flex w-100 justify-content-between text-center ms-3">
																	<div className="d-flex justify-content-start  flex-column w-50">
																		<small className='text-dark fw-bold fs-5 text-start'>
																			{username || ''}
																		</small>
																		<small style={{
																			color: '#fff',
																			width:'70px',
																			backgroundColor: '#e97623',
																			padding: '0 10px',
																			borderRadius: '20px',
																			fontWeight: 'bold',
																			fontSize: '.6em',
																			textAlign:'center'
																		}}>{category}</small>
																	</div>
																	<div className="w-50 d-flex justify-content-end align-items-center">
																		<Heart style={{ width: '1rem', height: '1rem', color: '#F70099' }} />
																		<span className='ms-2'>{size(likes)}</span>
																	</div>
																</div>
															</div>
														</div>
														<Card.Title>{truncateText(title, 40)}</Card.Title>
														<Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc?.slice(0, 70)) }}>
														</Card.Text>
														<div className="d-flex justify-content-center align-items-center">
															<Link
																href={`/singlevideo/${_id}`}
																className='text-decoration-none text-capitalize '>
																<Button className='bv_button'>Watch</Button>
															</Link>
														</div>

													</Card.Body>
												</Card>
											</Col>
										)
									})
								}

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



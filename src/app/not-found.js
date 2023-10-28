"use client"
import Image from 'next/image'
import React from 'react'
import { Container } from 'react-bootstrap'

const Notfound = () => {
    return (
        <div className='d-flex justify-content-center align-items-center w-100 h-100'>
            <Container>
                <div className="w-100">
                    <Image src="/new404.png" alt="404" width={1000} height={500} style={{objectFit:'cover'}}/>
                </div>
            </Container>
        </div>
    )
}

export default Notfound
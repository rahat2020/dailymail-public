"use client"
import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5'>
      <Spinner animation="grow" />
    </div>
  )
}

export default Loading
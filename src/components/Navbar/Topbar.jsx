"use client"
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Card, Image } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Navbar.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useGetUserDataQuery, useLoginMutation, useRegisterMutation, useUserDataByEmailQuery, useUserTotalPostAndVideosCountQuery } from '@/redux/apiSlice';
import { AuthContext } from '@/context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { usePathname } from "next/navigation";
import { alterredUserAvatar, checkWindow } from '@/components/utils/helpers/appHelpers';

const Topbar = () => {

  // CURRENT PATHNAME
  const Tpath = usePathname()

  const [LoginData, { isLoading: loading }] = useLoginMutation()
  const [RegisterData] = useRegisterMutation()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // LOGIN PARTS
  const { dispatch, user } = useContext(AuthContext)
  const [mutationData, setMutationData] = useState({
    username: '',
    password: '',
  })
  const { data: userData } = useUserDataByEmailQuery(user)
  const { username, photo } = userData || {};
  const userAvatar = photo || alterredUserAvatar
  const classname = !userData ? 'profile_icons' : 'profile_icons_blinking'
  const { data: userPostsData } = useUserTotalPostAndVideosCountQuery(user)
  const handleOnchangeForLogin = (value, params) => {
    setMutationData((prev) => ({ ...prev, [params]: value }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const object = mutationData
    if (!mutationData.username || !mutationData.password) {
      toast('Field can not be empty')
    } else if (mutationData.password.length <= 6) {
      toast('Password must greater than 6 characters')
    } else {
      try {
        const res = await LoginData(object)
        if (res?.data?.message === "Login successful") {
          toast('Logged in Successfully')
          dispatch({ type: "LOGIN_SUCCESS", payload: res?.data?.email });
          if (res?.data?.role === 'admin') {
            localStorage.setItem("ifura", "su")
          }
          if (res?.data?.role === 'user') {
            localStorage.setItem("ifura", "nu")
          }
          setMutationData({});
        } else if (res?.error?.data === "Wrong credentials") {
          toast('User not found')
        } else {
          toast('Login Failed')
        }
      } catch (e) {
        console.log(e)
        e && toast('Login Failed')
      }
    }
  }

  // REGISTER 
  const [mutationDataForReg, setMutationDataForReg] = useState({
    username: '',
    password: '',
    email: '',
    terms: '',
  });
  const handleOnchangeForRegister = (value, params) => {
    setMutationDataForReg((prev) => ({ ...prev, [params]: value }))
  }
  // const handleFile = async(file) => {
  //   try{
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("upload_preset", "upload");
  //     const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
  //     const { url } = uploadRes.data
  //     setMutationDataForReg((prev) => ({ ...prev, photo: url }))
  //   } catch(err){
  //     console.log("🚀 ~ handleFile ~ err:", err)

  //   }
  // }
  const handleRegistration = async (e) => {
    e.preventDefault()
    if (!mutationDataForReg.username || !mutationDataForReg.password || !mutationDataForReg.email || !mutationDataForReg.terms) {
      toast('Field can not be empty')
    } else if (password.length < 6) {
      toast('Password must greater than 6 characters')
    } else {
      try {
        const res = await RegisterData(mutationDataForReg)
        if (res?.data === "registration successfull") {
          toast('Registration Successfull');
          setMutationDataForReg({});
        } else if (res.error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: `${res.error.data}`
          })
        }
      } catch (e) {
        console.log(e)
        e && Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
        })
      }
    }
  }

  // LOGOUT
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    Swal.fire({
      icon: 'success',
      title: 'Thanks for being with us',
    })
    if (checkWindow()) {
      window.localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-transparent shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <Image src='/dm.png' alt="logo" style={{ width: '8rem' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex justify-content-center align-items-center">
              <Nav.Link href='/category-post/Sports' className={Tpath === '/category-post/Sports' ? 'activecls' : ''}>
                Sports
              </Nav.Link>
              <Nav.Link href='/category-post/Islamic' className={Tpath === '/category-post/Islamic' ? 'activecls' : ''}>
                Islamic
              </Nav.Link>
              <Nav.Link href='/category-post/Travel' className={Tpath === '/category-post/Travel' ? 'activecls' : ''}>
                Travel
              </Nav.Link>
              <Nav.Link href="/category-post/Programming" className={Tpath === '/category-post/Programming' ? 'activecls' : ''}>
                Programming
              </Nav.Link>
              <Nav.Link href="/category-post/Technology" className={Tpath === '/category-post/Technology' ? 'activecls' : ''}>
                Technology
              </Nav.Link>

              <NavDropdown title="More categories" id="basic-nav-dropdown" data-bs-theme="light">
                <NavDropdown.Item href="/category-post/Entertainment">Entertainment</NavDropdown.Item>
                <NavDropdown.Item href="/category-post/Motivational">Motivational</NavDropdown.Item>
                <NavDropdown.Item href="/category-post/Lifestyles">Lifestyles</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" onClick={handleShow}>
                <div className={`d-flex justify-content-center align-items-center ${classname}`}>
                  <Image
                    src={userAvatar}
                    alt={username}
                    style={{ width: '2rem', height: '2rem', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
      <Offcanvas show={show} onHide={handleClose} end>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {
              !userData ?
                <span className=' text-secondary'>Welcome, start your journey from here!</span>
                : 'User panel'
            }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            !userData ?
              <Tabs
                defaultActiveKey="login"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="login" title="Login">
                  <Form className='p-3 py-5 shadow-sm rounded'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Enter username"
                        className='border-0 rounded shadow'
                        onChange={(e) => handleOnchangeForLogin(e.target.value, 'username')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password"
                        className='border-0 rounded shadow'
                        onChange={(e) => handleOnchangeForLogin(e.target.value, 'password')}
                      />
                    </Form.Group>
                    <div className="d-grid w-100">
                      <Button variant="outline-secondary fw-bold border-0 shadow rounded" type="submit" onClick={handleLogin}>
                        {
                          loading ?
                            <div className="d-flex justify-content-center align-items-center">
                              <span>Loging in...</span>
                            </div>
                            : 'Login'
                        }
                      </Button>
                    </div>
                  </Form>
                </Tab>


                <Tab eventKey="register" title="Registration">
                  <Form className='p-3 py-5 shadow-sm rounded'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Enter username"
                        className='border-0 rounded shadow'
                        onChange={(e) => handleOnchangeForRegister(e.target.value, 'username')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email"
                        className='border-0 rounded shadow'
                        onChange={(e) => handleOnchangeForRegister(e.target.value, 'email')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password"
                        className='border-0 rounded shadow'
                        onChange={(e) => handleOnchangeForRegister(e.target.value, 'password')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check type="checkbox"
                        label="I accept terms & conditions"
                        onClick={() => handleOnchangeForRegister('yes', 'terms')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Nav.Link href="/privacy-policy" className="text-primary">Read Privacy Policy</Nav.Link>
                    </Form.Group>
                    <div className="d-grid w-100">
                      <Button variant="outline-secondary fw-bold border-0 shadow rounded" type="submit" onClick={handleRegistration}>
                        Registration
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
              :
              <Card className='border-0 shadow'>
                <div className="d-flex justify-content-center align-items-center p-2">
                  <Card.Img
                    variant="top"
                    src={userAvatar}
                    style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%' }}
                    alt="Rahat"
                    className='shadow-sm'
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Name:</Card.Title>
                    <Card.Title className='text-secondary'>{userData?.username}</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Status:</Card.Title>
                    <Card.Title className='text-secondary '>{userData?.activeUser === 'yes' ? 'Online' : 'Offline'}</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Total Posts:</Card.Title>
                    <Card.Title className='text-secondary'>{userPostsData?.totalPostAndVideoCountLength}</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Total Likes:</Card.Title>
                    <Card.Title className='text-secondary'>12</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Total Comments:</Card.Title>
                    <Card.Title className='text-secondary'>15</Card.Title>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <Nav.Link href="https://dailymail-dashboard.web.app/login" target="_blank" className='text-decoration-none'>
                      <Button className='btn_goto_dashboard fw-bold' size='sm'>Go to Dashboard</Button>
                    </Nav.Link>
                    <Button className='btn_filter fw-bold' size='sm' onClick={handleLogout}>Logout</Button>
                  </div>
                </Card.Body>
              </Card>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Topbar
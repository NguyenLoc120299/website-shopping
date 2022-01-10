import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import style from './post.module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config.js'
import { Button } from '@chakra-ui/react'
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons'
import swal from 'sweetalert'

const Login = () => {
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleChangeValue = e => {
        e.preventDefault()
        const { name, value } = e.target
        setLoginValue({ ...loginValue, [name]: value })
    }
    const login = async () => {
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, loginValue.email, loginValue.password)
            setIsLoading(false)
            // window.location.href = '/'
        } catch (error) {
            setIsLoading(false)
            swal("Có lỗi xảy ra", `${error.message}`, "error")
        }

    }
    return (
        <div className={style.login}>

            <Container fluid>
                <Row className='justify-content-center align-item-center'>
                    <Col className='col-md-4'>
                        <div>
                            <h2 className={style.title}>Châu Nhung Shop</h2>
                            <Form.Group className="mb-3" >
                                <Form.Label> <EmailIcon style={{ marginRight: '5px' }} />Email</Form.Label>
                                <Form.Control type="email" placeholder="Nhập gmail"
                                    name='email'
                                    value={loginValue.email}
                                    onChange={handleChangeValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><UnlockIcon style={{ marginRight: '5px' }} />Password</Form.Label>
                                <Form.Control type='password' placeholder='Nhập mật khẩu'
                                    name='password'
                                    value={loginValue.password}
                                    onChange={handleChangeValue}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3 d-flex justify-content-center'>
                                <Button colorScheme='pink' variant='solid' isLoading={isLoading} onClick={() => login()} className='w-100'>
                                    Đăng nhập
                                </Button>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login

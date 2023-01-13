import React, { useState } from 'react'
import { Layout } from '../../componants'
import Form from 'react-bootstrap/Form';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Input } from '../../componants/UI/input/input';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions'

/**
* @author
* @function Signup
**/

export const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const userSignup = (e) => {
        e.preventDefault()

        const user = {
            firstName,
            lastName,
            email,
            password
        }
        dispatch(signup(user))
    }

    if (auth.authenticated) {
        return <Navigate to='/home' />
    }

    if(user.loading){
        return <p>Loading...</p>
    }

    return (
        <Layout>
            <Container>
                { user.message }
                <Row style={{ marginTop: '100px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="John"
                                        value={firstName}
                                        type='text'
                                        onChange={(e) => {setFirstName(e.target.value)}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Doe"
                                        value={lastName}
                                        type='text'
                                        onChange={(e) => {setLastName(e.target.value)}}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="example@mail.com"
                                value={email}
                                type='email'
                                onChange={(e) => {setEmail(e.target.value)}}
                            />

                            <Input
                                label="Password"
                                placeholder=""
                                value={password}
                                type='password'
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}
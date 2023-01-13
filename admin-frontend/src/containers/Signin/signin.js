import React, { useState } from 'react'
import { Layout } from '../../componants'
import Button from 'react-bootstrap/Button';
import { Input } from '../../componants/UI/input/input';
import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { login } from "../../actions"
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Signin
**/

export const Signin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const userLogin = (e) => {
        e.preventDefault()

        const user = {
            email, password
        }
        dispatch(login(user))
    }
    
    if(auth.authenticated){
        return <Navigate to='/home' />
    }

    return(
        <Layout>
            <Container>
                <Row style={{ marginTop: '100px'}}>
                    <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userLogin}>
                        <Input 
                            label="Email"
                            placeholder="example@mail.com"
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                            label="Password"
                            placeholder=""
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
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
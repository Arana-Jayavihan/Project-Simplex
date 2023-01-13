import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';

/**
* @author
* @function Header
**/

export const Header = (props) => {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(signout())
    }

    const auth = useSelector(state => state.auth)

    const LoggedInLinks = () => {
        return (
            <Nav>
                <Nav.Link onClick={signOut}>SignOut</Nav.Link>
            </Nav>
        )
    }

    const nonLoggedInLinks = () => {
        return (
            <Nav>
                <Nav.Link href='/signin'>SignIn</Nav.Link>
                <Nav.Link href='/signup'>SignUp</Nav.Link>
            </Nav>
        )
    }

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>

                    {auth.authenticated ? LoggedInLinks() : nonLoggedInLinks()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}
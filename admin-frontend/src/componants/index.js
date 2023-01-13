import React from 'react'
import { Container } from 'react-bootstrap'
import { Header } from './Header/header'

/**
* @author
* @function Layout
**/

export const Layout = (props) => {
  return(
    <>
        <Header />
        <Container>
            {props.children}
        </Container>
    </>
   )

 }


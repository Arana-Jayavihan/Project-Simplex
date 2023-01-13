import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
* @author
* @function NewModel
**/

export const NewModel = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.ModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>

                {
                    props.buttons ? props.buttons.map(button =>
                        <Button key={button.label} variant={button.color} onClick={button.onClick}>
                            {button.label}
                        </Button>
                    ) :
                        <div>
                            <Button variant="secondary" style={{ margin: '0 10px' }} onClick={props.close}>
                                Close
                            </Button>
                            <Button variant='primary' style={{ margin: '0 10px' }} onClick={props.handleClose}>
                                Save Changes
                            </Button>    
                        </div>
                }
            </Modal.Footer>
        </Modal>
    )

}
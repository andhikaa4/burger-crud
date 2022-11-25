import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Logout(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Logout User</Modal.Title>
    </Modal.Header>
    <Modal.Body>Apakah anda yakin ingin logout ?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={props.handleClose}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Logout
import React from 'react'
import { API } from '../config/api';
import Modal from 'react-bootstrap/Modal';

function Delete(props) {
    const handleDelete = async() => {
        try {
            const response = await API.delete(`/Product/${props.id._id}`)
            props.refetch()
            
                props.handleClose()
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin menghapus ?</Modal.Body>
        <Modal.Footer>
          <p className='bg-secondary text-white py-1 px-5 m-0 me-2 rounded' style={{cursor:"pointer"}} onClick={props.handleClose}>
            Close
          </p>
          <p className='bg-danger text-white py-1 px-5 m-0 rounded' style={{cursor:"pointer"}} onClick={() => {handleDelete(); props.refetchMenu()}}>
            Delete
          </p>
        </Modal.Footer>
      </Modal>
  )
}

export default Delete
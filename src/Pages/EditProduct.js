import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { API, kontenbase } from '../config/api';
import {useMutation, useQuery} from 'react-query'
import { Alert } from 'react-bootstrap';

function EditProduct(props) {
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState(null);

    const { data: products, refetch } = useQuery("productsCache", async () => {
        const response = await API.get("/Product");
        
        return response.data;
    });
    const filter = products?.filter(p=> p.name === props?.id?.name)

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
      });

      useEffect(() => {
        if (props.id) {
          setPreview(props?.id?.image[0]?.url);
          setProduct({
            ...product,
            name: props?.id?.name,
            price: props?.id?.price,
            stock: props?.id?.stock,
          });
        }},[props.id])

      const [image, setImage] = useState (null)
    
    
    const handleChange = (e) => {
        setProduct({
          ...product,
          [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
            
        });
        
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };

      const handleImage = async(e) => {
        const file = e.target.files[0]
        const {data} = await kontenbase.storage.upload(file)
        setPreview(data.url)
        setImage(data)
      }    
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();

          if(filter?.length <= 1){
          if(image !== null){
              const data = {
                name : product.name,
                stock: parseInt(product.stock),
                price: parseInt(product.price),
                image: [{ fileName: image.fileName, url: image.url}]
              }
              if(image.size <= 100000){
                  const res = await API.patch("/Product/" + props?.id?._id, data);
                  props.refetch()
                 props.handleClose()
              } else {
                const alert = (
                    <Alert variant="success">Gambar tidak boleh lebih dari 100kb</Alert>
                  );
              
                  setMessage(alert);
              }
          } else {
            const data = {
                name : product.name,
                stock: parseInt(product.stock),
                price: parseInt(product.price),
                image: [{ fileName: props?.id?.image[0].fileName, url: props?.id?.image[0].url}]
              }
              const res = await API.patch("/Product/" + props?.id?._id, data);
              if(res.status == 200){
                props.refetch()
                 props.handleClose()
              }
              console.log(res);
          }}else {
            const alert = (
                <Alert variant="success">Nama Tidak Boleh sama</Alert>
              );
          
              setMessage(alert);
          }
    
          
          
    
        } catch (error) {
          console.log(error);
        }
      });

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <input className='form-control mb-3 border border-dark' onChange={handleChange} name='name' value={product.name} placeholder='Product Name' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="text" />
                            <input className='form-control mb-3 border border-dark' onChange={handleChange} name='stock' value={product.stock} placeholder='Stock' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="number" />
                            <input className='form-control mb-3 border border-dark' onChange={handleChange} name='price' value={product.price} placeholder='Price' style={{ backgroundColor: "rgba(97, 61, 43, 0.25)" }} type="number" />

                            {preview && (
                                <div>
                                    <img
                                        src={preview}
                                        style={{
                                            maxWidth: "150px",
                                            maxHeight: "150px",
                                            objectFit: "cover",
                                            marginBottom:"10px"
                                        }}
                                        alt={preview}
                                    />
                                </div>
                            )}

                            <div className="input-group mb-3">
                                <input type="file" name='image' onChange={handleImage} className="form-control" id="inputGroupFile02" />
                                <label style={{ cursor: "pointer", backgroundColor: "rgba(97, 61, 43, 0.25)" }} className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </Form.Group>
                        <div className='bg-danger text-right mt-3 rounded'>
                            
                            <p onClick={(e) => {handleSubmit.mutate(e)}} style={{cursor:"pointer"}} className='bg-success px-3 py-2 rounded text-white text-center '>
                            Edit Product
                        </p>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditProduct
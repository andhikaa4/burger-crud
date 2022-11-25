import React, { useState } from 'react'
import Burger from '../images/burger.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import Delete from './delete';
import AddProduct from './addProduct';
import EditProduct from './EditProduct';
import Pagination from '../components/pagination/Pagination';


function Menu() {
    const { data: products, refetch: menu } = useQuery("menusCache", async () => {
        const response = await API.get("/Product");
        return response.data;
    });
    const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = products?.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el?.name.toLowerCase().includes(inputText)
    }
})

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredData?.slice(firstPostIndex, lastPostIndex)

    return (
        <div>

            <div>
                <div className="mask container" style={{ height: "100vh" }}>
                            <div className='d-flex justify-content-center'  >
                                <input style={{marginTop:"100px"}} className=' position-absolute rounded' type="text" onChange={inputHandler} placeholder='Search Product'/>
                                
                            </div>
                    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                        <div className='w-100'>
                            <div className='w-100 d-flex pt-5'>
                                {currentPosts?.map((item) => (

                                <Card className='text-center border-0 me-5' style={{ width: '18rem', height:'25rem', backgroundColor:"transparent" }}>
                                    <Card.Img variant="top" className='d-block mx-auto' style={{objectFit:"contain", width:"18rem", height:"18rem"}} src={item.image[0].url} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.price}
                                            
                                        </Card.Text>
                                        <Button className='w-100  p-2' style={{fontFamily:"Alfa Slab One"}} variant="success">Tambah</Button>
                                    </Card.Body>
                                </Card>
                                ))}
                            </div>
                            <Delete refetchMenu={menu} />
                            <AddProduct refetchMenu={menu} />
                            <EditProduct refetchMenu={menu} />
                            <div className='fixed-bottom pb-3'>
                                
                    <Pagination
                totalPosts={products?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
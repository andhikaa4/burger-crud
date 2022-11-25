import React, { useState, useEffect, useContext, useMemo } from 'react'
import AddProduct from './addProduct';
import { useQuery } from 'react-query'
import { API } from '../config/api';
import { UserContext } from '../components/context/userContext';
import EditProduct from './EditProduct';
import Delete from './delete';
import Pagination from '../components/pagination/Pagination';

function Profile() {
    const [state] = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [page, setPage] = useState(1);



    const [id, setId] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const { data: products, refetch } = useQuery("listProductCache", async () => {
        const response = await API.get("/Product");
        return response.data;
    });


    useEffect(() => {
        refetch()
    }, [])

    const [coinsData, setCoinsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = products?.slice(firstPostIndex, lastPostIndex)

    console.log(currentPosts);


    return (

        <div>

            <div>
                <div className="mask text-white container" >
                    <div className="container d-flex align-items-center flex-column py-5" style={{ height: "100vh" }}>

                        <div className='w-100 h-75 mt-5 text-end'>
                            <div className=' mb-3'>

                                <span className='text-end bg-danger text-white px-5 py-2 rounded' style={{ cursor: "pointer" }} onClick={handleShow}>Add Product</span>
                                <AddProduct show={show} handleClose={handleClose} refetch={refetch} />
                            </div>
                            <table border='1px' className='w-100 border-collapse text-middle'>
                                <thead>
                                    <tr className='bg-info bg-opacity-50 text-center'>
                                        <th className='border border-1 border-dark py-2 ps-1'>
                                            No
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Image
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Name
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Stock
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Price
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Buy Price
                                        </th>
                                        <th className='border border-1 border-dark ps-1'>
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className=' bg-white bg-opacity-25'>
                                    {currentPosts?.map((item, index) => (
                                        item?.user?._id == state?.user.userId && (
                                            <tr className='text-center text-black'>
                                                <td className='border border-1 border-dark py-2 ps-1'>
                                                    {index + 1}
                                                </td >
                                                <td className='border border-1 border-dark ps-1'>
                                                    <img style={{ maxHeight: "100px" }} src={item.image[0].url} alt="" />
                                                </td>
                                                <td className='border border-1 border-dark ps-1'>
                                                    {item.name}
                                                </td>
                                                <td className='border border-1 border-dark ps-1'>
                                                    {item.stock}
                                                </td>
                                                <td className='border border-1 border-dark ps-1'>
                                                    {item.price}
                                                </td>
                                                <td className='border border-1 border-dark ps-1'>
                                                    {item.buyPrice}
                                                </td>
                                                <td className='border border-1 border-dark p-1 '>
                                                    <div className=' w-100 d-flex'>

                                                        <p style={{ width: "49%", cursor: "pointer" }} className=' bg-danger text-white me-1 text-decoration-none px-3 py-2 rounded m-0' onClick={() => { setId(item); handleShowDelete() }}>Delete</p>
                                                        <Delete show={showDelete} handleClose={handleCloseDelete} id={id} refetch={refetch} />
                                                        <p style={{ width: "49%", cursor: "pointer" }} className=' bg-success text-white text-decoration-none px-3 py-2 rounded m-0' onClick={() => { setId(item); handleShowEdit() }} >Update</p>
                                                        <EditProduct show={showEdit} refetch={refetch} handleClose={handleCloseEdit} id={id} />
                                                    </div>
                                                </td>

                                            </tr>)
                                    ))}

                                </tbody>

                            </table>
                        </div>
                        <div className='d-flex align-items-center'>
                        <Pagination
                totalPosts={products?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
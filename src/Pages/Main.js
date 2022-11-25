import React from 'react'
import '../components/Navbar/navbar.css'
import Burger from '../images/burger.png'

function Main() {
    return (
        <div>

            <div >
                <div className="mask text-white container" >
                    <div className="container d-flex align-items-center " style={{ height: "100vh" }}>
                        <div className='row w-100 align-items-center' >
                            <div className='col-md-6 text-center'>
                                <div className=' py-2 mb-0' style={{maxWidth:"370px", borderStyle:"dashed", borderColor:"black" }}>
                                    <p className='m-0 text-black fw-bold' style={{fontSize:"13px"}}>IT IS A GOOD TIME FOR THE GREAT TASTE OF BURGERS</p>
                                </div>
                                <div className='text-start mt-2' style={{color:"#3d2514"}}>
                                    <p className='fw-bolder lh-1 font-family' style={{fontSize:"120px"}}>Burger <p style={{fontSize:"75px"}}>Week</p></p>
                                    
                                </div>
                            </div>
                            <div className='col-md-6 align-items-center justify-content-center'
                            style={{backgroundImage: `radial-gradient(ellipse, rgb(255,255,255) 0%, transparent 70%)`}}>
                                <img src={Burger} alt='' className='display-block' style={{height:"400px", width:"auto"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
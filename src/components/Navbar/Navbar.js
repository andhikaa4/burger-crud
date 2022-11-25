import React,{useContext, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from "../../Pages/Login";
import Main from '../../Pages/Main'
import Menu from "../../Pages/Menu";
import BG from '../../images/bg.png'
import { UserContext } from "../context/userContext";
import Profile from "../../Pages/profile";



function NavScrollExample() {
    const [state, dispatch] = useContext(UserContext)

    const LogoutUser = () => {
        
        dispatch({
            type: "LOGOUT"
        })
        console.log(state);
    }

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div >
            <div id="intro"
                className="bg-image"
                style={{
                    backgroundImage: `url(${BG})`,
                    height: "100vh"
                }}>
                <Tabs
                   defaultActiveKey='home'
                    id="uncontrolled-tab-example"
                    className="fixed-top container d-flex justify-content-center mt-5 "
                    variant="pills"

                >
                    <Tab eventKey="home" title="Home" tabClassName="bg-transparent text-black " >
                        <Main />
                    </Tab>
                    <Tab eventKey="menu" title="Menu" tabClassName="bg-transparent text-black " >
                        <Menu/>
                    </Tab>
                    {state.isLogin !== true ? 
                    <Tab eventKey="login" title="Login" tabClassName="bg-transparent text-black fw-bold">
                        <Login/>
                    </Tab> :        
                        <Tab eventKey="list" title="List Product" tabClassName="bg-transparent text-black fw-bold">
                            <Profile/>
                        </Tab>
                    }
                    
                </Tabs>
                {state.isLogin == true && 
                <div className='fixed-top container d-flex justify-content-center mt-2' style={{cursor:"pointer"}}>
                    <span className='bg-danger py-1 px-5 text-white rounded' onClick={LogoutUser}>Log Out</span>
                </div>}
            </div>

        </div>
    )
}

export default NavScrollExample;
import React, { useState, useContext } from 'react';
import {useMutation} from 'react-query'
import {Alert} from 'react-bootstrap'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { API } from '../config/api';
import { UserContext } from '../components/context/userContext';

function Login() {
    const [state,dispatch] = useContext(UserContext)
    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        firstName: '',
        email: '',
        password: '',
    });    
    const { firstName, email, password } = form;

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    }); 
    
    const handleOnChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      });
    }
    const handleOnChange2 = (e) => {
      setFormLogin({
          ...formLogin,
          [e.target.name]: e.target.value,
      });
    }
    
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
    
        const response = await API.post("/auth/register", form);
    
        const alert = (
          <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
        );
        console.log(response);
    
        setMessage(alert);
        setForm({
            firstName:'',
            email:'',
            password:''
        })
    
      } catch (e) {
        console.log(e);
        const alert = (
          <Alert variant="danger">Aduh gagal!</Alert>
        );
    
        setMessage(alert);
      }
    });

    const handleSubmitLogin = useMutation(async (e) => {
        try {
          e.preventDefault();
      
          const data = await API.post("/auth/login", formLogin);
      
          const alert = (
            <Alert variant="success">Berhasil Login</Alert>
          );
      
          setMessage(alert);
          setForm({
              firstName:'',
              email:'',
              password:''
          })
          console.log(data);
          let payload = data.data
          dispatch({
            type: "LOGIN_SUCCESS",
            payload,
          });
      
        } catch (e) {
          console.log(e);
          const alert = (
            <Alert variant="danger">Aduh gagal Login!</Alert>
          );
      
          setMessage(alert);
        }
      });
    
    return (
        <div>

            <div
               

            >
                <div className="mask text-white container" >
                    <div className="container d-flex align-items-center text-center " style={{ height: "100vh" }}>
                        <MDBContainer fluid className='p-4 mt-5'>

                            <MDBRow>

                                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                                        The best offer <br />
                                        <span className="text-primary">for your Stomach</span>
                                    </h1>

                                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                                        quibusdam tempora at cupiditate quis eum maiores libero
                                        veritatis? Dicta facilis sint aliquid ipsum atque?
                                    </p>

                                </MDBCol>

                                <MDBCol md='6' className=' d-flex justify-content-center '  >
                                    <div className='h-100 bg-white p-3 rounded text-black' style={{ width: "70%", height: "100vh" }}>

                                        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                                            <MDBTabsItem>
                                                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                                                    Login
                                                </MDBTabsLink>
                                            </MDBTabsItem>
                                            <MDBTabsItem>
                                                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                                                    Register
                                                </MDBTabsLink>
                                            </MDBTabsItem>
                                        </MDBTabs>

                                        <MDBTabsContent>

                                            <MDBTabsPane show={justifyActive === 'tab1'}>

                                                <div className="text-center mb-3">
                                                    <p>Sign in with:</p>

                                                    <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                                        <MDBIcon fab icon='facebook-f' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='twitter' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='google' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='github' style={{ color: '#1266f1' }} size="sm" />
                                                    </div>

                                                    <p className="text-center mt-3">or:</p>
                                                </div>
                                                {message && message}
                                                <MDBInput wrapperClass='mb-4' name='email' value={formLogin.email} onChange={handleOnChange2} placeholder="Email" id='form1' type='email' />
                                                <MDBInput wrapperClass='mb-4' name='password' value={formLogin.password} onChange={handleOnChange2} placeholder="Password" id='form2' type='password' />

                                                <div className="d-flex justify-content-between mx-4 mb-4">
                                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                                </div>

                                                <p className="mb-4 w-100 bg-success text-white py-2 rounded" onClick={(e) => handleSubmitLogin.mutate(e)} style={{cursor:"pointer"}}>Sign in</p>
                                                <p className="text-center">Not a member? <p style={{cursor:"pointer"}} onClick={() => handleJustifyClick('tab2')}>Register</p></p>

                                            </MDBTabsPane>

                                            <MDBTabsPane show={justifyActive === 'tab2'}>

                                                <div className="text-center mb-3">
                                                    <p>Sign up with:</p>

                                                    <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                                        <MDBIcon fab icon='facebook-f' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='twitter' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='google' style={{ color: '#1266f1' }} size="sm" />

                                                        <MDBIcon fab icon='github' style={{ color: '#1266f1' }} size="sm" />
                                                    </div>

                                                    <p className="text-center mt-2">or:</p>
                                                </div>
                                                {message && message}
                                                <MDBInput wrapperClass='mb-4' name='firstName' value={firstName} onChange={handleOnChange} placeholder="Name" id='form3' type='text' />
                                                <MDBInput wrapperClass='mb-4' name='email' value={email} onChange={handleOnChange} placeholder="Email" id='form4' type='email' />
                                                <MDBInput wrapperClass='mb-4' name='password' value={password} onChange={handleOnChange} placeholder="Password" id='form5' type='password' />

                                                <div className='d-flex justify-content-center mb-4'>
                                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                                                </div>

                                                <p className="mb-4 w-100 bg-success text-white py-2 rounded" onClick={(e) => handleSubmit.mutate(e)} style={{cursor:"pointer"}}>Sign up</p>

                                            </MDBTabsPane>

                                        </MDBTabsContent>
                                    </div>

                                </MDBCol>

                            </MDBRow>


                        </MDBContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
import React, {useEffect, useContext} from 'react'
import { UserContext } from './components/context/userContext';
import Navbar from './components/Navbar/Navbar'
import { API, setAuthToken } from './config/api';

function App() {
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
}, [state]);

const checkUser = async () => {
  try {
    const response = await API.post('/auth/verify-token');
    let payload = response.data;
    payload.token = localStorage.token;
    console.log(response);

    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  checkUser();
}, []);
  return (
    <div>
         <Navbar/>
    </div>
  );
}

export default App;

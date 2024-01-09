import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email,password});
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
      <br></br>
      <br></br>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
                 <br></br>
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
                 <br></br>
          <button className="primary" style={{ backgroundColor: '#407cad' }}>Login</button>
          <br></br>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
        <div >
            <img src="https://static.vecteezy.com/system/resources/previews/003/857/409/non_2x/tourists-with-luggage-at-the-airport-set-collection-of-young-and-happy-traveling-people-carrying-suitcases-bags-summer-vacation-holiday-journey-concept-isolated-flat-illustration-free-vector.jpg" className="w-full h-full object-cover"></img>
          </div>
          <br></br>
      </div>
    </div>
  );
}
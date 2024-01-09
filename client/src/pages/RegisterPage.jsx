import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
      <br></br>
      <br></br>
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)} />
          <input type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button className="primary" style={{ backgroundColor: '#407cad' }}>Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
        <div >
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/813/667/non_2x/female-tourist-and-travel-concept-tourists-with-suitcases-about-to-board-a-plane-vector.jpg"
            className="max-w-full max-h-64 object-cover mx-auto"
            alt="Tourists with suitcases"
          />

        </div>
        <br></br>
      </div>
    </div>
  );
}

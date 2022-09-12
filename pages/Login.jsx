import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Header from './components/Header';
import { ModeContext } from '../Context/DarkMode';

const Login = () => {
  const { Mode } = useContext(ModeContext); //CHANGE TO REDUX
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [CurrentUser, setCurrentUser] = useState('');
  const checkuser = async () => {
    const user = await fetch(`/api/${username}/${password}`);
    const res = await user.json();

    if (Object.keys(res).length) {
      console.log(res);
      setCurrentUser(res.username);
    } else {
      console.log('user unavailable');
    }
  };
  return (
    <>
      <Header />
      <div
        className={`flex justify-center items-center w-full min-h-screen ${
          Mode ? 'bg-slate-800 ' : 'bg-cyan-700'
        } text-slate-900' `}
      >
        <div className="flex  flex-col mx-auto gap-5 p-3 w-[450px] h-[80%] bg-slate-100 rounded-md ">
          <h1 className="self-center">You are ...?</h1>
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            type="text"
            name="username"
            id=""
            placeholder="Your Username..."
            className="px-2 py-3 rounded-md w-[80%] mx-auto "
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="password"
            id=""
            placeholder="Your Password..."
            className="px-2 py-3 rounded-md w-[80%] mx-auto "
          />
          <Link href={`${CurrentUser ? '/' : '/Login'}`}>
            <button
              onClick={checkuser}
              type="submit"
              className="w-[80%] mx-auto rounded-md text-white bg-cyan-800 p-2 text-1xl"
            >
              Log in{' '}
            </button>
          </Link>
          <p className="text-base ">
            Are you new ? <span className="font-bold ">Sign in</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

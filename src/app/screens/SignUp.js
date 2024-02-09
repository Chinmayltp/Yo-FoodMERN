import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("enter valid credentials");
    }
    if (json.success) {
      alert("User Signed up Please Login via Already a User");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // const submitForm = () => {
  //   <h1>Form submitted please log in</h1>;
  // };

  return (
    <>
      <div className='container bg-dark text-white'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={onChange}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={credentials.password}
              onChange={onChange}
              id='exampleInputPassword1'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChange}
              id='exampleInputPassword1'
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>

          <Link to='/login' className='m-6 mx-4 btn btn-danger'>
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;

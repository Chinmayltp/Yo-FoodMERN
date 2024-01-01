import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-success'>
        <div className='container-fluid'>
          <img
            src='data:image/jpeg;base64,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'
            alt='logo'
            id='imagelogo'
          />
          <Link className='navbar-brand fw-bold' to='#'>
            Yo-Food
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto mb-2'>
              <li className='nav-item'>
                <Link
                  className='nav-link active fs-5 '
                  aria-current='page'
                  to='#'
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className='nav-item active fs-5'>
                  <Link
                    className='nav-link active fs-5 '
                    aria-current='page'
                    to='/myOrder'
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className='d-flex'>
                <Link className='btn bg-white text-success mx-1 ' to='/login'>
                  Login
                </Link>

                <Link
                  className='btn bg-white text-success mx-1 '
                  to='/createuser'
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className='btn bg-white text-success mx-2 '
                  onClick={() => setCartView(true)}
                >
                  My Cart
                  <Badge pill bg='danger'>
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal
                    onClose={() => {
                      setCartView(false);
                    }}
                  >
                    <Cart></Cart>
                  </Modal>
                ) : null}
                <div
                  className='btn bg-white text-danger mx-2 '
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

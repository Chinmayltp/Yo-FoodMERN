import React from "react";
//import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://merncapastoneproject-nwsg.onrender.com/api/orderData", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn p-0'>
                    <img
                      id='delete'
                      src='data:image/png;base64,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'
                      alt='delete'
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2  text-white'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id='carouselExampleFade'
          className='carousel slide carousel-fade'
          style={{ objectFit: "contain !important" }}
          data-bs-ride='carousel'
        >
          <div className='carousel-inner' id='carousal'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className='d-flex  justify-content-center'>
                <input
                  className='form-control me-2 w-75 bg-white text-dark'
                  type='search'
                  placeholder='Search in here...'
                  aria-label='Search'
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </div>
            </div>
            <div
              className='carousel-item active'
              style={{ maxHeight: "500px" }}
            >
              <img
                src='https://source.unsplash.com/random/900x700/?pastry'
                className='d-block w-100'
                alt='burger'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='https://source.unsplash.com/random/900x700/?icecream'
                className='d-block w-100'
                alt='momos'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='https://source.unsplash.com/random/900x700/?burger'
                className='d-block w-100'
                alt='pasta'
              />
            </div>
          </div>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselExampleFade'
            data-bs-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      </div>
      <div className=' container '>
        {foodCat !== null
          ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr
                    id='hr-success'
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {foodItems !== null ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className='col-12 col-md-6 col-lg-3'
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

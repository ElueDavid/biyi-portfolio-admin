import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import biyidp from "../images/biyid.png";
import pcimage from "../images/Component 40.png";
import { Link } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate(); 

  const handleNavigate = (page) => navigate(`/${page}`);

  const [modalActive, setModalActive] = useState(false);
  const [modal2Active, setModal2Active] = useState(false);


  return (
    <div className='portfolio-page'>
      <div className="side-bar">
        <div className="dp-space" onClick={() => handleNavigate('Portfoliopage')}>
          <figure>
            <img src={biyidp} alt="" />
          </figure>
          <h3>Hello 'Biyi</h3>
        </div>
        <section>
          <div  onClick={() => handleNavigate('Portfoliopage')}>
            Portfolio
          </div>
          <div onClick={() => handleNavigate('Lightpages')}>Light Pages</div>
          <div className='sidebar-indicator' onClick={() => handleNavigate('Products')}>Products</div>
        </section>
      </div>
      <main>
        <div className="categories">
          <h1 className='products-subheading'>
            Products Categories
          </h1>
          <div className="products-category-list">
            <Link to="/Allproducts">All</Link>
            <Link to="/Ebooks">eBooks</Link>
            <Link to="/Servvices">Service as a product</Link>
            <Link to="/Solutions">Product solutions </Link>
            <Link to="/Ecourses">E-courses</Link>
          </div>
        </div>
      </main>
      {/* {modalActive && (
        <div className="modal-bg" onClick={handleModalClick}>
          <div className="portfoliopage-modal">
            <form action="" className='ppm-form'>
              <input type="text" placeholder='Enter Content name ' />
              <div className="ppm-upload">
                <input type="file" name="" id="" className='ppmu' />
              </div>
              <button type="submit">Publish</button>
            </form>
          </div>
        </div>
      )}
      {modal2Active && (
        <div className="modal2-bg" onClick={handleModal2Click}>
          <div className="portfoliopage-modal2">
            <form action="" className="ppm-form2">
              <input type="text" placeholder='Edit Content name ' />
              <div className="ppm-upload">
                <input type="file" name="" id="" className='ppmu' />
              </div>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

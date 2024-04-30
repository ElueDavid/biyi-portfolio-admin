import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import biyidp from "../images/biyid.png";
import pcimage from "../images/Component 40.png";

export default function Lightpages() {
  const navigate = useNavigate(); 

  const handleNavigate = (page) => navigate(`/${page}`);

  const [modalActive, setModalActive] = useState(false);
  const [modal2Active, setModal2Active] = useState(false);

  const handleAddContentClick = () => {
    setModalActive(true);
    setModal2Active(false); // Deactivate modal2 if active
  };

  const handlePCNameClick = () => {
    setModal2Active(true);
    setModalActive(false); // Deactivate modal if active
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-bg') || e.target.classList.contains('ppm-form')) {
      setModalActive(false);
    }
  };

  const handleModal2Click = (e) => {
    if (e.target.classList.contains('modal2-bg') || e.target.classList.contains('ppm-form2')) {
      setModal2Active(false);
    }
  };

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
          <div onClick={() => handleNavigate('Portfoliopage')}>
            Portfolio
          </div>
          <div className='sidebar-indicator' onClick={() => handleNavigate('Lightpages')}>Light Pages</div>
          <div onClick={() => handleNavigate('Products')}>Products</div>
        </section>
      </div>
      <main>
        <div className="add-content-btn" onClick={handleAddContentClick}>
          + add content
        </div>
        <input type="search" placeholder='search content' className='search-input' />
        <div className="portfolio-contents">
          <div className="portfolio-content">
            <figure className='pc-image'>
              <img src={pcimage} alt="" />
            </figure>
            <h4 className="pc-text-name" onClick={handlePCNameClick}>Ignormania</h4>
            <span className="cancel-pc-item">X</span>
          </div>
          {/* Add more portfolio content */}
        </div>
      </main>
      {modalActive && (
        <div className="modal-bg" onClick={handleModalClick}>
          <div className="portfoliopage-modal">
            <form action="" className='ppm-form'>
              <input type="text" placeholder='Enter Content name ' />
              <div className="ppm-upload">
                <input type="file" name="" id="" className='ppmu' />
              </div>
              <br />
              <textarea name="" id="" cols="30" rows="10" placeholder='enter content description...'></textarea>
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
              <br />
              <textarea name="" id="" cols="30" rows="10" placeholder='edit content description...'></textarea>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import biyidp from "../images/biyid.png";
import pcimage from "../images/Component 40.png";
import cancel_icon from "../images/cancel-image.png";

export default function Portfoliopage() {
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

  // Function to handle adding software
  const handleAddSoftwareClick = () => {
    const softwareInput = document.querySelector('.sftw-input');
    const softwareText = softwareInput.value.trim();
    if (softwareText) {
      const softwareList = document.querySelector('.sftw-second-part');
      const newSoftware = document.createElement('span');
      newSoftware.classList.add('software');
      newSoftware.innerHTML = `
        <p class='software-text'>${softwareText}</p>
        <img src=${cancel_icon} alt='' class='sftw-cancel' onclick='removeSoftware(this)'/>
      `;
      softwareList.appendChild(newSoftware);
      softwareInput.value = ''; // Clear input after adding
    }
  };

  // Function to handle adding skill
  const handleAddSkillClick = () => {
    const skillInput = document.querySelector('.skill-input');
    const skillText = skillInput.value.trim();
    if (skillText) {
      const skillList = document.querySelector('.skill-second-part');
      const newSkill = document.createElement('span');
      newSkill.classList.add('skill');
      newSkill.innerHTML = `
        <p class='skill-text'>${skillText}</p>
        <img src=${cancel_icon} alt='' class='skill-cancel' onclick='removeSkill(this)'/>
      `;
      skillList.appendChild(newSkill);
      skillInput.value = ''; // Clear input after adding
    }
  };

  // Function to remove software span
  window.removeSoftware = (element) => {
    element.parentNode.remove();
  };

  // Function to remove skill span
  window.removeSkill = (element) => {
    element.parentNode.remove();
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
          <div className='sidebar-indicator' onClick={() => handleNavigate('Portfoliopage')}>
            Portfolio
          </div>
          <div onClick={() => handleNavigate('Lightpages')}>Light Pages</div>
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
              <input type="text" placeholder='Enter Content title ' />
              <input type="text" placeholder='Enter Content type'/>
              <input type="text" placeholder='Client/Brand'/>
              <input type="text" placeholder='Role'/>

              <div className="listing-space">
                <div className="sftw-first-part">
                  <input type="text" placeholder='Enter software' className='sftw-input'/>
                  <span className='sftw-add-soft-btn' onClick={handleAddSoftwareClick}>
                    add software +
                  </span>
                </div>
                <div className="sftw-second-part">
                  {/* Software spans will be dynamically added here */}
                </div>
              </div>

              <div className="listing-space2">
                <div className="skill-first-part">
                  <input type="text" placeholder='Enter skill' className='skill-input'/>
                  <span className='skill-add-soft-btn' onClick={handleAddSkillClick}>
                    add skill +
                  </span>
                </div>
                <div className="skill-second-part">
                  {/* Skill spans will be dynamically added here */}
                </div>
              </div>

              <textarea name="" id="" cols="30" rows="10" placeholder='what is the mission?'></textarea>
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
            <input type="text" placeholder='Edit Content title ' />
              <input type="text" placeholder='Edit Content type'/>
              <input type="text" placeholder='Client/Brand'/>
              <input type="text" placeholder='Role'/>

              <div className="listing-space">
                <div className="sftw-first-part">
                  <input type="text" placeholder='Edit software' className='sftw-input'/>
                  <span className='sftw-add-soft-btn' onClick={handleAddSoftwareClick}>
                    add software +
                  </span>
                </div>
                <div className="sftw-second-part">
                  {/* Software spans will be dynamically added here */}
                </div>
              </div>

              <div className="listing-space2">
                <div className="skill-first-part">
                  <input type="text" placeholder='Edit skill' className='skill-input'/>
                  <span className='skill-add-soft-btn' onClick={handleAddSkillClick}>
                    add skill +
                  </span>
                </div>
                <div className="skill-second-part">
                  {/* Skill spans will be dynamically added here */}
                </div>
              </div>

              <textarea name="" id="" cols="30" rows="10" placeholder='what is the mission?'></textarea>
              <div className="ppm-upload">
                <input type="file" name="" id="" className='ppmu' />
              </div>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

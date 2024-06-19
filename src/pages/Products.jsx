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
// delete section

const [isActivedel, setIsActivedel] = useState(false);

// delete section

const [fileSections, setFileSections] = useState([{}]);

const addFileSection = () => {
  setFileSections([...fileSections, {}]);
};

const removeFileSection = () => {
  setFileSections(fileSections.slice(0, -1));
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
          <div  onClick={() => handleNavigate('Portfoliopage')}>
            Portfolio
          </div>
          <div onClick={() => handleNavigate('Lightpages')}>Light Pages</div>
          <div className='sidebar-indicator' onClick={() => handleNavigate('Products')}>Products</div>
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
            <span className="cancel-pc-item" onClick={() => setIsActivedel(true)}>X</span>
          </div>
          {/* Add more portfolio content */}
        </div>
      </main>

      {modalActive && (
        <div className="modal-bg" onClick={handleModalClick}>
          <div className="portfoliopage-modal">
            <form action="" className='ppm-form'>
              <div className="form-subheading">
                <h2>Outer Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Title'/>
                <div className='file-section'>
                  <p>Upload desktop cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Enter Content'/>
                <input type="text" placeholder='Button title'/>
                <input type="text" placeholder='Button link'/>
                <select name="" id="">
                  <option value="" disabled selected hidden>Content type</option>
                  <option value="All">All</option>
                  <option value="Ebooks">Ebooks</option>
                  <option value="Service as product">Service as product</option>
                  <option value="Product solutions">Product solutions</option>
                  <option value="Ecourses">Ecourses</option>
                </select>
              </section>
              <div className="form-subheading">
                <h2>Headline</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <div className='file-section'>
                  <p>Upload headline cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Head title'/>
                <input type="text" placeholder='Sub title'/>
                <input type="text" placeholder='Button title'/>
                <input type="text" placeholder='Button link'/>
              </section>
              <div className="form-subheading">
                <h2>Features</h2>
                <span className="fs-line"></span>
              </div>


              <section className="form-input-sec">
                <input type="text" placeholder='Headline text'/>
                <section className='section-container'>
                  {fileSections.map((_, index) => (
                    <div key={index} className='file-sec'>
                        <div className='file-section'>
                          <p>Upload image</p>
                          <input type="file" />
                        </div>
                        <input type="text" placeholder='Sub title'/>
                        <input type="text" placeholder='Content'/>
                    </div>
                  ))}
                  <div className="manipulation-btns">
                    <span className="mb-1" onClick={addFileSection}>add</span>
                    <span className="mb-2" onClick={removeFileSection}>remove</span>
                  </div>
                </section>
              </section>

              <div className="form-subheading">
                <h2>More features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Headline text'/>
                <div className='file-section'>
                  <p>Upload cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Alt text'/>
                <input type="text" placeholder='sub title'/>
                <input type="text" placeholder='Button title'/>
                <input type="text" placeholder='Button link'/>
              </section>
              <div className="form-subheading">
                <h2>Testimonials</h2>
                <span className="fs-line"></span>
              </div>
              <section className='section-container'>
                  {fileSections.map((_, index) => (
                    <div key={index} className='form-input-sec'>
                      <input type="text" placeholder='Head title'/>
                      <input type="text" placeholder='Enter testimonial'/>
                    </div>
                  ))}
                  <div className="manipulation-btns">
                    <span className="mb-1" onClick={addFileSection}>add</span>
                    <span className="mb-2" onClick={removeFileSection}>remove</span>
                  </div>
                </section>

              <div className="form-subheading">
                <h2>Final punch</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Button title'/>
                <input type="text" placeholder='Button link'/>
              </section>
              <div className="form-btns">
                <button type="reset"  onClick={() => setIsActivedel(true)}>Delete</button>
                <button type="submit">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modal2Active && (
        <div className="modal2-bg" onClick={handleModal2Click}>
          <div className="portfoliopage-modal2">
            <form action="" className="ppm-form2">
            <div className="form-subheading">
                <h2>Outer Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Title'/>
                <div className='file-section'>
                  <p>Edit desktop cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Edit Content'/>
                <input type="text" placeholder='Edit Button title'/>
                <input type="text" placeholder='Edit Button link'/>
                <select name="" id="">
                  <option value="" disabled hidden selected>Content type</option>
                  <option value="All">All</option>
                  <option value="Ebooks">Ebooks</option>
                  <option value="Service as product">Service as product</option>
                  <option value="Product solutions">Product solutions</option>
                  <option value="Ecourses">Ecourses</option>
                </select>
              </section>
              <div className="form-subheading">
                <h2>Headline</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <div className='file-section'>
                  <p>Edit headline cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Edit Head title'/>
                <input type="text" placeholder='Edit Sub title'/>
                <input type="text" placeholder='Edit Button title'/>
                <input type="text" placeholder='Edit Button link'/>
              </section>
              <div className="form-subheading">
                <h2>Features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Edit Headline text'/>
                <div className='file-section'>
                  <p>Edit image</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Edit Sub title'/>
                <input type="text" placeholder='Edit Content'/>
              </section>
              <div className="form-subheading">
                <h2>More features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Edit Headline text'/>
                <div className='file-section'>
                  <p>Edit cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder='Edit Alt text'/>
                <input type="text" placeholder='Edit Button title'/>
                <input type="text" placeholder='Edit Button link'/>
              </section>
              <div className="form-subheading">
                <h2>Testimonials</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Edit Head title'/>
                <input type="text" placeholder='Edit testimonial'/>
              </section>
              <div className="form-subheading">
                <h2>Final punch</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder='Edit Button title'/>
                <input type="text" placeholder='Edit Button link'/>
              </section>
              <div className="form-btns">
                <button type="reset"  onClick={() => setIsActivedel(true)}>Delete</button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

    <div className={`delete-modal-bg ${isActivedel ? 'active' : ''}`}>
        <h1>
          Sure you want to delete content? 
        </h1>
        <div className="dm-btns">
          <span className='dm-btn1'  onClick={() => setIsActivedel(false)}>Yes</span>
          <span className='dm-btn2' onClick={() => setIsActivedel(false)}>No</span>
        </div>
      </div>
    </div>
  );
}

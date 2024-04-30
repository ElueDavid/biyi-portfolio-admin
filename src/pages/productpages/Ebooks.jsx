import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import pcimage from "../../images/Component 40.png";

export default function Ebooks() {
    const [modalActive, setModalActive] = useState(false);
    const [modal2Active, setModal2Active] = useState(false);
    const [wcsModalActive, setWcsModalActive] = useState(false);
    const [pdModalActive, setPdModalActive] = useState(false);

    const handleAddContentClick = () => {
        setModalActive(true);
        setModal2Active(false); // Deactivate modal2 if active
    };

    const handlePCNameClick = () => {
        setModal2Active(true);
        setModalActive(false); // Deactivate modal if active
    };

    const handleModalClick = () => {
        setModalActive(false);
    };

    const handleModal2Click = () => {
        setModal2Active(false);
    };

    const handleWcsModalClick = () => {
        setWcsModalActive(false);
    };

    const handlePdModalClick = () => {
        setPdModalActive(false);
    };

    const handleWcsSpanClick = () => {
        setWcsModalActive(true);
    };

    const handlePdSpanClick = () => {
        setPdModalActive(true);
    };

    return (
        <div className='p-category'>
            <h1 className="products-subheading">Ebooks</h1>
            <Link to="/Products" className='back-btn'>Back</Link>
            <main>
                <div className="add-content-btn" onClick={handleAddContentClick}>+ add content</div>
                <input type="search" placeholder='search content' className='search-input' />
                <div className="portfolio-contents">
                    <div className="portfolio-content">
                        <figure className='pc-image'>
                            <img src={pcimage} alt="" />
                        </figure>
                        <h4 className="pc-text-name" onClick={handlePCNameClick}>Ignormania</h4>
                        <span className="cancel-pc-item">X</span>
                        <span className="what-client-says" onClick={handleWcsSpanClick}>What client says..</span>
                        <span className="product-details" onClick={handlePdSpanClick}>Product details (BBB)</span>
                    </div>
                    {/* Add more portfolio content */}
                </div>
            </main>
            {modalActive && (
                <div className="modal-bg" onClick={handleModalClick}>
                    <div className="portfoliopage-modal">
                        <form action="" className='ppm-form'>
                            <input type="text" placeholder='Enter Content title ' />
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
                            <input type="text" placeholder='Edit Content title ' />
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

            {wcsModalActive && (
                <div className="wcs-modal-bg" onClick={handleWcsModalClick}>
                    <div className="wcs-modal">
                        <h3>What client says</h3>
                        <form action="" className="ppm-form">
                            <input type="text" placeholder='Client name ' />
                            <textarea name="" id="" cols="30" rows="10" className="Client's message.."></textarea>
                            <button type="submit">submit</button>
                        </form>
                    </div>
                </div>
            )}

            {pdModalActive && (
                <div className="pd-modal-bg" onClick={handlePdModalClick}>
                    <div className="pd-modal">
                        <h3>Product Details</h3>
                        <form action="" className="ppm-form">
                            <input type="text" placeholder='Title.. ' />
                            <textarea name="" id="" cols="30" rows="10" className="Content description.."></textarea>
                            <button type="submit">submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

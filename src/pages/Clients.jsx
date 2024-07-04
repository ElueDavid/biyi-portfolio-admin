import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import biyidp from "../images/biyid.png";
import pcimage from "../images/Component 40.png";

export default function Clients() {
    const navigate = useNavigate();
    const [isModalActive, setIsModalActive] = useState(false);

    const handleNavigate = (page) => navigate(`/${page}`);

    const handleRowClick = () => {
        setIsModalActive(true);
    };

    const handleCloseModal = () => {
        setIsModalActive(false);
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
                    <div onClick={() => handleNavigate('Lightpages')}>Light Pages</div>
                    <div onClick={() => handleNavigate('Products')}>Products</div>
                    <div className='sidebar-indicator' onClick={() => handleNavigate('Clients')}>Clients</div>
                </section>
            </div>
            <main>
                <h1>Clients</h1>
                <div className="table-space">
                    <table>
                        <thead>
                            <th>SN</th>
                            <th>EMAIL</th>
                            <th>PAGE SOURCE</th>
                            <th>TIME</th>
                        </thead>
                        <tbody>
                            <tr onClick={handleRowClick}>
                                <td>1</td>
                                <td>davieellue@gmail.com</td>
                                <td>lets talk</td>
                                <td>9:50pm</td>
                            </tr>
                            <tr onClick={handleRowClick}>
                                <td>2</td>
                                <td>davieellue@gmail.com</td>
                                <td>lets talk</td>
                                <td>5/7/23</td>
                            </tr>
                            <tr onClick={handleRowClick}>
                                <td>3</td>
                                <td>davieellue@gmail.com</td>
                                <td>light pages</td>
                                <td>9/12/23</td>
                            </tr>
                            <tr onClick={handleRowClick}>
                                <td>4</td>
                                <td>davieellue@gmail.com</td>
                                <td>products/learnmore</td>
                                <td>10/4/23</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <div className={`ps-modal-bg ${isModalActive ? 'active' : ''}`}>
                <div className="ps-modal">
                    <section className="psm-side1">
                        <h3>Email</h3>
                        <h3>Country</h3>
                        <h3>Service</h3>
                        <h3>Message</h3>
                    </section>
                    <section className="psm-side2">
                        <div className="pms-subheading">
                            <h2>page source title</h2>
                            <span className="pms-cancel" onClick={handleCloseModal}>X</span>
                        </div>
                        <div className="pst-details">
                            <div>davidelue@gmail.com</div>
                            <div>Senegal</div>
                            <div>
                                <span>presentation design</span>
                                <span>Branding</span>
                                <span>visual design</span>
                            </div>
                            <div>
                                <textarea name="" id="" placeholder='no info'></textarea>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

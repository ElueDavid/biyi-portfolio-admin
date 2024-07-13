import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import biyidp from "../images/biyid.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function Portfoliopage() {
  const navigate = useNavigate();
  useEffect(() => {
    getPortfolio();
  }, []);
  const handleNavigate = (page) => navigate(`/${page}`);
const [isLoading, setIsLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modal2Active, setModal2Active] = useState(false);
  const [isActivedel, setIsActivedel] = useState(false);
  const [fileSections, setFileSections] = useState([{}]);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [data, setData] = useState({
    title: "",
    type: "",
    alt: "",
    innerPageHeadlines: "",
    innerPageContent: "",
    alt2: "",
    buttonTitle: "",
    buttonLink: "",
    image: "",
    image2: "",
    innerPageImage: "",
    innerPages: [],
  });

  const token = sessionStorage.getItem("token");

  const handleImageContentChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddContentClick = () => {
    setModalActive(true);
    setModal2Active(false); // Deactivate modal2 if active
  };

  const handlePCNameClick = () => {
    setModal2Active(true);
    setModalActive(false); // Deactivate modal if active
  };

  const handleModalClick = (e) => {
    if (
      e.target.classList.contains("modal-bg") ||
      e.target.classList.contains("ppm-form")
    ) {
      setModalActive(false);
    }
  };

  const handleModal2Click = (e) => {
    if (
      e.target.classList.contains("modal2-bg") ||
      e.target.classList.contains("ppm-form2")
    ) {
      setModal2Active(false);
    }
  };

  const addFileSection = () => {
    setFileSections([...fileSections, {}]);
  };

  const removeFileSection = () => {
    setFileSections(fileSections.slice(0, -1));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   setIsLoading(true)
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("type", data.type);
    formdata.append("alt", data.alt);
    formdata.append("innerPageHeadlines", data.innerPageHeadlines);
    formdata.append("innerPageContent", data.innerPageContent);
    formdata.append("alt2", data.alt2);
    formdata.append("buttonTitle", data.buttonTitle);
    formdata.append("buttonLink", data.buttonLink);
    formdata.append("image", data.image);
    formdata.append("image2", data.image2);
    formdata.append("innerPageImage", data.innerPageImage);
    // data.innerPages.map((img, index) => (
    //   formdata.append(`innerPage[${index}]`, img.File)
    // ))
console.log(formdata)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/createPortfolio`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data) {
        console.log(res.data);
        setIsLoading(false)
        toast.success(res.data.message);
        setModalActive(false);
        setData({
          title: "",
          type: "",
          alt: "",
          innerPageHeadlines: "",
          innerPageContent: "",
          alt2: "",
          buttonTitle: "",
          buttonLink: "",
          image: "",
          image2: "",
          innerPageImage: "",
          innerPages: [],
        });
        getPortfolio();
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const handleAddAdditionalAction = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title2);
    formdata.append("hintA", data.hintA);
    formdata.append("contentA", data.contentA);
    formdata.append("hintB", data.hintB);
    formdata.append("contentB", data.contentB);
    formdata.append("image", image);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/addAdditionalAction/${id}`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data) {
        console.log(res.data);
        toast.success(res.data.message);
        setModal2Active(false);
        setData({
          title2: "",
          hintA: "",
          hintB: "",
          contentA: "",
          contentB: "",
        });
        setImage("");
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const getPortfolio = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/get-all-portfolio`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data) {
        console.log(res.data);
        setPortfolioItems(res.data.portfolioItems);
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message);
      setPortfolioItems([]);
    }
  };

  const handleAddActionClick = () => {
    setModal2Active(true);
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    const items = portfolioItems.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setPortfolioItems(items)
  }

  return (
    <div className="portfolio-page">
      <div className="side-bar">
        <div
          className="dp-space"
          onClick={() => handleNavigate("Portfoliopage")}
        >
          <figure>
            <img src={biyidp} alt="" />
          </figure>
          <h3>Hello 'Biyi</h3>
        </div>
        <section>
          <div
            className="sidebar-indicator"
            onClick={() => handleNavigate("Portfoliopage")}
          >
            Portfolio
          </div>
          <div onClick={() => handleNavigate("Lightpages")}>Light Pages</div>
          <div onClick={() => handleNavigate("Products")}>Products</div>
        </section>
      </div>
      <main>
        <div className="add-content-btn" onClick={handleAddContentClick}>
          + add content
        </div>
        <input
          type="search"
          placeholder="search content"
          className="search-input"
          value={inputValue}
          onChange={(e) => handleSearch(e)}
        />
        <div className="portfolio-contents">
          {portfolioItems ? (
            portfolioItems.map((data, index) => (
              <div
                className="portfolio-content"
                key={index}
                onClick={() => {
                  setId(data._id);
                }}
              >
                <figure className="pc-image">
                  <img src={data.image} alt="" />
                </figure>
                <h4 className="pc-text-name" onClick={handlePCNameClick}>
                  {data.title}
                </h4>
                <span
                  className="cancel-pc-item"
                  onClick={() => setIsActivedel(true)}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: "italic", color: "white" }}>
              No content, Please add one
            </p>
          )}
          {/* Add more portfolio content */}
        </div>
      </main>
      {modalActive && (
        <div className="modal-bg" onClick={handleModalClick}>
          <div className="portfoliopage-modal">
            <form
              action=""
              className="ppm-form"
              onSubmit={handleFormSubmit}
            >
              <div className="form-subheading">
                <h2>Outer Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input
                  type="text"
                  placeholder="Title"
                  value={data.title}
                  required
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                <div className="file-section">
                  <p>Upload Desktop visual Cover</p>
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setData({ ...data, image: e.target.files[0] })
                    }
                  />
                </div>
                <div className="file-section">
                  <p>Upload desktop banner visual</p>
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setData({ ...data, image2: e.target.files[0] })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Alt text"
                  value={data.alt}
                  required
                  onChange={(e) => setData({ ...data, alt: e.target.value })}
                />
              </section>
              <select
                name=""
                id=""
                className="portfolio-select"
                value={data.type}
                required
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option value="Portfolio type" >
                  Portfolio type
                </option>
                <option value="Product Design">Product Design</option>
                <option value="Brand identitity & strategy">Brand identitity & strategy</option>
              </select>
              <div className="form-subheading">
                <h2>Inner Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <div className="file-section">
                  <p>Upload desktop inner banner</p>
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setData({ ...data, innerPageImage: e.target.files[0] })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Headline"
                  value={data.innerPageHeadlines}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerPageHeadlines: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter content"
                  value={data.innerPageContent}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerPageContent: e.target.value })
                  }
                />
                <section className="section-container">
                  {fileSections.map((_, index) => (
                    <div key={index} className="file-section">
                      <p>Upload desktop inner visual</p>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          const newInnerPages = [...data.innerPages];
                          newInnerPages[index] = e.target.files[0];
                          setData({ ...data, innerPages: newInnerPages });
                        }}
                      />
                    </div>
                  ))}
                  <div className="manipulation-btns">
                    <span className="mb-1" onClick={addFileSection}>
                      add
                    </span>
                    <span className="mb-2" onClick={removeFileSection}>
                      remove
                    </span>
                  </div>
                </section>
                <input
                  type="text"
                  placeholder="Alt text"
                  value={data.alt2}
                  required
                  onChange={(e) => setData({ ...data, alt2: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="button title"
                  value={data.buttonTitle}
                  required
                  onChange={(e) =>
                    setData({ ...data, buttonTitle: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="button link"
                  value={data.buttonLink}
                  required
                  onChange={(e) =>
                    setData({ ...data, buttonLink: e.target.value })
                  }
                />
              </section>
              <div className="form-btns">
                <button type="reset" className="hidden" onClick={() => setIsActivedel(true)}>
                  Delete
                </button>
                <button type="submit">{isLoading ? "loading..." : "Publish"}</button>
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
                <input type="text" placeholder="Edit Title" />
                <div className="file-section">
                  <p>Edit Desktop visual banner</p>
                  <input type="file" />
                </div>
                <div className="file-section">
                  <p>Edit Desktop visual Cover</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit Alt text" />
              </section>
              <div className="form-subheading">
                <h2>Inner Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <div className="file-section">
                  <p>Edit desktop inner banner</p>
                  <input type="file" />
                </div>
                <div className="file-section">
                  <p>Edit desktop inner visual 1</p>
                  <input type="file" />
                </div>
                <div className="file-section">
                  <p>Edit desktop inner visual 2</p>
                  <input type="file" />
                </div>
                <div className="file-section">
                  <p>Edit desktop inner visual 3</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit content" />
                <input type="text" placeholder="Edit Alt text" />
                <input type="text" placeholder="Edit Headline" />
                <input type="text" placeholder="Edit button title" />
                <input type="text" placeholder="Edit button link" />
              </section>
              <div className="form-btns">
                <button type="reset" onClick={() => setIsActivedel(true)}>
                  Delete
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={`delete-modal-bg ${isActivedel ? "active" : ""}`}>
        <h1>Sure you want to delete content?</h1>
        <div className="dm-btns">
          <span className="dm-btn1" onClick={() => setIsActivedel(false)}>
            Yes
          </span>
          <span className="dm-btn2" onClick={() => setIsActivedel(false)}>
            No
          </span>
        </div>
      </div>
    </div>
  );
}

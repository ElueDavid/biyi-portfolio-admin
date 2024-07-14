import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import biyidp from "../images/biyid.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function Products() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({
    title: "",
    type: "",
    content: "",
    buttonTitle: "",
    buttonLink: "",
    headlinesTitle: "",
    headlinesSubtitle: "",
    headlinesBtn: "",
    headlinesBtnLink: "",
    featuresText: "",
    featuresContent: "",
    moreFeaturesText: "",
    moreFeaturesAltText: "",
    moreFeaturesBtnLink: "",
    moreFeaturesSubTitle: "",
    testimonyTitle: "",
    testimonyContent: "",
    punchTitle: "",
    punchBtn: "",
    image: "",
    headlinesHeadlineImage: "",
    moreFeaturesMoreFeaturesImage: "",
    featuresImages: "",
    featuresImages2: "",
    features: [],
    testimonials: [],
  });
  useEffect(() => {
    getProducts();
  }, []);
  const token = sessionStorage.getItem("token");

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

  const [isActivedel, setIsActivedel] = useState(false);
  const [fileSections, setFileSections] = useState([{}]);

  const clearState = () => {
    setData({
      title: "",
      type: "",
      content: "",
      buttonTitle: "",
      buttonLink: "",
      headlinesTitle: "",
      headlinesSubtitle: "",
      headlinesBtn: "",
      headlinesBtnLink: "",
      moreFeaturesText: "",
      moreFeaturesAltText: "",
      moreFeaturesBtnLink: "",
      moreFeaturesSubTitle: "",
      punchTitle: "",
      punchBtn: "",
      image: "",
      headlinesHeadlineImage: "",
      moreFeaturesMoreFeaturesImage: "",
      featuresImages: "",
      featuresImages2: "",
      features: [],
      testimonials: [],
    });
    setFile("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("type", data.type);
    formdata.append("content", data.content);
    formdata.append("buttonTitle", data.buttonTitle);
    formdata.append("buttonLink", data.buttonLink);
    formdata.append(
      "headlines",
      JSON.stringify({
        headlineTitle: data.headlinesTitle,
        headlineSubtitle: data.headlinesSubtitle,
        headlineButtonTitle: data.headlinesBtn,
        headlineButtonLink: data.headlinesBtnLink,
      })
    );
    formdata.append("features", JSON.stringify(data.features));
    formdata.append(
      "moreFeatures",
      JSON.stringify({
        moreFeaturesHeadlineText: data.moreFeaturesText,
        moreFeaturesAltText: data.moreFeaturesAltText,
        moreFeaturesSubtitle: data.moreFeaturesSubTitle,
        moreFeaturesButtonLink: data.moreFeaturesBtnLink,
      })
    );
    formdata.append("testimony", JSON.stringify(data.testimonials));
    formdata.append(
      "punch",
      JSON.stringify({
        buttonTitle: data.punchTitle,
        buttonLink: data.punchBtn,
      })
    );
    formdata.append("image", data.image);
    formdata.append("headlinesHeadlineImage", data.headlinesHeadlineImage);
    formdata.append(
      "moreFeaturesMoreFeaturesImage",
      data.moreFeaturesMoreFeaturesImage
    );
    formdata.append("featuresImages", data.featuresImages);
    formdata.append("featuresImages2", data.featuresImages2);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/createProduct`,
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
        getProducts();
        clearState();
        setModalActive(false);
      }
    } catch (error) {
      clearState();
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const handleAddWhyBBB = async (e) => {
    e.preventDefault();
    console.log(id);
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("image", file);
    console.log(data.title, file, data.type, data.content);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/addWHyBBB/${id}`,
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
        setData({
          title: "",
          type: "",
          content: "",
        });
        setFile("");
        setModal2Active(false);
      }
    } catch (error) {
      setData({
        title: "",
        type: "",
        content: "",
      });
      setFile("");
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/getAllProductItems`
      );
      if (res.data) {
        setProducts(res.data.ProductItems);
        console.log(res.data.ProductItems);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  const handleAddWhyBBBClick = () => {
    setModal2Active(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFeatures = data.features.map((feature, idx) =>
      index === idx ? { ...feature, [name]: value } : feature
    );
    setData({ ...data, features: updatedFeatures });
  };

  const handleAddFeature = () => {
    setData({ ...data, features: [...data.features, {}] });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = data.features.filter((_, idx) => index !== idx);
    setData({ ...data, features: updatedFeatures });
  };

  const handleTestimonialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestimonials = data.testimonials.map((testimonial, idx) =>
      index === idx ? { ...testimonial, [name]: value } : testimonial
    );
    setData({ ...data, testimonials: updatedTestimonials });
  };

  const handleAddTestimonial = () => {
    setData({ ...data, testimonials: [...data.testimonials, {}] });
  };

  const handleRemoveTestimonial = (index) => {
    const updatedTestimonials = data.testimonials.filter(
      (_, idx) => index !== idx
    );
    setData({ ...data, testimonials: updatedTestimonials });
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    const items = products.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setProducts(items)
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
          <div onClick={() => handleNavigate("Portfoliopage")}>Portfolio</div>
          <div onClick={() => handleNavigate("Lightpages")}>Light Pages</div>
          <div
            className="sidebar-indicator"
            onClick={() => handleNavigate("Products")}
          >
            Products
          </div>
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
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                className="portfolio-content"
                key={index}
                onClick={() => {
                  setId(product._id);
                }}
              >
                <figure className="pc-image">
                  <img src={product.image} alt="" />
                </figure>
                <h4 className="pc-text-name">{product.title}</h4>
                <span className="cancel-pc-item">X</span>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: "italic", color: "white" }}>
              No content, Please add one
            </p>
          )}
        </div>
      </main>

      {modalActive && (
        <div className="modal-bg" onClick={handleModalClick}>
          <div className="portfoliopage-modal">
            <form action="" className="ppm-form" onSubmit={handleFormSubmit}>
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
                  <p>Upload desktop cover visual</p>
                  <input type="file" required onChange={(e) => setData({ ...data, image: e.target.files[0] })}/>
                </div>
                <input type="text" placeholder="Enter Content" required value={data.content} onChange={(e) => setData({ ...data, content: e.target.value })} />
                <input type="text" placeholder="Button title" required value={data.buttonTitle} onChange={(e) => setData({ ...data, buttonTitle: e.target.value })}/>
                <input type="text" placeholder="Button link" required value={data.buttonLink} onChange={(e) => setData({ ...data, buttonLink: e.target.value })}/>
                <select name="" id="" required value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })}>
                  <option value="" disabled selected hidden>
                    Content type
                  </option>
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
                <div className="file-section">
                  <p>Upload headline cover visual</p>
                  <input type="file" required onChange={(e) => setData({ ...data, headlinesHeadlineImage: e.target.files[0] })}/>
                </div>
                <input type="text" required placeholder="Head title" value={data.headlinesTitle} onChange={(e) => setData({ ...data, headlinesTitle: e.target.value })}/>
                <input type="text" required placeholder="Sub title" value={data.headlinesSubtitle} onChange={(e) => setData({ ...data, headlinesSubtitle: e.target.value })}/>
                <input type="text" required placeholder="Button title" value={data.headlinesBtn} onChange={(e) => setData({ ...data, headlinesBtn: e.target.value })}/>
                <input type="text" required placeholder="Button link" value={data.headlinesBtnLink} onChange={(e) => setData({ ...data, headlinesBtnLink: e.target.value })}/>
              </section>
              <div className="form-subheading">
                <h2>Features</h2>
                <span className="fs-line"></span>
              </div>

              <section
                className="form-input-sec"
                style={{ marginBottom: "30px" }}
              >
                <input
                  type="text"
                  placeholder="Clcick button below to add features"
                  disabled
                  style={{ marginBottom: "20px" }}
                />
                {data.features.map((feature, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="title"
                      value={feature.title || ""}
                      onChange={(e) => handleFeatureChange(index, e)}
                      placeholder="Feature Title"
                    />
                    <input
                      type="text"
                      name="description"
                      value={feature.description || ""}
                      onChange={(e) => handleFeatureChange(index, e)}
                      placeholder="Feature Description"
                    />
                    <button
                      className="removeBtn"
                      style={{
                        backgroundColor: "red",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "10px",
                        cursor: "pointer",
                        margin: "15px 0",
                        width: 25,
                        height: 25,
                        borderColor: "red",
                        fontColor: "white",
                      }}
                      onClick={() => handleRemoveFeature(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
                <span className="addBtn" onClick={handleAddFeature}>
                  Add Feature
                </span>
              </section>

              <div className="form-subheading">
                <h2>More features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Headline text" required value={data.moreFeaturesText} onChange={(e) => setData({ ...data, moreFeaturesText: e.target.value })}/>
                <div className="file-section">
                  <p>Upload cover visual</p>
                  <input type="file" required onChange={(e) => setData({ ...data, moreFeaturesMoreFeaturesImage: e.target.files[0] })}/>
                </div>
                <input type="text" resource="" placeholder="Alt text" value={data.moreFeaturesAltText} onChange={(e) => setData({ ...data, moreFeaturesAltText: e.target.value })}/>
                <input type="text" required placeholder="sub title" value={data.moreFeaturesSubTitle} onChange={(e) => setData({ ...data, moreFeaturesSubTitle: e.target.value })}/>
                {/* <input type="text" placeholder="Button title" value={data.moreFeaturesBtnLink} onChange={(e) => setData({ ...data, moreFeaturesBtnLink: e.target.value })} /> */}
                <input type="text" required placeholder="Button link" value={data.moreFeaturesBtnLink} onChange={(e) => setData({ ...data, moreFeaturesBtnLink: e.target.value })}/>
              </section>
              <div className="form-subheading">
                <h2>Testimonials</h2>
                <span className="fs-line"></span>
              </div>
              <section className="section-container">
                <input type="text"                   placeholder="Click button below to add testimonial" disabled />

                {data.testimonials.map((testimonial, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="author"
                      value={testimonial.author || ""}
                      onChange={(e) => handleTestimonialChange(index, e)}
                      placeholder="Testimonial Author"
                    />
                    <input
                      type="text"
                      name="quote"
                      value={testimonial.quote || ""}
                      onChange={(e) => handleTestimonialChange(index, e)}
                      placeholder="Testimonial Quote"
                    />
                    <button
                      className="removeBtn"
                      style={{
                        backgroundColor: "red",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "10px",
                        cursor: "pointer",
                        margin: "15px 0",
                        width: 25,
                        height: 25,
                        borderColor: "red",
                        fontColor: "white",
                      }}
                      onClick={() => handleRemoveTestimonial(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
                <div className="manipulation-btns">
                  <span className="mb-1" onClick={handleAddTestimonial}>
                    Add Testimonial
                  </span>
                </div>
              </section>

              <div className="form-subheading">
                <h2>Final punch</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Button title" value={data.punchTitle} onChange={(e) => setData({ ...data, punchTitle: e.target.value })} />
                <input type="text" placeholder="Button link" value={data.punchBtn} onChange={(e) => setData({ ...data, punchBtn: e.target.value })}/>
              </section>
              <div className="form-btns">
                <button type="reset" onClick={() => setIsActivedel(true)}>
                  Delete
                </button>
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
                <input type="text" placeholder="Title" />
                <div className="file-section">
                  <p>Edit desktop cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit Content" />
                <input type="text" placeholder="Edit Button title" />
                <input type="text" placeholder="Edit Button link" />
                <select name="" id="">
                  <option value="" disabled hidden selected>
                    Content type
                  </option>
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
                <div className="file-section">
                  <p>Edit headline cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit Head title" />
                <input type="text" placeholder="Edit Sub title" />
                <input type="text" placeholder="Edit Button title" />
                <input type="text" placeholder="Edit Button link" />
              </section>
              <div className="form-subheading">
                <h2>Features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Edit Headline text" />
                <div className="file-section">
                  <p>Edit image</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit Sub title" />
                <input type="text" placeholder="Edit Content" />
              </section>
              <div className="form-subheading">
                <h2>More features</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Edit Headline text" />
                <div className="file-section">
                  <p>Edit cover visual</p>
                  <input type="file" />
                </div>
                <input type="text" placeholder="Edit Alt text" />
                <input type="text" placeholder="Edit Button title" />
                <input type="text" placeholder="Edit Button link" />
              </section>
              <div className="form-subheading">
                <h2>Testimonials</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Edit Head title" />
                <input type="text" placeholder="Edit testimonial" />
              </section>
              <div className="form-subheading">
                <h2>Final punch</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Edit Button title" />
                <input type="text" placeholder="Edit Button link" />
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

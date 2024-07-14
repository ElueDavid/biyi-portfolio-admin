import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import biyidp from "../images/biyid.png";
import pcimage from "../images/Component 40.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function Lightpages() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lightpages, setLightPages] = useState([]);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
    innerContent: "",
    innerAlt: "",
  });
  // images", fileInput.files[0], "[PROXY]");
  //     formdata.append("images", fileInput.files[0], "[PROXY]");
  //     formdata.append("images", fileInput.files[0], "[PROXY]");
  //     formdata.append("innerContent", "innerconnect");
  //     formdata.append("innerAlt"
  useEffect(() => {
    getLightPages();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };
  const token = sessionStorage.getItem("token");
  const handleNavigate = (page) => navigate(`/${page}`);

  const [modalActive, setModalActive] = useState(false);
  const [modal2Active, setModal2Active] = useState(false);

  const handleAddContentClick = () => {
    setModalActive(true);
    setModal2Active(false); // Deactivate modal2 if active
  };

  // const handlePCNameClick = () => {
  //   setModal2Active(true);
  //   setModalActive(false); // Deactivate modal if active
  // };

  const handlePCNameClick = (
    title,
    content,
    image,
    id,
    innerAlt,
    innerconnect,
    image2,
    image3
  ) => {
    setModal2Active(true);
    setIsUpdate(true);
    setData({
      title: title,
      content: content,
      innerContent: innerconnect,
      innerAlt: innerAlt,
    });
    setFile(image);
    setFile2(image2);
    setFile3(image3);
    setId(id);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("images", file);
    formdata.append("images", file2);
    formdata.append("images", file3);
    formdata.append("innerContent", data.innerContent);
    formdata.append("innerAlt", data.innerAlt);
    console.log(formdata);
    if (isUpdate) {
      setIsLoading(true)
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BASEURL}/updateLightPageById/${id}`,
          formdata,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.data) {
          setIsLoading(false)
          toast.success(res.data.message);
          setModal2Active(false);
          setData({
            title: "",
            content: "",
            innerAlt: "",
            innerContent: "",
          });
          setFile("");
          setFile2("");
          setFile3("");
          getLightPages();
        }
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.error || error.response.data.message);
      }
    } else {
      setIsLoading(true)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASEURL}/createLightPage`,
          formdata,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (res.data) {
          setIsLoading(false)
          toast.success(res.data.message);
          setModalActive(false);
          setData({
            title: "",
            content: "",
            innerAlt: "",
            innerContent: "",
          });
          setFile("");
          setFile2("");
          setFile3("");
          getLightPages();
        }
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.error || error.response.data.message);
      }
    }
  };

  const getLightPages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/getLightPage`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data) {
        console.log(res.data.lightPage);
        setLightPages(res.data.lightPage);
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const deleteLightPages = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASEURL}/deleteLightPageById/${id}`,
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
          title: "",
          content: "",
          innerAlt: "",
          innerContent: "",
        });
        setFile("");
        setFile2("");
        setFile3("");
        getLightPages();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    const items = lightpages.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setLightPages(items)
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
          <div
            className="sidebar-indicator"
            onClick={() => handleNavigate("Lightpages")}
          >
            Light Pages
          </div>
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
          {lightpages ? (
            lightpages.map((data, index) => (
              <div
                className="portfolio-content"
                key={index}
                onClick={() =>
                  handlePCNameClick(
                    data.title,
                    data.content,
                    data.image,
                    data._id,
                    data.innerPage?.alt,
                    data.innerPage?.content,
                    data.innerPage?.innerImage,
                    data.innerPage?.innerImage2
                  )
                }
              >
                <figure className="pc-image">
                  <img src={data.image} alt="" />
                </figure>
                <h4 className="pc-text-name" onClick={handlePCNameClick}>
                  {data.title}
                </h4>
                <span
                  className="cancel-pc-item"
                  onClick={() => {setIsActivedel(true); setId(data._id)}}
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
                  <p>Upload visual Cover</p>
                  <input
                    type="file"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Content"
                  value={data.content}
                  required
                  onChange={(e) =>
                    setData({ ...data, content: e.target.value })
                  }
                />
              </section>
              <div className="form-subheading">
                <h2>Inner Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <div className="file-section">
                  <p>Upload inner visual</p>
                  <input
                    type="file"
                    required
                    onChange={(e) => setFile2(e.target.files[0])}
                  />
                </div>
                <div className="file-section">
                  <p>Upload content file</p>
                  <input
                    type="file"
                    required
                    onChange={(e) => setFile3(e.target.files[0])}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter content"
                  value={data.innerContent}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerContent: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Alt text"
                  value={data.innerAlt}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerAlt: e.target.value })
                  }
                />
              </section>
              <div className="form-btns">
                <button type="submit">{isLoading? "loading.." : "Publish"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modal2Active && (
        <div className="modal2-bg" onClick={handleModal2Click}>
          <div className="portfoliopage-modal2">
            <form action="" className="ppm-form2" onSubmit={handleFormSubmit}>
              <div className="form-subheading">
                <h2>Edit Outer Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
                <input type="text" placeholder="Edit Title"  value={data.title} required
                  onChange={(e) => setData({ ...data, title: e.target.value })}/>
                <div className="file-section">
                  <p>Edit visual Cover</p>
                  <input type="file" required  onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <input type="text" placeholder="Edit content" required value={data.content}
                  onChange={(e) =>
                    setData({ ...data, content: e.target.value })
                  }/>
              </section>
              <div className="form-subheading">
                <h2>Edit Inner Page</h2>
                <span className="fs-line"></span>
              </div>
              <section className="form-input-sec">
              <div className="file-section">
                  <p>Upload inner visual</p>
                  <input
                    type="file"
                    required
                    onChange={(e) => setFile2(e.target.files[0])}
                  />
                </div>
                <div className="file-section">
                  <p>Upload content file</p>
                  <input
                    type="file"
                    required
                    onChange={(e) => setFile3(e.target.files[0])}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter content"
                  value={data.innerContent}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerContent: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Alt text"
                  value={data.innerAlt}
                  required
                  onChange={(e) =>
                    setData({ ...data, innerAlt: e.target.value })
                  }
                />
              </section>
              <div className="form-btns">
                <button type="reset" onClick={deleteLightPages}>
                  Delete
                </button>
                <button type="submit">{isLoading? "loading..." : "Edit"}</button>
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

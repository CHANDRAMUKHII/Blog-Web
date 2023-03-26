import React from "react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "./images/image.png";
import NavBar from "./NavBar";

import "./styles/BlogCard.css";

const BlogCard = () => {
  const navigate = useNavigate();
  const [childData, setChildData] = useState("");
  const [data, setData] = useState([]);
 
  const handleChildData = (dataFromChild) => {
    setChildData(dataFromChild);
  };
  function viewHandler(event, id) {
    event.preventDefault();
    navigate(`/path/${id}`);
  }
  useEffect(() => {
    axios
      .post("http://localhost:3000/find", { title: childData })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [childData]);

  return (
    <Fragment>
      <NavBar onChildData={handleChildData} />
      <div className="post-wrapper">
        {data.map((d) => {
          return (
            <div className="card">
              <img src={image} alt="post_img" />
              <div className="card-body">
                <h2>{d.title}</h2>
                <p>{d.content.slice(0, 150)}...</p>
                <h5 onClick={(event) => viewHandler(event, d._id)}>
                  READ MORE..
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default BlogCard;

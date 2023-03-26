import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './styles/DisplayPost.css'
import image from './images/image.png'
import Nav from "./Nav";
const DisplayPost = () => {
  const [display, setDisplay] = useState();
const {id}=useParams();
  useEffect(() => {
    axios
      .post(`http://localhost:3000/find/${id}`)
      .then((response) => setDisplay(response.data))
      .catch((error) => console.log(error));
  },[id]);

  return (<div className="wrapper">
<Nav/>
{display ? (<div className="card-display"><img src={image} alt={display[0].title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{display[0].title}</h2>
        <p className="card-text">{display[0].content}</p>
      </div></div>):(<div>loading ... </div>)}

</div>);
};

export default DisplayPost;

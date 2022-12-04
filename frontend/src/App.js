import CustomNavbar from "./components/customNavbar/customNavbar";
import CustomButton from "./components/customButton/customButton";
import saltbae from "./assets/saltbae.png";
import CustomImage from "./components/customImage/customImage";
import "./App.scss"
import React, { useState } from 'react'

import { SocialIcon } from 'react-social-icons'

import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import Axios from "axios";




function App() {
  /////
  const [width, setWindowWidth] = useState(0);
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }


  const [description2, setDescription] = useState("");
  let file2


  function handleSubmit() {
    var bodyFormData = new FormData();
    bodyFormData.append('description', description2);
    bodyFormData.append('file',file2)

    Axios({
      method: "POST",
      url: "http://localhost:5000/memes/",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyNTAxIiwiaWF0IjoxNjcwMTAyODcwfQ.KAyjKrKeF4D3iz3CjZzuf2C5Z9AqD64zygnHORuwUEw",
      },
      data: bodyFormData
    }).then(res => {
      console.log(res.data.message);
    });
  }





  return (
    <div className="appdiv">
      <div className="nav">
        <CustomNavbar/>
      </div>

      <div className="landing-page">
        <div className="para1">
          <h1>Partajarea de meme-uri nu a fost niciodată mai simplă!</h1>
          <p>Platforma ideală pentru studenții de la Politehnică,
            amuzați de câte materii o să pice semestrul asta.</p>
          <a href="#meme"><CustomButton text="Upload a MEME"/></a>
        </div>
        <div>
          <img src={saltbae} className="saltbae-picture"/>
        </div>
      </div>


      <div className="meme-form" id="meme">
        <div className="form-box"> 
          <div className="form-text">
            <h1>Ai tupeu și crezi că ești amuzant?</h1>
            <p>Trimite-ne un mail și poate ai noroc să ne apuce râsul când îți vedem meme-ul.</p>
          </div>

          <div className="form-form">
            <form onSubmit={handleSubmit}>
              <label>
                <h2>Descriere</h2>
                <br />
                <input type="text" name="desc" placeholder="descriere"
                       value={description2}
                       onChange={(e) => setDescription(e.target.value)}/>
              </label>
              <br />
              <label>
                <h2>Meme (jpg, jpeg, png, gif)</h2>
                <label for="file-upload" className="bigbox">
                  drag & drop image or click to upload
                </label>

                <br />
                <input type="file"  id="file-upload"
                        accept=".jpg, .jpeg, .png, .gif" 
                        placeholder="drag & drop image or click to upload"
                       value={file2}
                       onChange={(e) => {file2 = e.target.files[0]}}/>
                
              </label>
              <br />
              <input type="submit" value="Trimite"/>
            </form>
          </div>
        </div>
      </div>

      <div className="most-viewed">
        <h1>Most viewed</h1>
        <div className="images-memes">
          <CustomImage picture={img1}/>
          <CustomImage picture={img2}/>
          <CustomImage picture={img3}/>
        </div>
      </div>

      <div className="footer">
        <div className="social-media">
          <a href="https://www.instagram.com/lsacbucuresti/">
            <SocialIcon network="instagram" fgColor="#FFFFFF" bgColor="#06114F" />
          </a>
          <a href="https://www.twitch.tv/lsac_bucuresti">
            <SocialIcon network="twitch" fgColor="#FFFFFF" bgColor="#06114F" />
          </a>
          <a href="https://www.facebook.com/LsacBucuresti/">
            <SocialIcon network="facebook"  fgColor="#FFFFFF" bgColor="#06114F" />
          </a>
        </div>
        <div className="footer-text">
          <h2>Copyright 2022 | La muncă, nu la întins mâna.</h2>
        </div>
      </div>
      

      

    </div>
  );
}

export default App;

import CustomNavbar from "./components/customNavbar/customNavbar";
import CustomButton from "./components/customButton/customButton";
import saltbae from "./assets/saltbae.png";
import CustomImage from "./components/customImage/customImage";
import "./App.scss"
import React, {useEffect, useState} from 'react'

import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";

import insta from "./assets/insta.png";
import twitch from "./assets/twitch.png";
import facebook from "./assets/facebook.png";

import Axios from "axios";


function App() {

  const [description2, setDescription] = useState("");
  let file2
  let file2_aux
  const [memeData, setMemeData] = useState(Array());
  async function test() {
    await Axios({
      method: "GET",
      url: "http://localhost:5000/memes/",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
      console.log(res.data);
      setMemeData(res.data)
    })
  }

  useEffect(() => {
    test()
  }, []);


  function handleSubmit(event) {
    event.preventDefault()
    const bodyFormData = new FormData();
    bodyFormData.append('description', description2);
    bodyFormData.append('file', file2)

    Axios({
      method: "POST",
      url: "http://localhost:5000/memes/",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "token": localStorage.getItem("token"),
      },
      data: bodyFormData
    }).then(res => {
      console.log(res.data.message);

    });
  }

  ///////////////////
  let path = ''

  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState(null)
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
            <img src={saltbae} className="saltbae-picture" alt="saltbae"/>
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
                  <br/>
                  <input type="text" name="desc" placeholder="descriere" required
                         value={description2}
                         onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <br/>
                <label>
                  <h2>Meme (jpg, jpeg, png, gif)</h2>
                  <label htmlFor="file-upload" className={isActive ? 'bigbox form-place-holder' : 'bigbox form-place-holder-no'}>
                    drag & drop image or click to upload
                  </label>

                  <br/>
                  <input type="file" id="file-upload" required
                         accept=".jpg, .jpeg, .png, .gif"
                         placeholder="drag & drop image or click to upload"
                         value={file2}
                         onChange={(e) => {
                           file2 = e.target.files[0]
                         }}/>

                </label>
                <br/>
                <button type="submit">Trimite</button>
              </form>
            </div>
          </div>
        </div>

        <div className="most-viewed">
          <h1>Most viewed</h1>
          <div className="images-memes">
            {memeData.map((meme, index) => {
              return (
                  <CustomImage key={index} picture = {"http://localhost:5000/" + meme.path} description = {meme.description} author = {meme.creatorName}/>
              );
            })}
          </div>
        </div>


        <div className="footer">
          <div className="social-media">
            <a href="https://www.instagram.com/lsacbucuresti/">
              <img src={insta} className="miniSocial" alt="saltbae"/>
            </a>
            <a href="https://www.twitch.tv/lsac_bucuresti">
              <img src={twitch} className="miniSocial" alt="saltbae"/>
            </a>
            <a href="https://www.facebook.com/LsacBucuresti/">
              <img src={facebook} className="miniSocial" alt="saltbae"/>
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

import "./customNavbar.scss"
import CustomButton from "../customButton/customButton.jsx"
import logo from "../../assets/logo.png";

import React, {useState} from 'react';
import Modal from 'react-modal';

import logo2 from "../../assets/logo.png";

import square from "../../assets/9square.png";
import xbutton from "../../assets/xButton.png";
import Axios from "axios";



Modal.setAppElement('#root');

function CustomNavbar(props) {


    // let LOGIN_TOKEN = null;
    //localStorage.setitem("token",null)


    const [modalIsOpen_menu, setIsOpen_menu] = React.useState(false);


    let buttons;
    const [isLoggedIn, setLoginAction] = React.useState(false);
    function loginAction() {
        setLoginAction(true);
    }
    function logoutAction() {
        setLoginAction(false);
        window.localStorage.setItem("token",'')
    }
    /////////
    const [emailRegister1, setEmailRegister1] = useState("");
    const [usernameRegister1, setUsernameRegister1] = useState("");
    const [passwordRegister1, setPasswordRegister1] = useState("");

    const [emailRegister2, setEmailRegister2] = useState("");
    const [usernameRegister2, setUsernameRegister2] = useState("");
    const [passwordRegister2, setPasswordRegister2] = useState("");

    function handleSubmitRegister1(event) {
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('email', emailRegister1);
        bodyFormData.append('username', usernameRegister1);
        bodyFormData.append('password', passwordRegister1);
        Axios({
            method: "POST",
            url: "http://localhost:5000/auth/register",
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyNTAxIiwiaWF0IjoxNjcwMTAyODcwfQ.KAyjKrKeF4D3iz3CjZzuf2C5Z9AqD64zygnHORuwUEw",
            },
            data: bodyFormData
        }).then(res => {
            console.log(res.data.message);
        });
        setEmailRegister1("")
        setUsernameRegister1("")
        setPasswordRegister1("")
        document.getElementById("r1").reset();
        document.querySelector('#register1').close()
        // loginAction()
    }
    function handleSubmitRegister2(event) {
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('email', emailRegister2);
        bodyFormData.append('username', usernameRegister2);
        bodyFormData.append('password', passwordRegister2);
        Axios({
            method: "POST",
            url: "http://localhost:5000/auth/register",
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyNTAxIiwiaWF0IjoxNjcwMTAyODcwfQ.KAyjKrKeF4D3iz3CjZzuf2C5Z9AqD64zygnHORuwUEw",
            },
            data: bodyFormData
        }).then(res => {
            console.log(res.data.message);
        });
        setEmailRegister2("")
        setUsernameRegister2("")
        setPasswordRegister2("")
        document.getElementById("r2").reset();
        document.querySelector('#register2').close()
        // loginAction()
    }
    ///////////////
    const [usernameLogin1, setUsernameLogin1] = useState("");
    const [passwordLogin1, setPasswordLogin1] = useState("");

    const [usernameLogin2, setUsernameLogin2] = useState("");
    const [passwordLogin2, setPasswordLogin2] = useState("");

    function handleSubmitLogin1(event) {
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('username', usernameLogin1);
        bodyFormData.append('password', passwordLogin1);
        Axios({
            method: "POST",
            url: "http://localhost:5000/auth/login",
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyNTAxIiwiaWF0IjoxNjcwMTAyODcwfQ.KAyjKrKeF4D3iz3CjZzuf2C5Z9AqD64zygnHORuwUEw",
            },
            data: bodyFormData
        }).then(res => {
            if(res.status === 200) {
                console.log(res.data.token);
                // LOGIN_TOKEN = res.data.token;
                localStorage.setItem("token",res.data.token)
                document.querySelector('#login1').close()
                loginAction()
            } else {
                console.log(res.data.message);
            }
        });
        setUsernameLogin1("")
        setPasswordLogin1("")
        document.getElementById("l1").reset();
        document.querySelector('#login1').close()
        //loginAction()
    }
    function handleSubmitLogin2(event) {
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('username', usernameLogin2);
        bodyFormData.append('password', passwordLogin2);
        Axios({
            method: "POST",
            url: "http://localhost:5000/auth/login",
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgyNTAxIiwiaWF0IjoxNjcwMTAyODcwfQ.KAyjKrKeF4D3iz3CjZzuf2C5Z9AqD64zygnHORuwUEw",
            },
            data: bodyFormData
        }).then(res => {
            if(res.status === 200) {
                console.log(res.data.token);
                // LOGIN_TOKEN = res.data.token;
                localStorage.setItem("token",res.data.token)
                document.querySelector('#login2').close()
                loginAction()
            } else {
                console.log(res.data.message);
            }
        });
        setUsernameLogin2("")
        setPasswordLogin2("")
        document.getElementById("l2").reset();
        document.querySelector('#login2').close()
        //loginAction()
    }
    ////////


    let buttons_2 = <div className="normal-buttons">

                        <CustomButton onClick={function test() {
                                                                if (true) 
                                                                    {document.querySelector('#login1').showModal();}
                                                                }}
                                                                    text="Logare"/>
                                                                    
                        <dialog id="login1" className="login-style">
                            <div className="login-nav">
                                <img src={logo2} alt={"f"} className="logo-picture-mini"/>
                                <button onClick={function test () {document.querySelector('#login1').close();}}><img alt={"f"} src={xbutton} className="xbutton-pic"/></button>
                            </div>

                            <div className="login-purple">

                                
                                <div className="login">
                                    <h1>Welcome back</h1>
                                    <form onSubmit={handleSubmitLogin1} id="l1">
                                        <label>
                                            <h3>Username</h3>
                                            <br />
                                            <input type="text" name="user" placeholder="username" required
                                                   value={usernameLogin1}
                                                   onChange={(e) => setUsernameLogin1(e.target.value)}/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Parola</h3>
                                            <br />
                                            <input type="password" name="pass" placeholder="parola" required
                                                   value={passwordLogin1}
                                                   onChange={(e) => setPasswordLogin1(e.target.value)}/>
                                        </label>
                                        <br />
                                        <input type="submit" value="Logare"/>
                                    </form>
                                </div>
                            </div>
                        {/* </Modal> */}
                        </dialog>  

                        <CustomButton onClick={function test() {if (true) 
                                                                    {document.querySelector('#register1').showModal();}
                                                                }} text="Creare Cont"/>
                        <dialog id="register1" className="register-style">  
                            <div className="register-nav">
                                <img src={logo2} className="logo-picture-mini" alt={"f"}/>
                                <button onClick={function test () {document.querySelector('#register1').close();}}><img src={xbutton} alt={"f"} className="xbutton-pic"/></button>
                            </div>

                            <div className="register-purple">
                                <div className="register">    
                                    <h1>Welcome</h1>
                                    <form onSubmit={handleSubmitRegister1} id="r1">
                                        <label>
                                            <h3>Username</h3>
                                            <br />
                                            <input type="text" name="user" placeholder="username" required
                                                   value={usernameRegister1}
                                                   onChange={(e) => setUsernameRegister1(e.target.value)}/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Email</h3>
                                            <br />
                                            <input type="email" name="pass" placeholder="email" required
                                                   value={emailRegister1}
                                                   onChange={(e) => setEmailRegister1(e.target.value)}/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Parola</h3>
                                            <br />
                                            <input type="password" name="pass" placeholder="parola" required
                                                   value={passwordRegister1}
                                                   onChange={(e) => setPasswordRegister1(e.target.value)}/>
                                        </label>
                                        <br />
                                        <input type="submit" value="Creare cont"/>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        
                    </div>


    if(!isLoggedIn) {
        buttons =   <div className="rdiv">
                        {buttons_2}
                        <div className="buttons-icon">
                            <button onClick={function test()    {if (modalIsOpen_menu) {
                                                                    document.querySelector('#menu-id').close(); 
                                                                    setIsOpen_menu(false);
                                                                    } else {
                                                                    document.querySelector('#menu-id').showModal();
                                                                    setIsOpen_menu(true);
                                                                    }}}><img alt={"f"} src={square} className="square-pic"/></button>

                            <dialog id="menu-id" className="menu">
                                <div className="buttons-div">
                                    <button className="buttons-2" onClick={function test() {if (true) 
                                                                    {document.querySelector('#login2').showModal();}
                                                                }} >Logare</button>
                                    <dialog id="login2" className="login-style"> 
                                        <div className="login-nav">
                                            <img alt={"f"} src={logo2} className="logo-picture-mini"/>
                                            <button onClick={function test() {document.querySelector('#login2').close();}}><img alt={"f"} src={xbutton} className="xbutton-pic"/></button>
                                        </div>

                                        <div className="login-purple">

                                            
                                            <div className="login">
                                                <h1>Welcome back</h1>
                                                <form onSubmit={handleSubmitLogin2} id="l2">
                                                    <label>
                                                        <h3>Username</h3>
                                                        <br />
                                                        <input type="text" name="user" placeholder="username" required
                                                               value={usernameLogin2}
                                                               onChange={(e) => setUsernameLogin2(e.target.value)}/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Parola</h3>
                                                        <br />
                                                        <input type="password" name="pass" placeholder="parola" required
                                                               value={passwordLogin2}
                                                               onChange={(e) => setPasswordLogin2(e.target.value)}/>
                                                    </label>
                                                    <br />
                                                    <input type="submit" value="Logare"/>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                                                
                                    <br/>
                                    <button className="buttons-2" onClick={function test() {if (true) 
                                                                    {document.querySelector('#register2').showModal();}
                                                                }}>Creare cont</button>
                                    <dialog id="register2" className="register-style">     
                                        <div className="register-nav">
                                            <img alt={"f"} src={logo2} className="logo-picture-mini"/>
                                            <button onClick={function test() {document.querySelector('#register2').close();}}><img alt={"f"} src={xbutton} className="xbutton-pic"/></button>
                                        </div>

                                        <div className="register-purple">
                                            <div className="register">    
                                                <h1>Welcome</h1>
                                                <form onSubmit={handleSubmitRegister2} id="r2">
                                                    <label>
                                                        <h3>Username</h3>
                                                        <br />
                                                        <input type="text" name="user" placeholder="username" required
                                                               value={usernameRegister2}
                                                               onChange={(e) => setUsernameRegister2(e.target.value)}/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Email</h3>
                                                        <br />
                                                        <input type="email" name="pass" placeholder="email" required
                                                               value={emailRegister2}
                                                               onChange={(e) => setEmailRegister2(e.target.value)}/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Parola</h3>
                                                        <br />
                                                        <input type="password" name="pass" placeholder="parola" required
                                                               alue={passwordRegister2}
                                                               onChange={(e) => setPasswordRegister2(e.target.value)}/>
                                                    </label>
                                                    <br />
                                                    <input type="submit" value="Creare cont"/>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    <br/>
                                    <button className="buttons-2" onClick={function test() {if (true) 
                                                                    {document.querySelector('#menu-id').close(); 
                                                                    setIsOpen_menu(false);}
                                                                }}>Inchide</button>
                                    
                                </div>
                            </dialog>
                        </div>
                    </div>
    } else {
        buttons = <div className="rdiv">
            <CustomButton onClick={logoutAction} text="Delogare"/>
        </div>
    }

    return (
        <div className="navBar">
            <div className="ldiv">
                <img alt={"f"} src={logo} className="logo-picture"/>
            </div>
            {buttons}
        </div>
    );
  }
  
  export default CustomNavbar;
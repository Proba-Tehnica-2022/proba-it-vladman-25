import "./customNavbar.scss"
import CustomButton from "../customButton/customButton.jsx"
import logo from "../../assets/logo.png";

import React from 'react';
import Modal from 'react-modal';

import logo2 from "../../assets/logo.png";

import square from "../../assets/9square.png";


const customStyles_login = {
  content: {
        top: '15%',
        left: '35%',
        width: '30%',
        height: '75%',
        background: '#6F3096',
        padding: '0px',
        margin: '0px',
  },
};

const customStyles_register = {
    content: {
        top: '15%',
        left: '35%',
        width: '30%',
        height: '75%',
        background: '#6F3096',
        padding: '0px',
        margin: '0px',
     // transform: 'translate(-50%, -50%)',
    },
  };

  const customStyles_menu = {
    content: {
        top: '50px',
        left: '0%',
        width: '100%',
        height: '130px',
        background: '#F5F5F5',
        padding: '0px',
        margin: '0px',
        border: 'none',
     // transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

function CustomNavbar(props) {


    const [modalIsOpen_menu, setIsOpen_menu] = React.useState(false);


    let buttons;
    const [isLoggedIn, setLoginAction] = React.useState(false);
    function loginAction() {
        setLoginAction(true);
    }
    function logoutAction() {
        setLoginAction(false);
    }



    let buttons_2 = <div className="normal-buttons">

                        <CustomButton onClick={function test() {
                                                                if (true) 
                                                                    {document.querySelector('#login1').showModal();}
                                                                }}
                                                                    text="Logare"/>
                                                                    
                        <dialog id="login1" className="login-style">
                            <div className="login-nav">
                                <img src={logo2} className="logo-picture-mini"/>
                                <button onClick={function test () {document.querySelector('#login1').close();}}>X</button>
                            </div>

                            <div className="login-purple">

                                
                                <div className="login">
                                    <h1>Welcome back</h1>
                                    <form>
                                        <label>
                                            <h3>Username</h3>
                                            <br />
                                            <input type="text" name="user" placeholder="username"/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Parola</h3>
                                            <br />
                                            <input type="text" name="pass" placeholder="parola"/>
                                        </label>
                                        <br />
                                        <input onClick={function test() {document.querySelector('#login1').close(); loginAction()}} type="submit" value="Logare"/>
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
                                <img src={logo2} className="logo-picture-mini"/>
                                <button onClick={function test () {document.querySelector('#register1').close();}}>X</button>
                            </div>

                            <div className="register-purple">
                                <div className="register">    
                                    <h1>Welcome</h1>
                                    <form>
                                        <label>
                                            <h3>Username</h3>
                                            <br />
                                            <input type="text" name="user" placeholder="username"/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Email</h3>
                                            <br />
                                            <input type="text" name="pass" placeholder="email"/>
                                        </label>
                                        <br />
                                        <label>
                                            <h3>Parola</h3>
                                            <br />
                                            <input type="text" name="pass" placeholder="parola"/>
                                        </label>
                                        <br />
                                        <input onClick={function test() {document.querySelector('#register1').close(); loginAction()}} type="submit" value="Creare cont"/>
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
                                                                    }}}><img src={square} className="square-pic"/></button>

                            <dialog id="menu-id" className="menu">
                                <div className="buttons-div">
                                    <button className="buttons-2" onClick={function test() {if (true) 
                                                                    {document.querySelector('#login2').showModal();}
                                                                }} >Logare</button>
                                    <dialog id="login2" className="login-style"> 
                                        <div className="login-nav">
                                            <img src={logo2} className="logo-picture-mini"/>
                                            <button onClick={function test() {document.querySelector('#login2').close();}}>X</button>
                                        </div>

                                        <div className="login-purple">

                                            
                                            <div className="login">
                                                <h1>Welcome back</h1>
                                                <form>
                                                    <label>
                                                        <h3>Username</h3>
                                                        <br />
                                                        <input type="text" name="user" placeholder="username"/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Parola</h3>
                                                        <br />
                                                        <input type="text" name="pass" placeholder="parola"/>
                                                    </label>
                                                    <br />
                                                    <input onClick={function test() {document.querySelector('#login2').close(); loginAction()}} type="submit" value="Logare"/>
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
                                            <img src={logo2} className="logo-picture-mini"/>
                                            <button onClick={function test() {document.querySelector('#register2').close();}}>X</button>
                                        </div>

                                        <div className="register-purple">
                                            <div className="register">    
                                                <h1>Welcome</h1>
                                                <form>
                                                    <label>
                                                        <h3>Username</h3>
                                                        <br />
                                                        <input type="text" name="user" placeholder="username"/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Email</h3>
                                                        <br />
                                                        <input type="text" name="pass" placeholder="email"/>
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <h3>Parola</h3>
                                                        <br />
                                                        <input type="text" name="pass" placeholder="parola"/>
                                                    </label>
                                                    <br />
                                                    <input onClick={function test() {document.querySelector('#register2').close(); loginAction()}} type="submit" value="Creare cont"/>
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
                <img src={logo} className="logo-picture"/>
            </div>
            {buttons}
        </div>
    );
  }
  
  export default CustomNavbar;
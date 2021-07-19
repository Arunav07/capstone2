import "./login.css"
import {Visibility} from "@material-ui/icons"
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
    console.log(user)
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        B1 MERN SOCIAL MEDIA APP
                    </h3>
                    <span className="loginDesc">Connect with new people and share your <i>Moments</i></span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" className="loginInput" type="email" required ref={email}/>
                        <div className="passwordField">
                        <input placeholder="Passsword" minLength="8" className="loginInput" type="password" required ref={password}/>
                        <Visibility  className="passwordIcon" id="passwordToggler"/>
                        </div>
                        <button className="loginButton btn btn-outline-primary" type="submit" disabled={isFetching}>{ isFetching ? <CircularProgress color="secondary" size="25px"/> : "Log In" }</button>
                        <span className="loginForgot">Forgot Password</span>
                        <button className="loginRegisterButton btn btn-outline-info">{ isFetching ? <CircularProgress color="primary" size="25px"/> : "Create a new Account" }</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

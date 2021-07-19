import "./register.css"
import {Visibility} from "@material-ui/icons"
import { useRef } from "react";
import axios from "axios";
import {useHistory} from "react-router";
export default function Register() {
    const email = useRef();
    const password = useRef();
    const age = useRef();
    const username = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    const handleClick = async (e)=>{
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match.")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                age: age.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (err) {
                console.log(err)
            }

        }
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                <img src="https://platformmagazine.org/wp-content/uploads/2018/03/gettyimages-639050350-e1549336229349.jpg" alt="" className="registerLeftImage" />
                <h3 className="registerLogo">
                        B1 MERN SOCIAL MEDIA APP
                    </h3>
                <span className="registerLeftdesc">
                    Haven't registered yet? What are you waiting for? Join Us today.
                </span>
                </div>
                <div className="registerRight">
                    <form className="registerRightBox" onSubmit={handleClick} >
                <span className="registerRightTitle"><h2>Join Us</h2></span>
                <input type="Username" ref={username} placeholder="Name" className="registerRightInput" required/>
                <input type="number" ref={age} placeholder="Age" className="registerRightInput" required/>
                <input type="email" ref={email} placeholder="xyz@email.com" className="registerRightInput" required/>
                <div className="passwordField">
                <input type="password" ref={password} minLength="8" placeholder="Password" className="registerRightInput" required/>
                <Visibility className="passwordIcon" id="passwordToggler"/>
                </div>
                <div className="reenterPasswordField">
                <input type="password" ref={passwordAgain} minLength="8" placeholder="Re-enter your password" className="registerRightInput" required/>
                <Visibility className="passwordIcon" id="passwordToggler"/>
                </div>
                <button className="registerButton btn btn-outline-info" type="submit">Sign Up</button>
                </form>
                </div>
            </div>
        </div>
    )
}

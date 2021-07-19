import "./profile.css"
import Topbar from "../../components/topbar/Topbar.jsx";
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import { useEffect, useState } from "react"
import axios from "axios";
import {useParams} from "react-router" 
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username

    useEffect(()=>{
        const fetchUser= async()=>{
            const res = await axios.get(`http://localhost:1402/api/users/?username=${username}`);
            setUser(res.data);
        };
      fetchUser();
        }, 

        [username]);


    return (
        <>
        <Topbar/>
        <div className="profile">
        
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
            <img className="profileCoverImage" src={user.coverPicture ? PF+user.coverPicture : PF+"/cover.jpg"} alt="" />
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"user.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc} </span>
            </div>
            </div>
            <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
            </div>
        </div>
    </div>
    </>
    )
}

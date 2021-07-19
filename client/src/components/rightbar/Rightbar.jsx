import "./rightbar.css"
import {Users} from "../../dummyData.js"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@material-ui/icons"

export default function Rightbar({user}) {
const [friends, setFriends] = useState([])
const {user:currentUser, dispatch} = useContext(AuthContext);
const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))

useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?.id))
},[currentUser, user?.id]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const getFriends = async()=>{
        try {
            const friendList = await axios.get("/users/friends/"+user._id);
            setFriends(friendList.data)
        } catch (err) {
            console.log(err)
        }  
    } ;
    getFriends();
    },[user])

    const handleClick = async()=>{
        try {
            if(followed){
                await axios.put(`/users/${user._id}/unfollow`,{userId:currentUser._id});
                dispatch({type: "UNFOLLOW", payload: user._id})
            } else{
                await axios.put(`/users/${user._id}/follow`,{userId:currentUser._id})
                dispatch({type: "FOLLOW", payload: user._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }


    const HomeRightbar = () => {
        return (
            <>
            <div className="birthdayContainer">
                    <img src="https://raw.githubusercontent.com/safak/youtube/react-social-ui/public/assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Adam</b> and <b>3 other friends</b> are celebrating their birthday today</span>
                </div>
                <img src={`${PF}ad1.jpg`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u=>(
                        <Online key={u.id} user={u} />
                        ))}
                    
                </ul>
            </>
            );
    };

    const ProfileRightbar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick} >
                   {followed ? "Unfollow": "Follow"}
                   {followed ? <Remove /> : <Add />}
                    
                </button>
            )}
            <h4 className="rightbarTitle">User Information</h4>
            <div className="RightbatInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Age:</span>
                    <span className="rightbarInfoValue">{user.age}</span>
                </div>
            </div>
            <h4 className="rightbarTitle">Friends</h4>
            <div className="rightbarFollowings">
                {friends.map(friend=>(
                <Link to={"/profile/"+friend.username} style={{textDecoration: "none", color: "black"}} >
                <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF+friend.profilePicture: PF+ "user.png"} alt={friend.username} className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))};
            </div>
            </>
        )
    }
    return (

        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
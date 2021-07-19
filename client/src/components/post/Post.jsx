import "./post.css"
import {MoreVert, ThumbUpAlt, Favorite} from "@material-ui/icons"
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext);
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
      fetchUser();
        }, 

        [post.userId]);
useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
},[currentUser._id,post.likes])
    const likeHandler =()=>{
        try {
            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        } catch (err) {}
        
        setLike(isLiked ? like-1:  like+1 )
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF+"/user.png"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <MoreVert id="threeDots"/>
                </div>
                </div>
                <div className="postCenter">
                    <span className="posttext">{post?.desc}</span>
                    <img src={PF+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                    <ThumbUpAlt className="likeIcon" onClick={likeHandler} htmlColor="green" />
                    <Favorite className="likeIcon" onClick={likeHandler} htmlColor="red" />
                    <span className="postlikeCounter">{like} people have liked this post</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
                </div>
            </div>
        </div>
            
        
    )
}

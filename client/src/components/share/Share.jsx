import "./share.css";
import {PermMediaRounded,  GroupAdd , EmojiEmotionsOutlined, Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
       window.location.reload();
    } catch (err) {}
  };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                <img className="shareProfilePic" src={user.profilePicture ? PF+user.profilePicture : PF+"user.png"} alt={user.username+"'s Profile Picture"} />
                <input placeholder="What's on your mind?" className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                {file && (
                  <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className = "shareCancelImg" onClick ={()=>setFile(null)} />
                  </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler} >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaRounded className="shareIcon Photo"/>
                            <span className="shareOptionText">Photo/Video</span>
                            <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                                />
                    </label>
                        <div className="shareOption">
                            <GroupAdd className="shareIcon GroupAdd"/>
                            <span className="shareOptionText">Tag Friends</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsOutlined className="shareIcon Emoji"/>
                            <span className="shareOptionText">Feeling</span>
                        </div>  
 
                    </div>
                <button className="shareButton btn " type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

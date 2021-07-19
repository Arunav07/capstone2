import "./topbar.css" 
import { Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Topbar() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
return (
  <div className="topbarContainer">
    <div className="topbarLeft">
    <Link to="/" className="topbarLeft">
      <div className="topbarLeftLogo">
        <div className="topbarLeftLogoUp">
          <div className="topbarLeftLogoTop"></div>
          <div className="topbarLeftLogoTop1"></div>
        </div>
        <div className="topbarLeftLogoDown">
          <div className="topbarLeftLogoBottom"></div>
          <div className="topbarLeftLogoBottom1"></div>
        </div>
      </div>
      <span className="Logo">B1 MERN CAPSTONE</span></Link>
    </div>
    
    <div className="topbarCenter">
      <div className="searchbar">
<Search className="SearchIcon"/>
<input placeholder="Search" className="searchInput" />
      </div>
    </div>
    
    <div className="topbarRight">
      <div className="topbarLinks">
        <span className="topbarLink">HomePage</span>
        <span className="topbarLink">Timeline</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
<Person />
<span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
<Chat />
<span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
<Notifications />
<span className="topbarIconBadge">1</span>
        </div>
      </div>
      <Link to={`/profile/${user.username}`}>
      <img src={user.profilePicture ? PF+user.profilePicture : PF+"user.png"} alt="" className="topbarImg" />
      </Link>
    </div>
  </div>
    )
}
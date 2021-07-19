import "./sidebar.css"
import {RssFeed, Chat, HelpOutline,  School, GroupRounded, PlayCircleFilledOutlined, BookmarkBorderRounded } from "@material-ui/icons"
import {Users} from "../../dummyData.js"
import Friends from "../friends/Friends.jsx"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItem">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItem">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItem">Help</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItem">Classes</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupRounded className="sidebarIcon"/>
                        <span className="sidebarListItem">Friends</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItem">Play Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkBorderRounded className="sidebarIcon"/>
                        <span className="sidebarListItem">Saved</span>
                    </li>
                </ul>
                <button className="sidebarButton btn btn-outline-primary">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                    <Friends key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

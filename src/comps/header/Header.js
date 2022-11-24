import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { RiAccountCircleLine } from 'react-icons/ri'
import '../../static/header/header.css';
import { Link } from 'react-router-dom';
import { getUser, clearToken } from '../../utils/token'
import { useNavigate } from 'react-router-dom'

function Header() {
    const token = getUser()
    // const removeToken = clearToken()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearToken();
        navigate('/signin');
    }

    return (
        <div className="header">
            <nav className="header_cont">
                <div className="logo">
                <Link to="/"><FaUserFriends size={40} className="logo_cont" /></Link>
                </div>
                <div className="header_list">
                    <ul className="header_list_cont">
                        <li><Link to="/" className="header_list_cont_li">Home</Link></li>
                        {/* <li><Link to="/freinds">Freinds</Link></li> */}
                        <li><Link to="/profile" className="header_list_cont_li">Profile</Link></li>
                        <li><Link to="/create" className="header_list_cont_li">Create</Link></li>
                    </ul>
                </div>
                <div className="account">
                    {token ? <button className="logout" onClick={handleLogout}>Sign Out</button> : <RiAccountCircleLine size={40} className="account_cont" />}
                </div>
            </nav>
        </div>
    )
}

export default Header

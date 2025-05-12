/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from 'react-redux';

function NavBar({ transparent, absolute }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies = [] } = useSelector((state) => state.userGetFavoriteMovies);

    const hover = "hover:text-subMain transitions text-white";
    const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/movies/${search}`);
            setSearch(search);
        } else {
            navigate('/movies');
        }
    };

    return (
        <div
            className={`${transparent ? 'bg-transparent shadow-none' : 'bg-main shadow-md'} 
                ${absolute ? 'absolute top-0 left-0 right-0' : 'sticky top-0'} 
                z-50 bg-opacity-10 backdrop-blur-sm`}
        >
            <div className="container mx-auto py-6 px-4 grid grid-cols-12 gap-4 items-center">
                {/* LOGO */}
                <div className='col-span-2'>
                    <Link to="/">
                        <img
                            src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1726675657/Logo_xun4sb.png"
                            alt="logo"
                            className='w-full h-14 object-contain'
                        />
                    </Link>
                </div>

                {/* MENU */}
                <div className='col-span-6 font-medium text-sm hidden lg:flex gap-8 items-center'>
                    <NavLink to="/" className={Hover}>Trang chủ</NavLink>
                    <NavLink to="/movies" className={Hover}>Phim</NavLink>
                    <NavLink to="/favorites" className={Hover}>Danh sách của tôi</NavLink>
                    <NavLink to="/about-us" className={Hover}>Thông tin</NavLink>
                    <NavLink to="/contact-us" className={Hover}>Liên hệ</NavLink>
                </div>

                {/* USER + SEARCH + FAVORITE */}
                <div className='col-span-4 flex items-center justify-end gap-4'>
                    {/* SEARCH */}
                    <form
                        onSubmit={handleSearch}
                        className="relative group flex items-center bg-dryGray rounded-full w-10 hover:w-48 focus-within:w-48 transition-all duration-300 overflow-hidden"
                    >
                        <button
                            type="submit"
                            className="bg-subMain w-10 h-10 flex items-center justify-center text-white rounded-full z-10"
                        >
                            <FaSearch />
                        </button>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm phim"
                            className="absolute left-10 pr-4 pl-2 bg-transparent h-10 w-full opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none text-black placeholder:text-border transition-all duration-300"
                        />
                    </form>

                    {/* USER ICON */}
                    <NavLink
                        to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"}
                        className={Hover}
                    >
                        {userInfo ? (
                            <img
                                src={userInfo?.image || "https://res.cloudinary.com/dwfmpiozq/image/upload/v1730567122/Logo_m2ooop.png"}
                                alt={userInfo?.fullName}
                                className='w-8 h-8 rounded-full border object-cover border-subMain'
                            />
                        ) : (
                            <CgUser className="w-8 h-8" />
                        )}
                    </NavLink>

                    {/* NOTIFICATION */}
                    {/* <NavLink to="/favorites" className={Hover}>
                        <div className="relative">
                            <FaHeart className="w-6 h-6 text-white" />
                            <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-2 -right-3">
                                {likedMovies.length || 0}
                            </div>
                        </div>
                    </NavLink> */}
                </div>
            </div>

        </div>
    )
}

export default NavBar;

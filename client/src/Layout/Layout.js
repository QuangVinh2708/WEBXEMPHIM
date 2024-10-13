import React from 'react'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'
import MobileFooter from './Footer/MobileFooter'
function Layout({children}) {
    return(
       <>
       <div className= "bg-main text-white">
        <NavBar/>
        {children}
        <Footer/>
        {/* MobileFooter */}
        < MobileFooter/>
       </div>
       
       
       </>
    )
}
export default Layout
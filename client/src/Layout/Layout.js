import React from 'react';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import MobileFooter from './Footer/MobileFooter';

function Layout({ children, hideFooter, transparentNav }) {
    return (
        <div className={`relative min-h-screen ${transparentNav ? 'bg-transparent' : 'bg-dry'} text-white`}>
            <NavBar transparent={transparentNav} absolute={transparentNav} />
            <div className="flex-grow">
                {children}
            </div>
            {!hideFooter && (
                <>
                    <Footer />
                    <MobileFooter />
                </>
            )}
        </div>
    );
}


export default Layout;

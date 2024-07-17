import React, { useEffect, useState, useContext } from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Avatar,
    Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/MyContext";
import { auth } from "../../firebase/FirebaseConfig";
import blogger from './blogger (1).png';
import moon from './crescent-moon.png';
import menu from './menu.png';
import sun2 from './sun2.png';
import close from './close.png';
import sun from './sun.png';


export default function Nav() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState(null);
    const context = useContext(myContext);
    const { mode, toggleMode } = context;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // All NavList 
    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

            <li className="p-1 font-normal hover:underline underline-offset-4" style={{ color: mode === 'dark' ? 'black' : 'white' }}>
                <Link to="/" className="flex items-center">
                    HOME
                </Link>
            </li>

            <li className="p-1 font-normal hover:underline underline-offset-4" style={{ color: mode === 'dark' ? 'black' : 'white' }}>
                <Link to="/allblogs" className="flex items-center">
                    YOUR BLOGS
                </Link>
            </li>

                {user && (<li className="p-1 font-normal hover:underline underline-offset-4" style={{ color: mode === 'dark' ? 'black' : 'white' }}>
                    <Link to="/dashboard" className="flex items-center">
                        DASHBOARD
                    </Link>
                </li>)}
                
        </ul>
    );

    return (
        <nav className={`inset-0 z-20 h-max min-w-full py-2 px-4 lg:px-8 lg:py-2 ${mode === 'dark' ? 'bg-gradient-to-r from-[#0093E9] to-[#80D0C7]' : 'bg-gradient-to-r from-[#ff512f] to-[#dd2476]'}`}>
            {/* Desktop View  */}
            <div className="flex items-center justify-between">

            <Link to={'/'}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"
                            style={{ color: mode === 'dark' ? 'white' : 'white' }}
                        >
                            {/* Logo Image  */}
                            <img
                                className='w-10 h-10'
                                src={blogger}
                            />
                            {/* Logo Text  */}
                            <span>
                                BLOGSPHERE
                            </span>
                        </Typography>
                    </Link>

                <div className="flex items-center gap-4">

                    <div className="hidden lg:block">
                        {navList}
                    </div>

                    <div className="cursor-pointer" onClick={toggleMode}>
                        <img className="w-10 h-10" src={mode === 'light' ? moon : sun} alt="Toggle mode" />
                    </div>

                    <div className="ml-auto lg:hidden">
                        <div className="ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden" 
                        onClick={() => setOpenNav(!openNav)} 
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}>

                            <img className="w-10 h-10 cursor-pointer" src={openNav ? close : menu} alt="Toggle menu" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`transition-transform duration-300 ease-in-out ${openNav ? 'max-h-screen' : 'max-h-0'} overflow-hidden lg:hidden`}>
                {navList}
            </div>
        </nav>
    );
}

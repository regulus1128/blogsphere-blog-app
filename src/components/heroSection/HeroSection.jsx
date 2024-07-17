import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/MyContext';
import { auth } from '../../firebase/FirebaseConfig';
import { Link } from 'react-router-dom';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []); // Added dependency array to prevent repeated subscription

    return (
        <section className={`inset-0 z-20 max-w-full py-10 px-4 lg:px-8 ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <main className="text-center">
                    <div className="mb-8">
                        <h1 className={`text-3xl md:text-5xl font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                            {user ? `Welcome, ${user.displayName}!` : 'Welcome to Blogsphere!'}
                        </h1>
                    </div>

                    <p className={`sm:text-3xl text-xl font-light ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                        {user ? 'Write your story today.' : ''}
                    </p>

                    {!user && (
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl w-56 md:w-56 font-medium rounded-3xl text-[16px] px-5 py-2.5 text-center"
                                >
                                    CLICK HERE TO LOG IN
                                </button>
                            </Link>
                            <Link to="/register">
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-3xl w-56 md:w-56 text-[16px] px-5 py-2.5 text-center"
                                >
                                    CLICK HERE TO REGISTER
                                </button>
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
}

export default HeroSection;

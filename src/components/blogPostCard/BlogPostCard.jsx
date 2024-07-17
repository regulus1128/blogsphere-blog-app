import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/MyContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/FirebaseConfig';


function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;  // Assuming 'user' is available in the context
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
    })
    return () => unsubscribe();
})


  return (
    <div>
      <section className={`sticky inset-0 z-20 max-w-full py-2 px-4 lg:px-8 lg:py-2 ${mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'}`}>
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          {/* Main Content */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {getAllBlog.length > 0 ? (
              getAllBlog.map((item, index) => {
                const { thumbnail, id, date, title, category } = item;
                return (
                  <div key={index} className="p-4 md:w-1/3">
                    <div
                      style={{
                        background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
                        borderBottom: mode === 'dark' ? '2px solid rgb(226, 232, 240)' : '2px solid rgb(30, 41, 59)',
                      }}
                      className={`h-full shadow-md rounded-xl overflow-hidden`}
                    >
                      {/* Blog Thumbnail */}
                      <img className="w-full" src={thumbnail} alt="blog" />
                      {/* Top Items */}
                      <div className="p-6">
                        {/* Blog Date */}
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                          }}
                        >
                          {date}
                        </h2>
                        {/* Blog Title */}
                        <h1
                          className="title-font text-lg font-bold text-gray-900 mb-3"
                          style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                          }}
                        >
                          {title}
                        </h1>
                        {/* Blog Description */}
                        <p
                          className="leading-relaxed mb-3"
                          style={{
                            color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                          }}
                        >
                          {`Category: ${category}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : ''}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;

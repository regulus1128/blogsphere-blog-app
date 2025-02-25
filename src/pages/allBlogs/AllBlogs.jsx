import React, { useContext } from 'react'
import myContext from '../../context/data/MyContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
    const context = useContext(myContext);
    const { mode, getAllBlog } = context;
    const navigate = useNavigate();

    // console.log(getAllBlog)

    return (
        <Layout>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto max-w-7xl ">
                    {/* Top Heading  */}
                    
                    {/* Main Content  */}
                    <div className="flex flex-wrap justify-center -m-4 mb-5">
                        {/* Card 1  */}
                        {getAllBlog.length > 0 ? 
                        <>
                        
                            {getAllBlog.map((item, index) => {
                                const { thumbnail, id, date } = item;
                                console.log(item)

                                return (
                                    <div className="p-4 md:w-1/3" >
                            <div
                                style={{
                                    background: mode === 'dark'
                                        ? 'rgb(30, 41, 59)'
                                        : 'white',
                                    borderBottom: mode === 'dark'
                                        ?
                                        ' 2px solid rgb(226, 232, 240)'
                                        : ' 2px solid rgb(30, 41, 59)'
                                }}
                                className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                ${mode === 'dark'
                                    ? 'shadow-gray-700'
                                    : 'shadow-xl'
                                    } 
                                rounded-xl overflow-hidden`} 
                            >
                                {/* Blog Thumbnail  */}
                                <img onClick={() => navigate(`/bloginfo/${id}`)} className="w-full" src={thumbnail} alt="blog" />

                                {/* Top Items  */}
                                <div className="p-6">
                                    {/* Blog Date  */}
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                                        color: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : ' rgb(30, 41, 59)'
                                    }}>
                                        {date}
                                    </h2>

                                    {/* Blog Title  */}
                                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                                        color: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : ' rgb(30, 41, 59)'
                                    }}>
                                        {item.title}
                                    </h1>

                                    {/* Blog Category  */}
                                    <p className="leading-relaxed mb-3" style={{
                                        color: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : ' rgb(30, 41, 59)'
                                    }}>
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                                )
                            })}
                        </>
                        :
                        <>
                            <h2 className='text-3xl' style={{
                                        color: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : ' rgb(30, 41, 59)'
                                    }}>No blogs found! Please log in to see your blogs.</h2>
                        </>}

                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default AllBlogs
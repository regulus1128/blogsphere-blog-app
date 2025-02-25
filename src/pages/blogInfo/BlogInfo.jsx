import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../context/data/MyContext'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { fireDb } from '../../firebase/FirebaseConfig'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader';

const BlogInfo = () => {

  const context = useContext(MyContext);
  const { mode, setLoading, loading } = context;
  const params = useParams()
  const [getBlogs, setGetBlogs] = useState();

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, 'blogPost', params.id))
      if(productTemp.exists()){
        setGetBlogs(productTemp.data());
      }
      else{
        console.log('error');
      }
    } 
    catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
    window.scrollTo(0, 0)
  }, [params.id])

  function createMarkup(c) {
    return { __html: c };
  }

  // console.log(getBlogs);

  return (
    <Layout>
      <section className="rounded-lg overflow-hidden max-w-4xl mx-auto px-4">
        <div className=" py-4 lg:py-8">
          {loading ?
            <Loader/>
            :
            <div>
                {/* Thumbnail  */}
                <img alt="content" className="mb-3 rounded-lg h-full w-full"
                  src={getBlogs?.thumbnail}
                />
                {/* title And date  */}
                <div className="flex justify-between items-center mb-3">
                  <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    className=' text-xl md:text-2xl lg:text-2xl font-semibold'>
                    {getBlogs?.title}
                    {/* console.log(title); */}
                  </h1>
                  <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {getBlogs?.date}
                    {/* console.log(date); */}
                  </p>
                </div>
                <div
                  className={`border-b mb-5 ${mode === 'dark' ?
                        'border-gray-600' : 'border-gray-400'}`}
                />
                {/* blog Content  */}
                <div className="content">
                  <div
                    className={`${mode === 'dark' ? 'text-white' : 'text-black'} whitespace-pre-wrap`}
                    dangerouslySetInnerHTML={createMarkup(getBlogs?.content)}>
                  </div>
              </div>
            </div>
          }
        </div>
      </section>
    </Layout>
  )
}

export default BlogInfo
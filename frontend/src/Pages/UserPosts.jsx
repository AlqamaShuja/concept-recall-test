import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllPosts, fetchUserPosts } from '../slice/postSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';
import EachPost from '../Components/UserPost/EachPost';
import Loader from '../Components/Loader/loader';
import { getUserbyId } from '../slice/userSlice';

const UserPosts = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [user, setUser] = useState(state?.userRecord || null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPosts = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const func = id ? fetchUserPosts : fetchAllPosts;
      const data = await dispatch(func({ userId: id, page: pageNum, limit: 10 })).unwrap();

      if (data.posts.length === 0) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
        fetchPosts(page);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
    if (id && state?.userRecord) {
      setUser(state?.userRecord);
    } else if (id) {
      dispatch(getUserbyId(id))
        .unwrap()
        .then((res) => setUser(res))
        .catch((error) => {
          console.log(error, '==error:getUserById');
          setUser({});
        });
    }
  }, [id, state, dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, loading, page]);

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-gray-50 px-6 py-4"
      >
        {id && 
        <div className='flex justify-between items-center mb-3'>
            <ArrowLeftOutlined onClick={() => navigate(-1)} className='mb-3 text-xl' />
            <p className='text-lg font-bold'>{user?.name}'s Post</p>
            <span></span>
        </div>}
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 && !loading && (
            <p className="text-center text-gray-500">No posts to display</p>
          )}
          
          {id 
            ? posts.map((post) => <EachPost key={post.id} post={post} user={user} />)
            : posts.map(({ User, ...post }) => <EachPost key={post.id} post={post} user={User} />)
          }

          {loading && <Loader />}
          {!loading && !hasMore && posts.length > 0 && (
            <p className="text-center text-gray-500">No more posts to load</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;






















// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { fetchAllPosts, fetchUserPosts } from '../slice/postSlice'; // Adjust the path as needed
// import { ArrowLeftOutlined } from '@ant-design/icons';
// import EachPost from '../Components/UserPost/EachPost';
// import Loader from '../Components/Loader/loader';

// const UserPosts = () => {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const [user, setUser] = useState(state?.userRecord || null);
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const containerRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchPosts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const func = id ? fetchUserPosts: fetchAllPosts; 
//     //   console.log(func, "==func");
      
//       const data = await dispatch(func({ userId: id, page, limit: 10 })).unwrap();
//       console.log(data, 'askcasmaskmsak');
      
//       setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      
//       if (page >= data.totalPages) {
//         setHasMore(false);
//       }
      
//       setPage((prevPage) => prevPage + 1);
//     } catch (err) {
//       setError(err || 'Failed to fetch posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     if (containerRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
//       if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
//         fetchPosts();
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//     if(id && state?.userRecord){
//         setUser(state?.userRecord);
//     }
//     else if(id){
//         dispatch(getUserbyId(id)).unwrap()
//         .then(res => console.log(res, "==getUserByIddddd"))
//         .catch(error => console.log(error, "==errorrrr:getUserByIddddd"))
//     }
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [hasMore, loading]);


//   return (
//     <div className="flex flex-col">
//       <div
//         ref={containerRef}
//         className="flex-1 overflow-y-auto bg-gray-50 px-6 py-4"
//       >
//         {id && 
//         <div className='flex justify-between items-center mb-3'>
//             <ArrowLeftOutlined onClick={()=>navigate(-1)} className='mb-3 text-xl' />
//             <p className='text-lg font-bold'>{user?.name}'s Post</p>
//             <span></span>
//         </div>}
//         <div className="max-w-4xl mx-auto">
//           {posts?.length === 0 && !loading && (
//             <p className="text-center text-gray-500">No posts to display</p>
//           )}
          
//           {id ? 
//             posts?.map((post, i) => <EachPost key={post.id} post={post} user={user} />)
//             :
//             posts?.map(({ User, ...post }, i) => <EachPost key={post.id} post={post} user={User} />)
//            }

//           {loading && <Loader />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPosts;
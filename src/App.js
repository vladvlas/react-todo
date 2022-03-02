import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import PostService from "./API/PostServise";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyLoader from "./components/UI/loader/MyLoader";
import MyModal from "./components/UI/modal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import { usePosts } from "./hooks/usePosts";

import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false)

  

  useEffect(() => {
    fetchPosts()
  }, [])


 const createPost = (newPost) => {
  setPosts([...posts, newPost]);
  setModal(false)
 }

 async function fetchPosts() {
   setIsPostsLoading(true);
   const posts = await PostService.getAll();
   setPosts(posts);
   setIsPostsLoading(false);
 }

 const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
 }


 






  return (
    <div className="App">
      <MyButton style={{marginTop: '25px'}} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: '15px'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading
        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
            <MyLoader />
        </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Todo list'}/>
      }
      
    </div>
  )

}


export default App;

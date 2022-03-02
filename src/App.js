import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";

import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Description'},
    {id: 2, title: 'C#', body: '2Description'},
    {id: 3, title: 'Python', body: '3Description'},
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})


  const sortedPosts = useMemo(() => {
    console.log('12121212')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


 const createPost = (newPost) => {
  setPosts([...posts, newPost])
 }

 const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
 }


 






  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Todo list'}/>
    </div>
  )

}


export default App;

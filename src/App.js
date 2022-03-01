import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Description'},
    {id: 2, title: 'C#', body: 'Description'},
    {id: 3, title: 'Python', body: 'Description'},
  ]);


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
      <div>
        <select>
          <option>by name</option>
          <option>by description</option>
        </select>
      </div>
      {posts.length !== 0
        ?
        <PostList remove={removePost} posts={posts} title={'Todo list'}/>
        :
        <h1 style={{textAlign: 'center'}}>No todos</h1>
      }
    </div>
  )

}


export default App;

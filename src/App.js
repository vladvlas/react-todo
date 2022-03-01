import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";

import './styles/App.css'

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Description'},
    {id: 2, title: 'C#', body: '2Description'},
    {id: 3, title: 'Python', body: '3Description'},
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getSortedPosts() {
    
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }


 const createPost = (newPost) => {
  setPosts([...posts, newPost])
 }

 const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
 }


 const sortPosts = (sort) => {
   setSelectedSort(sort);
 }

 const sortedPost = getSortedPosts();




  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px'}}/>
      <div>
        <MyInput 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='search'
        />
        <MySelect 
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Sort'
          options={[
            {value: 'title', name: 'by title'},
            {value: 'body', name: 'by description'},
          ]}
        />
      </div>
      {posts.length !== 0
        ?
        <PostList remove={removePost} posts={sortedPost} title={'Todo list'}/>
        :
        <h1 style={{textAlign: 'center'}}>No todos</h1>
      }
    </div>
  )

}


export default App;

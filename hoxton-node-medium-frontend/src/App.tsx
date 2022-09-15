import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => setPosts(postsFromServer));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((resp) => resp.json())
      .then((usersFromServer) => setComments(usersFromServer));
  }, []);

  return (
    <div className="App">
      <main className="posts">
        {posts.map((post) => (
          <div>
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.image}</div>
            <div>{post.likes}</div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

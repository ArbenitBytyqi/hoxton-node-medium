import { useEffect, useState } from "react";
import "./App.css";

type Posts = {
  id: number;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: [];
};

type Comments = {
  id: number;
  comtent: string;
  postId: number;
};

function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => setPosts(postsFromServer));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((resp) => resp.json())
      .then((commentsFromServer) => setComments(commentsFromServer));
  }, []);

  return (
    <div className="App">
      <main className="posts">
        {posts.map((post) => (
          <div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.image}</div>
            <div>❤️ {post.likes}</div>
            <div>💭 {post.comments.length}</div>
            <p>-----------------------</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

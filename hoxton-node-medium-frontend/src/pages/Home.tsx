import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Posts = {
  id: number;
  title: string;
  content: string;
  image: string;
  likes: [];
  comments: [];
};

type Comments = {
  id: number;
  content: string;
  postId: number;
};

export function Home() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [likes, setLikes] = useState(0);

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
    <div>
      {posts.map((post) => (
        <div>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
            <img src={post.image} width="150px" height="150px" />
          </Link>
          <div>
            <button
              onClick={() => {
                fetch(`http://localhost:5000/likes`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ postsId: post.id }),
                })
                  .then((resp) => resp.json())
                  .then(() => location.reload());
              }}
            >
              ❤️
            </button>
            {post.likes.length} Likes
          </div>
          <div>
            <button
              onClick={() => {
                fetch(`http://localhost:5000/posts/${post.id}`, {
                  method: "DELETE",
                })
                  .then((resp) => resp.json())
                  .then(() => location.reload());
              }}
            >
              {" "}
              DELETE POST{" "}
            </button>
            {post.comments.length}💭 Comments
          </div>
        </div>
      ))}
    </div>
  );
}

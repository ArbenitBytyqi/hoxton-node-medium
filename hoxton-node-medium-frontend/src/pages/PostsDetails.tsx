import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Post = {
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
export function PostsDetails() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${params.id}`)
      .then((resp) => resp.json())
      .then((postFromServer) => setPost(postFromServer));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/comments/`)
      .then((resp) => resp.json())
      .then((commentsFromServer) => setComments(commentsFromServer));
  }, []);

  if (post === null) return <h1>Loading... </h1>;

  return (
    <section className="post-detail">
      <>
        <div>
          <div>
            <img src={post.image} width="150px" height="150px" />
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div></div>
          <div>
            {" "}
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
            {post.likes.length}
            <div>|</div>
            {post.comments.length}💭 Comments
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
          </div>
        </div>
      </>
    </section>
  );
}

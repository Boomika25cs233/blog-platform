import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getPosts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/posts"
    );

    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const createPost = async () => {
    await axios.post(
      "http://localhost:5000/api/posts",
      {
        title,
        content,
      }
    );

    getPosts();
  };

  return (
    <div>
      <h1>Blog Posts</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createPost}>
        Create Post
      </button>

      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
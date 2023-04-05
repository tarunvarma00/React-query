import React, { Fragment, useState } from "react";
import { useMutation } from "react-query";

import axios from "axios";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const { isLoading, isError, error, mutate } = useMutation(createPost, {
    retry: 3,
  });

  async function createPost() {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setMessage(response.data);
  }

  return (
    <Fragment>
      <div className="post">
        <h1>Create a Post</h1>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={() => {
            mutate({ id: Date.now(), title, description });
          }}
        >
          Create
        </button>
        <p> Created a new Post ID: {message && message.id}</p>
        <div style={{ color: "gray", background: "#234" }}>
          {isLoading ? "Saving..." : ""}
          {isError ? error.message : ""}
        </div>
      </div>
    </Fragment>
  );
}

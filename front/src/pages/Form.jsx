import { Button, DatePicker, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";

function Form() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = async () => {
    const book = {
      title: title,
      description: desc,
      author: author,
      publishDate: date,
    };
    const data = await axios.post("http://localhost:8080/books/form", book);
    console.log(data);
  };

  return (
    <div>
      <div>Add book</div>
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          placeholder="Desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <DatePicker
          value={date}
          onChange={(value) => {
            setDate(value);
          }}
        />
      </div>
      <Button onClick={handleSubmit}> Submit </Button>
    </div>
  );
}

export default Form;

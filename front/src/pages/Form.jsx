import { Button, DatePicker, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

function Form() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState({
    title: "",
    desc: "",
    author: "",
    date: "",
  });
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getBook(id) {
      const res = await axios.post("http://localhost:8080/get/", id);
      if (res && res.data) {
        setTitle(res.data.title);
        setDesc(res.data.description);
        setAuthor(res.data.author);
        setDate(res.data.publishDate);
      }
    }
    if (id) {
      getBook(id);
    }
  }, [id]);

  const handleSubmit = async () => {
    const book = {
      title: title,
      description: desc,
      author: author,
      publishDate: date,
    };
    let res = null;
    if (id) {
      res = await axios.put("http://localhost:8080/update/" + id, book);
    } else {
      res = await axios.post("http://localhost:8080/books/form", book);
    }
    if (res.data) {
      navigate("/");
    }
  };

  return (
    <div>
      <div>Form</div>
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {error.title && <div className="error">{error.title}</div>}
        <Input
          placeholder="Desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {error.desc && <div className="error">{error.desc}</div>}
        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        {error.author && <div className="error">{error.author}</div>}
        <DatePicker
          value={date}
          onChange={(value) => {
            setDate(value);
          }}
        />
        {error.date && <div className="error">{error.date}</div>}
      </div>
      <Button onClick={handleSubmit}> Submit </Button>
    </div>
  );
}

export default Form;

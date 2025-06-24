import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import Header from "../components/Header";
import { Link } from "react-router";
import axios from "axios";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "PublishDate",
    dataIndex: "publishDate",
    key: "publishDate",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    title: "book1",
    description: "test",
    author: "test",
    publishDate: "24/02/2024",
  },
  {
    key: "2",
    title: "book1",
    Description: "test",
    author: "test",
    publishDate: "24/02/2024",
  },
  {
    key: "3",
    Title: "book1",
    Description: "test",
    author: "test",
    publishDate: "24/02/2024",
  },
];
const Display = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function getBooks() {
      const res = await axios.get("http://localhost:8080/books/all");
      setBooks(res.data);
    }
    getBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div>
      <Header />
      <Link to={"/form"}>
        <Button> Add book</Button>
      </Link>
      <Table columns={columns} dataSource={books} />;
    </div>
  );
};
export default Display;

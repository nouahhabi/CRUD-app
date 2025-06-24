import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import axios from "axios";

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
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  let navigate = useNavigate();

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
          <button
            onClick={() => {
              navigate("/form/" + record.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setId(record.id);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

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

  async function handleDelete() {
    const res = await axios.delete("http://localhost:8080/delete/" + id);
  }

  return (
    <div>
      <Header />
      <Link to={"/form"}>
        <Button> Add book</Button>
      </Link>
      <Table columns={columns} dataSource={books} />;
      <Modal
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <Button onClick={handleDelete}>Confirm</Button>
      </Modal>
    </div>
  );
};
export default Display;

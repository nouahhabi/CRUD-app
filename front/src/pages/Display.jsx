import { Button, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate("/form/" + record.id)}
            />
            
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                setIsOpen(true);
                setId(record.id);
              }}
            />

        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function getBooks() {
      try {
      const res = await axios.get("http://localhost:8080/books/all");
      setBooks(res.data);
    } catch (err) {
      toast.error("Error loading book.");
    }
    }
    getBooks();
  }, []);


  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/books/all");
      setBooks(res.data);
    } catch (err) {
      toast.error("Error loading book.");
    }
  };

  async function handleDelete() {
    try {
      await axios.delete("http://localhost:8080/books/delete/" + id);
      setIsOpen(false);
      toast.success("Book deleted successfully  ");
      fetchBooks(); 
    } catch (err) {
      toast.error("Failed to delete book ");
    }
  }

  return (
      <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center space-x-3">
            <div className="text-blue-600 text-3xl">
              📚
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Book Manager
            </h1>
          </div>
        </div>
      </header>


      
      <div className="max-w-5xl mx-auto px-4 mt-8 flex justify-end">
        <Link to="/form">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Book
          </Button>
        </Link>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Table
            columns={columns}
            dataSource={books}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 6 }}
            className="custom-ant-table"
          />
        </div>
      </div>

      
      <Modal
      className=""
        open={isOpen}
        title="Confirm Deletion"
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" danger onClick={handleDelete}>
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this book?</p>
      </Modal>
    </div>
  );
};
export default Display;

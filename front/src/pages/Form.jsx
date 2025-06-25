import { Button, Input, Typography, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from 'react-toastify';

const { Title, Text } = Typography;
const { TextArea } = Input;

function Form() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", desc: "", author: "" });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:8080/books/get/" + id)
        .then((res) => {
          if (res?.data) {
            setTitle(res.data.title);
            setDesc(res.data.description);
            setAuthor(res.data.author);
          }
        })
        .catch(() => {
          message.error("Error loading book.");
        });
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {
      title: title.trim() ? "" : "Title is required.",
      desc: desc.trim() ? "" : "Description is required.",
      author: author.trim() ? "" : "Author is required.",
    };
    setError(newErrors);
    return !Object.values(newErrors).some((val) => val);
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      toast.error("Please fill in all required fields..");
      return;
    }

    const book = { title, description: desc, author };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/books/update/${id}`, book);
        toast.success(" Book modified successfully!");
      } else {
        await axios.post("http://localhost:8080/books/form", book);
        toast.success(" Book added successfully!");
      }

      // Petite pause pour laisser le toast s'afficher avant de naviguer
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      toast.error("Error saving book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-10">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">
        <Title level={2} className="text-center text-gray-800 mb-8">
          {id ? "Modify book" : "Add book"}
        </Title>

        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title</label>
            <Input
              size="large"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error.title && <Text type="danger">{error.title}</Text>}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <TextArea
              rows={5}
              placeholder="Enter a description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {error.desc && <Text type="danger">{error.desc}</Text>}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Auteur</label>
            <Input
              size="large"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {error.author && <Text type="danger">{error.author}</Text>}
          </div>

          <div className="pt-6">
            <Button
              type="primary"
              block
              size="large"
              loading={loading}
              onClick={handleSubmit}
              className="rounded-lg"
            >
              {id ? "Modify" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
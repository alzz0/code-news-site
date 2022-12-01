import { useState } from "react";
import { Input, Button } from "../../utils";
import config from "../../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const CreatePost = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [readTime, setReadTime] = useState("");
  const id = uuidv4();

  const options = [
    { value: "blockchain", label: "blockchain" },
    { value: "javascript", label: "javascript" },
    { value: "career", label: "Career" },
    { value: "webdevelopment", label: "Web Development" },
    { value: "tutorials", label: "tutorials" },
    { value: "mobiledevelopment", label: "Mobile Development" },
    { value: "cloud", label: "Cloud" },
    { value: "web3", label: "Web 3.0" },
    { value: "css", label: "CSS" },
    { value: "devops", label: "DevOps" },
    { value: "python", label: "Python" },
    { value: "datascience", label: "Data Science" },
    { value: "hardware", label: "Hardware" },
  ];

  const handleFileChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const convertedFile = await convertToBase64(file);
    setFile(convertedFile);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleSubmit = () => {
    console.log("handle submit");
    if (!url || !title || !file || !tags || !readTime) return;
    const selectedTags = tags.map((tag) => tag.value);
    const urlApi = `${config.apiGateway.URL}post/upload`;
    const data = {
      url,
      title,
      file,
      id,
      selectedTags,
      readTime,
    };

    // delete, for populating db only
    // for (let i = 0; i < 2; i++) {
    // data.id = Math.random().toString();
    axios
      .post(urlApi, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // }
  };
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
  };

  return (
    <div>
      <Input
        placeholder="URL"
        type="text"
        name="url"
        required={true}
        handleChange={(e) => setUrl(e.target.value)}
      />
      <Input
        placeholder="TITLE"
        type="text"
        name="title"
        required={true}
        handleChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Read time"
        type="number"
        name="readTime"
        required={true}
        handleChange={(e) => setReadTime(e.target.value)}
      />
      <Select
        onChange={setTags}
        closeMenuOnSelect={false}
        options={options}
        isMulti
        isSearchable
        styles={colourStyles}
      />
      <Input
        type="file"
        name="file"
        accept="image/*"
        required={true}
        handleChange={handleFileChange}
      />
      <Button text="SUBMIT" handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;

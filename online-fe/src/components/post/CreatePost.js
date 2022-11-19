import { useState } from "react";
import { Input, Button } from "../../utils";
import config from "../../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState([]);
  const id = uuidv4();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleFileChange = async (e) => {
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
    const urlApi = `${config.apiGateway.URL}post/upload`;
    const data = {
      url,
      file,
      id,
    };
    axios
      .post(urlApi, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Input
        placeholder="url"
        type="text"
        name="url"
        required={true}
        handleChange={handleChange}
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

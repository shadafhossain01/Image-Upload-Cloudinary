import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Form from "./Form";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error("Please Upload a Image");
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch("http://localhost:5050/image-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast.success(data.message);
      setImageUrl(data.imageURL);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="text-center mx-auto w-full h-full mt-17.5">
      <h1 className="font-semibold text-white  text-3xl">
        File Upload using Cloudinary
      </h1>
      
      <Form handleSubmit={handleSubmit} handleChange={handleChange} />

      {imageUrl && (
        <h3 className="font-semibold text-white  text-2xl mt-15">
          Uploaded Image :
        </h3>
      )}

      <img src={imageUrl} className="mx-auto mt-10 w-115 object-cover" />
      <Toaster />
    </div>
  );
}

export default App;

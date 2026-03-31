import React from "react";

const Form = ({ handleSubmit, handleChange }) => {
  return (
    <form
      onSubmit={handleSubmit}
      action="/image-upload"
      method="POST"
      encType="multipart/form-data"
    >
      <input
        name="profileImage"
        type="file"
        onChange={handleChange}
        className="border mr-2 text-white font-bold px-4 py-2 rounded-md border-indigo-400"
      />
      <button className="mt-10 cursor-pointer rounded-md bg-transparent font-bold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300 border px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default Form;

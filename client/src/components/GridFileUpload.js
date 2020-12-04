import React, { useState } from "react";

function GridFileUpload() {
  const [file1, setfile1] = useState({});
  const [text, setText] = useState("");

  const handleChange = (state, setState) => {
    setState(state);
  };

  const submitFiles = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    console.log(file1);
    formData.append("file1", file1);
    formData.append("text", text);

    for (let key of formData.entries()) {
      console.log(key);
      console.log(key[0] + ", " + key[1]);
    }

    fetch("/api/files/addSingleFileWithGrid", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setText("");
      });
  };

  const handleFileUpload = (ev) => {
    ev.preventDefault();
    console.log(ev.target.files[0]);
    setfile1(ev.target.files[0]);
  };

  return (
    <>
      <p>Single File Upload with GridFS and Multer</p>
      <form encType="multipart/form-data" onSubmit={submitFiles}>
        <input type="file" name="file1" onChange={handleFileUpload} />
        <input
          type="text"
          placeholder="metadata"
          value={text}
          onChange={(ev) => handleChange(ev.target.value, setText)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default GridFileUpload;

import React, { useState } from "react";
import "./Blogadd.css";

// TIPTAP imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Video from "../../tiptap/Video";

function Blogadd() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [slugType, setSlugType] = useState("auto");
  const [slug, setSlug] = useState("");

  // TIPTAP EDITOR SETUP
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Video,
    ],
    content: "",
  });


  // Upload image into content
  const handleInsertImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/upload/image/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
  };

  // Upload video into content (as <video>)
  const handleInsertVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch("http://localhost:8000/api/upload/video/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      editor.commands.insertContent(
        `<video controls width="100%"><source src="${data.url}" type="video/mp4"></video>`
      );
    }
  };

  // Submit entire post
  const handleSubmit = async () => {
    if (!title) return alert("Title required!");
    if (!editor) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);

    // slug_type required
    formData.append("slug_type", slugType); // change to "manual" if needed

    if (slugType === "manual") {
      formData.append("slug", slug);
    }

    // only send JSON field, Django supports this
    formData.append(
      "content_json",
      JSON.stringify(editor.getJSON() || {})
    );

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    const res = await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
      },
      body: formData,
    });

    if (res.ok) {
      alert("Blog Posted Successfully!");
      setTitle("");
      setExcerpt("");
      setSlug("");
      setSlugType("auto");
      editor.commands.clearContent();
    } else {
      const err = await res.text();
      console.log("Error:", err);
      alert("Error uploading blog");
    }
  };




  //  PROTECT THE PAGE
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <h2>You are not authorized</h2>;
  }



  return (
    <div className="blog-add-container">

      <h1>Create New Blog</h1>

      {/* Title */}
      <input
        type="text"
        placeholder="Blog Title"
        className="input-box"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Excerpt */}
      <textarea
        placeholder="Short Excerpt..."
        className="textarea-box"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      ></textarea>


      {/* Slug Type */}
      <label className="label">Slug Type</label>
      <select
        className="input-box"
        value={slugType}
        onChange={(e) => setSlugType(e.target.value)}
      >
        <option value="auto">Auto Generate</option>
        <option value="manual">Manual</option>
      </select>

      {/* Manual Slug Input (show only if manual) */}
      {slugType === "manual" && (
        <input
          type="text"
          className="input-box"
          placeholder="Enter custom slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      )}


      {/* Cover Image */}
      <label className="label">Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setCoverImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      {preview && <img src={preview} alt="" className="cover-preview" />}

      {/* Editor Toolbar */}
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>Bold</b>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>Italic</i>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>Underline</u>
        </button>

        <label className="upload-btn">
          📷 Image
          <input type="file" accept="image/*" onChange={handleInsertImage} hidden />
        </label>

        <label className="upload-btn">
          🎥 Video
          <input type="file" accept="video/mp4" onChange={handleInsertVideo} hidden />
        </label>
      </div>

      {/* Tiptap Editor */}
      <div className="editor-box">
        <EditorContent editor={editor} />
      </div>

      {/* Submit */}
      <button className="publish-btn" onClick={handleSubmit}>
        Publish Blog
      </button>
    </div>
  );
}

export default Blogadd;

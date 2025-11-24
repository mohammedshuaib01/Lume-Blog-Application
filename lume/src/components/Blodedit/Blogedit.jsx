import React, { useState, useEffect } from "react";
import "./Blogedit.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// TIPTAP imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Video from "../../tiptap/Video";

function Blogedit() {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // TIPTAP EDITOR
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image, Video],
    content: "",
  });

  // ---------------- Fetch Existing Blog ----------------
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${slug}/`);
        const data = res.data;

        setTitle(data.title);
        setExcerpt(data.excerpt);
        setOldImage(data.cover_image);

        // Load editor content
        if (editor && data.content_json) {
          editor.commands.setContent(data.content_json);
        }

      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchBlog();
  }, [slug, editor]);

  // ---------------- File Uploads Inside Editor ----------------
  const handleInsertImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/upload/image/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
  };

  const handleInsertVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch("http://localhost:8000/api/upload/video/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      editor.commands.setVideo(data.url);
    }
  };

  // ---------------- Update Blog ----------------
  const handleUpdate = async () => {
    if (!editor) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content_json", JSON.stringify(editor.getJSON()));

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/posts/${slug}/`,
        formData
      );

      if (res.status === 200) {
        alert("Blog updated successfully!");
      }
    } catch (e) {
      console.log(e);
      alert("Update failed");
    }
  };

  return (
    <div className="blog-add-container">
      <h1>Edit Blog</h1>

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

      {/* Cover Image */}
      <label className="label">Change Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setCoverImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview ? (
        <img src={preview} alt="" className="cover-preview" />
      ) : oldImage ? (
        <img src={oldImage} alt="" className="cover-preview" />
      ) : null}

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

      {/* TIPTAP Editor */}
      <div className="editor-box">
        <EditorContent editor={editor} />
      </div>

      {/* Update Button */}
      <button className="publish-btn" onClick={handleUpdate}>
        Update Blog
      </button>
    </div>
  );
}

export default Blogedit;

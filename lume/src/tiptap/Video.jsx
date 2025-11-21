import { Node } from "@tiptap/core";

const Video = Node.create({
  name: "video",
  group: "block",
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  renderHTML({ node }) {
    return [
      "div",
      { class: "video-wrapper" },
      [
        "video",
        {
          controls: "true",
          style: "width:100%;border-radius:10px;margin:10px 0;",
        },
        ["source", { src: node.attrs.src, type: "video/mp4" }]
      ]
    ];
  },
});

export default Video;

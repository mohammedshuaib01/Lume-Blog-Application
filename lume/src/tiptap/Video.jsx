import { Node } from "@tiptap/core";

const Video = Node.create({
  name: "video",

  group: "block",

  atom: true,

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
      getAttrs: (dom) => {
        const source = dom.querySelector("source");
        return {
          src: source ? source.getAttribute("src") : null,
        };
      },
    },
  ];
},

  renderHTML({ node }) {
    const src = node.attrs.src;

    return [
      "div",
      { class: "video-wrapper" },
      [
        "video",
        {
          controls: "true",
          style: "width:100%; border-radius:10px; margin:10px 0;",
        },
        ["source", { src, type: "video/mp4" }],
      ],
    ];
  },

  addCommands() {
    return {
      setVideo:
        (src) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "video",
            attrs: { src },
          });
        },
    };
  },
});

export default Video;

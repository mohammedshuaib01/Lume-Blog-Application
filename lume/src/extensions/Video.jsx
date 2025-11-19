import { Node } from '@tiptap/core';

const Video = Node.create({
  name: 'video',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: 'video' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', { ...HTMLAttributes, controls: true }];
  },
});

export default Video;

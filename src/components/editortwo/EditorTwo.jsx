'use client'
import React from 'react';
import styles from './editortwo.module.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBold, faItalic, faUnderline, faStrikethrough,
  faListUl, faListOl, faQuoteRight,
  faLink, faImage, faCode, faEraser, faVideo,
  faIndent, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify 
} from '@fortawesome/free-solid-svg-icons';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote'
// import Video from '@tiptap/extension-video';
import TextAlign from '@tiptap/extension-text-align';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Node, mergeAttributes } from '@tiptap/core';
import iFrameResize from 'iframe-resizer/js/iframeResizer';



// const Video = Node.create({
//   name: 'iframe',
//   group: 'block', // belongs to the 'block' group of extensions
//   selectable: true, // so we can select the video
//   draggable: true, // so we can drag the video
//   atom: true, // is a single unit

//   parseHTML() {
//     return [
//       {
//         tag: 'iframe', // Update this to target the iframe directly
//       },
//     ]
//   },



//   addAttributes() {
//     return {
//       "src": {
//         default: null
//       },
//     }
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['iframe', mergeAttributes(HTMLAttributes)]; // Return iframe instead of video tag
//   },


// addNodeView() {
//   return ({ editor, node }) => {
//     const div = document.createElement('div');
//     div.className = 'video-container';
//     const iframe = document.createElement('iframe');
//     if (editor.isEditable) {
//       iframe.className = 'pointer-events-none';
//     }
//     iframe.width = '640';
//     iframe.height = '360';
//     iframe.frameborder = "0";
//     iframe.allowfullscreen = "";
//     iframe.src = node.attrs.src;
//     div.append(iframe);
//     return {
//       dom: div,
//     }
//   }
// },







// });




const Video = Node.create({
	name: "iframe",
	group: "block",
	defaultOptions: {
		allowFullscreen: true,
		HTMLAttributes: {
			class: "iframe-wrapper"
		}
	},
	addAttributes() {
		return {
			src: {
				default: null,
			},
			frameborder: {
				default: 0,
			},
			allowfullscreen: {
				default: this.options.allowFullscreen,
				parseHTML: () => this.options.allowFullscreen,
			},
		}
	},
	parseHTML() {
		return [{
			tag: "iframe",
		}]
	},
	renderHTML({ HTMLAttributes }) {
		return ["div", this.options.HTMLAttributes, ["iframe", HTMLAttributes]]
	},
	addCommands() {
		return {
			setIframe: (options) => ({ tr, dispatch }) => {
				const { selection } = tr
				const node = this.type.create(options)

				if (dispatch) {
					tr.replaceRangeWith(selection.from, selection.to, node)
				}

				return true
			},
		}
	},
})



const EditorTwo = ({ blogContent, setBlogContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign,
      Blockquote,
      Document,
      Paragraph,
      Text,
      Video,
    ],
    content: blogContent,
    onUpdate: ({ editor }) => {
      setBlogContent(editor.getHTML()); // Sync content with state
    },
  })

  const isFontAwesomeIcon = (icon) => {
    return icon && typeof icon === 'object' && icon.prefix && icon.iconName;
  };




  // Helper function to get aspect ratio based on video URL
function getAspectRatio(videoUrl) {
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    return { width: 16, height: 9 };
  } else if (videoUrl.includes('vimeo.com')) {
    return { width: 16, height: 9 };
  } else if (videoUrl.includes('instagram.com') || videoUrl.includes('tiktok.com')) {
    return { width: 9, height: 16 };
  } else if (videoUrl.includes('facebook.com')) {
    return { width: 4, height: 5 };
  } else if (videoUrl.includes('twitter.com')) {
    return { width: 16, height: 9 };
  } else if (videoUrl.includes('snapchat.com')) {
    return { width: 9, height: 16 };
  } else if (videoUrl.includes('linkedin.com')) {
    return { width: 1, height: 1 };
  }
  // Default to a standard landscape ratio
  return { width: 16, height: 9 };
}

const setVideo = React.useCallback(() => {
  const videoSrc = editor.getAttributes('iframe').src;
  const video = window.prompt('Video URL', videoSrc);

  if (video === null) return; // User canceled the prompt
  if (video === '') {
    editor.isActive('iframe') ? editor.commands.deleteSelection() : false;
    return; // No URL provided
  }

  // Get the appropriate aspect ratio
  const { width, height } = getAspectRatio(video);
  console.log("Width: ", width, "Height: ", height);

  // Define a default base width and calculate height
  const baseWidth = 560; // Default width for iframes
  const calculatedHeight = (baseWidth * height) / width;

  // Create iframe with calculated dimensions
  const iframeContent = `
    <iframe 
      src="${video}" 
      frameborder="0" 
      allowfullscreen 
      style="width: ${baseWidth}px; height: ${calculatedHeight}px;">
    </iframe>`;

  editor.commands.insertContent(iframeContent);
  console.log('Video Source: ', video);
}, [editor]);

  


  
  const toolbarButtons = [
    { name: 'bold', icon: faBold, title: 'Bold', action: (editor) => editor.chain().focus().toggleBold().run() },
    { name: 'italic', icon: faItalic, title: 'Italic', action: (editor) => editor.chain().focus().toggleItalic().run() },
    { name: 'underline', icon: faUnderline, title: 'Underline', action: (editor) => editor.chain().focus().toggleUnderline().run() },
    { name: 'strike', icon: faStrikethrough, title: 'Strike', action: (editor) => editor.chain().focus().toggleStrike().run() },
    { name: 'heading1', icon: Heading1, title: 'Heading 1', action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { name: 'heading2', icon: Heading2, title: 'Heading 2', action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { name: 'heading3', icon: Heading3, title: 'Heading 3', action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { name: 'heading4', icon: Heading4, title: 'Heading 4', action: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run() },
    { name: 'heading5', icon: Heading5, title: 'Heading 5', action: (editor) => editor.chain().focus().toggleHeading({ level: 5 }).run() },
    { name: 'heading6', icon: Heading6, title: 'Heading 6', action: (editor) => editor.chain().focus().toggleHeading({ level: 6 }).run() },
    { name: 'bulletList', icon: faListUl, title: 'Bullet List', action: (editor) => editor.chain().focus().toggleBulletList().run() },
    { name: 'orderedList', icon: faListOl, title: 'Ordered List', action: (editor) => editor.chain().focus().toggleOrderedList().run() },
    { name: 'alignLeft', icon: faAlignLeft, title: 'Align Left', action: (editor) => editor.chain().focus().setTextAlign('left').run() },
    { name: 'alignCenter', icon: faAlignCenter, title: 'Align Center', action: (editor) => editor.chain().focus().setTextAlign('center').run() },
    { name: 'alignRight', icon: faAlignRight, title: 'Align Right', action: (editor) => editor.chain().focus().setTextAlign('right').run() },
    { name: 'alignJustify', icon: faAlignJustify, title: 'Align Justify', action: (editor) => editor.chain().focus().setTextAlign('justify').run() },
    { name: 'link', icon: faLink, title: 'Link', action: (editor) => editor.chain().focus().toggleLink({ href: 'https://example.com' }).run() },
    { name: 'image', icon: faImage, title: 'Image', action: (editor) => {
      const url = prompt('Enter the image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }},
    { name: 'blockquote', icon: faQuoteRight, title: 'Blockquote', action: (editor) => editor.chain().focus().toggleBlockquote().run() },
    { name: 'codeBlock', icon: faCode, title: 'Code Block', action: (editor) => editor.chain().focus().toggleCodeBlock().run() },
    { name: 'clean', icon: faEraser, title: 'Clean Formatting', action: (editor) => editor.chain().focus().clearContent().run() },
    { name: 'video', icon: faVideo, title: 'Video', action: (editor) => {setVideo(editor)}},
  ];
  
  




  
  
  

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>

        {
          editor && toolbarButtons.map((item, i)=>(
            <div key={i} className={!editor.isActive(item.name) ? styles.button : styles.buttonActive} title={item.title} onClick={()=>{item.action(editor)}}>
              {isFontAwesomeIcon(item.icon) ? <FontAwesomeIcon icon={item.icon} className={styles.icon} /> : <item.icon className={styles.icon} />} 
            </div>
          ))
        }
        
      </div>
      <EditorContent editor={editor} className={styles.editorInput} />
    </div>
  );
}

export default EditorTwo


  // TODO 1. Fix toggleUnderline, increaseIndent, decreaseIndent, setTextAlign, toggleLink, setImage, setVideo 
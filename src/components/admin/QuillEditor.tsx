import { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  html: string;
  onChange: (html: string) => void;
}

const QuillEditor = ({ html, onChange }: Props) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });
      quillRef.current.clipboard.dangerouslyPasteHTML(html);
      quillRef.current.on("text-change", () => {
        if (quillRef.current) {
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }
  }, [html, onChange]);

  return <div ref={editorRef} />;
};

export default QuillEditor;

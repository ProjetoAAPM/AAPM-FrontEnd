import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useEditMode } from "../../contexts/modo_editar";
import { useEffect, useState } from "react";
import { buscarConteudo, salvarConteudo } from "../../Services/admin/conteudoService";

type Props = {
  content: string;
  className?: string;
  id: number; 
  smallText?: boolean;
  onFocusEditor?: (editor: any) => void;
};

export default function BlocoEditavel({
  content,
  className = "",
  id,
  onFocusEditor,
}: Props) {
  const { editMode, activeEditorId, setActiveEditorId } = useEditMode();
  
  const isActive = String(activeEditorId) === String(id);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,
    editable: editMode && isActive,

    onCreate: async ({ editor }) => {
      const saved = await buscarConteudo(id);
      if (saved) editor.commands.setContent(saved);
    },

    onUpdate: async ({ editor }) => {
      let html = editor.getHTML();

      if (id === 1 || id === 2) {
        html = html
          .replace(/<li><p>/g, `<li>`)
          .replace(/<\/p><\/li>/g, `</li>`);
      }

      await salvarConteudo(id, html);
    },
  });

  useEffect(() => {
    if (editor) editor.setEditable(editMode && isActive);
  }, [editor, editMode, isActive]);

  if (!editor) return null;

  return (
    <div
      className={`relative ${isSmallScreen ? "small-screen-editor" : ""} ${
        editMode ? "border-2 border-dashed border-blue-400 p-3 rounded-lg" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();

        if (editMode) {
          setActiveEditorId(String(id));
          editor.commands.focus();

          onFocusEditor?.(editor);
        }
      }}
    >
      <EditorContent editor={editor} className={`editor-reset ${className}`} />
    </div>
  );
}
// Instalar: npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-text-style @tiptap/extension-color @tiptap/extension-text-align
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useEditMode } from "../../context_admin/modo_editar";
import { useEffect } from "react";

type Props = {
  content: string;
  className?: string;
  id: string;
};

export default function BlocoEditavel({ content, className = "", id }: Props) {
  const { editMode, activeEditorId, setActiveEditorId } = useEditMode();
  const isActive = activeEditorId === id;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    editable: editMode && isActive,

    onCreate: ({ editor }: any) => {
      const saved = localStorage.getItem(id);
      if (saved) {
        editor.commands.setContent(saved);
      }
    },

    onUpdate: ({ editor }: any) => {
      let html = editor.getHTML();

      if (id === "sobre-texto") {
        html = html
          .replace(/<li><p>/g, `<li>`)
          .replace(/<\/p><\/li>/g, `</li>`);
      }

      localStorage.setItem(id, html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (!editMode) {
      const html = editor.getHTML();
      localStorage.setItem(id, html);
    }
  }, [editMode, editor, id]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editMode && isActive);
    }
  }, [editor, editMode, isActive]);

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:5000/admin/conteudo/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.conteudo) editor?.commands.setContent(data.conteudo);
  //     })
  //     .catch(err => console.log("Erro ao buscar do backend:", err));
  // }, [id, editor]);

  // useEffect(() => {
  //   if (!editor || editMode) return;
  //   const html = editor.getHTML();
  //   fetch("http://127.0.0.1:5000/admin/conteudo", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ pagina: id, conteudo: html })
  //   }).catch(err => console.log("Erro ao salvar:", err));
  // }, [editMode, editor, id]);

  if (!editor) return null;

  return (
    <div
      className={`relative ${
        editMode ? "border-2 border-dashed border-blue-400 p-2" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (editMode) {
          setActiveEditorId(id);
          editor.commands.focus();
        }
      }}
    >
      {editMode && isActive && (
        <div
          className="tiptap-toolbar absolute -top-20 left-1/2 -translate-x-1/2 
                    bg-[#1F2937] text-white shadow-2xl border border-gray-500 
                    rounded-full px-5 py-3.5 flex items-center gap-2 z-[60] 
                    backdrop-blur-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-4 py-2 hover:bg-gray-700 rounded-full text-sm font-semibold transition"
          >
            Negrito
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-4 py-2 hover:bg-gray-700 rounded-full text-sm italic transition"
          >
            Itálico
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="px-4 py-2 hover:bg-gray-700 rounded-full text-sm underline transition"
          >
            Sublinhado
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-4 py-2 hover:bg-gray-700 rounded-full text-sm transition"
          >
            • Lista
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="px-4 py-2 hover:bg-gray-700 rounded-full text-sm transition"
          >
            Centralizar
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2" />

          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-9 h-9 rounded-full cursor-pointer border border-gray-500 p-1 bg-transparent"
          />

          <button
            onClick={() => {
              editor.chain().focus().unsetAllMarks().clearNodes().run();
              localStorage.removeItem(id);
              window.location.reload();
            }}
            className="px-4 py-2 text-red-400 hover:bg-red-900/50 rounded-full text-sm transition"
          >
            Limpar
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className={`prose prose-invert max-w-none ${className}`}
      />
    </div>
  );
}

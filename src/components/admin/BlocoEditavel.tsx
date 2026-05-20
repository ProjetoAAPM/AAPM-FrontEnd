/* Instalar: npm install @tiptap/react@latest @tiptap/starter-kit@latest @tiptap/extension-underline@latest @tiptap/extension-text-style@latest @tiptap/extension-color@latest @tiptap/extension-text-align@latest
caso de erro: desinstala node_modules e package-lock 
e instale apenas o npm install novamente*/

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useEditMode } from "../../contexts/modo_editar";
import { useEffect, useState } from "react";
import { buscarConteudo, salvarConteudo, } from "../../Services/admin/conteudoService";

type Props = {
  content: string;
  className?: string;
  id: string;
  smallText?: boolean;
};

export default function BlocoEditavel({ content, className = "", id}: Props) {
  const { editMode, activeEditorId, setActiveEditorId } = useEditMode();
  const isActive = activeEditorId === id;

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

      if (saved) {
        editor.commands.setContent(saved);
      }
    },

    onUpdate: async ({ editor }) => {
      let html = editor.getHTML();

      if (id === "sobre-texto") {
        html = html
          .replace(/<li><p>/g, `<li>`)
          .replace(/<\/p><\/li>/g, `</li>`);
      }

      await salvarConteudo(id, html);
    },
  });

  useEffect(() => {
    if (!editor) return;

    async function salvarAoSair() {
      if (!editMode) {
        await salvarConteudo(id, editor.getHTML());
      }
    }

    salvarAoSair();
  }, [editMode, editor, id]);

  useEffect(() => {
    if (editor) editor.setEditable(editMode && isActive);
  }, [editor, editMode, isActive]);

  if (!editor) return null;

  return (
    <div
      className={`relative ${editMode ? "border-2 border-dashed border-blue-400 p-3 rounded-lg" : ""}`}
      onClick={(e) => {
        e.stopPropagation();

        if (editMode) {
          setActiveEditorId(id);
          editor.commands.focus();
        }
      }}
    >
      {editMode && isActive && (
        <div className="tiptap-toolbar absolute -top-16 left-1/2
                -translate-x-1/2
                bg-[#1F2937]/95 backdrop-blur-xl border border-gray-400
                rounded-full px-3 py-2 shadow-2xl z-50
                flex items-center gap-1 max-w-[95vw]
                overflow-x-auto scrollbar-hide mx-4
                text-white">
          {!isSmallScreen && (
            <>
              <button onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-4 py-2 text-sm font-semibold hover:bg-gray-700 rounded-full transition whitespace-nowrap">
                Negrito
              </button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className="px-4 py-2 text-sm italic hover:bg-gray-700 rounded-full transition whitespace-nowrap">
                Itálico
              </button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className="px-4 py-2 text-sm underline hover:bg-gray-700 rounded-full transition whitespace-nowrap">
                Sublinhado
              </button>
            </>
          )}

          {isSmallScreen && (
            <>
              <button onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-3 py-1.5 text-xs font-semibold hover:bg-gray-700 rounded-full transition">N</button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className="px-3 py-1.5 text-xs italic hover:bg-gray-700 rounded-full transition">I</button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className="px-3 py-1.5 text-xs underline hover:bg-gray-700 rounded-full transition">S</button>
            </>
          )}

          <div className="w-px h-6 bg-gray-600 mx-1" />

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-4 py-2 text-sm hover:bg-gray-700 rounded-full transition whitespace-nowrap">
            • Lista
          </button>

          <button onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="px-4 py-2 text-sm hover:bg-gray-700 rounded-full transition whitespace-nowrap">
            Centralizar
          </button>

          <div className="w-px h-6 bg-gray-600 mx-1" />

          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-8 h-8 rounded-full cursor-pointer border border-gray-500 bg-transparent"
            title="Cor"
          />

          <button
            onClick={async () => {
              editor.commands.setContent(content);
              await salvarConteudo(id, content);
              window.location.reload();
            }}
            className="px-4 py-2 text-red-400 hover:bg-red-900/60 rounded-full text-sm transition ml-2"
          >
            Limpar
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className={`editor-reset ${className}`}
      />
    </div>
  );
}
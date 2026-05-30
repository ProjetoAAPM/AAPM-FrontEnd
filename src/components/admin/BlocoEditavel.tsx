import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useEditMode } from "../../contexts/modo_editar";
import { useEffect, useState } from "react";
import { buscarConteudo, salvarConteudo } from "../../Services/conteudoService";

type Props = {
  content: string;
  className?: string;
  id: number;
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

  const [menuMaisAberto, setMenuMaisAberto] = useState(false);

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
    content,
    editable: editMode && isActive,

    onCreate: async ({ editor }) => {
      const saved = await buscarConteudo(id);
      if (saved) editor.commands.setContent(saved);
    },

    onUpdate: async ({ editor }) => {
      let html = editor.getHTML();

      if (id === 1 || id === 2) {
        html = html
          .replace(/<li><p>/g, "<li>")
          .replace(/<\/p><\/li>/g, "</li>");
      }

      await salvarConteudo(id, html);
    },
  });

  // Fecha o submenu caso o usuário clique fora ou mude de bloco
  useEffect(() => {
    if (!isActive) setMenuMaisAberto(false);
  }, [isActive]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editMode && isActive);
    }
  }, [editor, editMode, isActive]);

  if (!editor) return null;

  return (
    <div
      className={`relative ${
        editMode
          ? `border-2 border-dashed border-blue-400 p-3 rounded-lg ${isActive ? "z-50" : "z-10"}`
          : ""
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
      {editMode && isActive && (
        <div
          className="
            absolute -top-16 left-1/2 -translate-x-1/2
            flex items-center gap-1.5
            bg-slate-900 text-white
            shadow-2xl
            rounded-xl md:rounded-full
            p-2
            w-max max-w-[95vw] md:max-w-[1330px]
            z-[9999]
            border border-slate-700/50
            animate-in fade-in zoom-in-95 duration-100
          "
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Negrito"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all ${
                editor.isActive("bold") ? "bg-blue-600 font-extrabold text-white" : "text-slate-300"
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <b>B</b>
            </button>

            <button
              type="button"
              title="Itálico"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all ${
                editor.isActive("italic") ? "bg-blue-600 italic text-white" : "text-slate-300"
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <i>I</i>
            </button>

            <button
              type="button"
              title="Sublinhado"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all ${
                editor.isActive("underline") ? "bg-blue-600 underline text-white" : "text-slate-300"
              }`}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              U
            </button>

            <button
              type="button"
              title="Lista com Marcadores"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all ${
                editor.isActive("bulletList") ? "bg-blue-600 text-white" : "text-slate-300"
              }`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              •=
            </button>
            
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all">
              <input
                type="color"
                title="Cor do Texto"
                value={editor.getAttributes("textStyle").color || "#ffffff"}
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                className="w-5 h-5 p-0 border border-slate-600 rounded-md cursor-pointer bg-transparent"
              />
            </div>
          </div>

          <span className="w-[1px] h-5 bg-slate-700 block" />

          <div className="hidden md:flex items-center gap-1.5">
            <select
              className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 cursor-pointer outline-none text-slate-200"
              value={editor.getAttributes("textStyle").fontFamily || ""}
              onChange={(e) => {
                const v = e.target.value;
                v ? editor.chain().focus().setFontFamily(v).run() : editor.chain().focus().unsetFontFamily().run();
              }}
            >
              <option value="">Fonte Padrão</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times</option>
            </select>

            <span className="w-[1px] h-5 bg-slate-700 block" />

            <button
              type="button"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 ${editor.isActive({ textAlign: "left" }) ? "bg-slate-700 text-blue-400" : "text-slate-300"}`}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              ⬅
            </button>
            <button
              type="button"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 ${editor.isActive({ textAlign: "center" }) ? "bg-slate-700 text-blue-400" : "text-slate-300"}`}
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              ⬌
            </button>
            <button
              type="button"
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-800 ${editor.isActive({ textAlign: "right" }) ? "bg-slate-700 text-blue-400" : "text-slate-300"}`}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              ➡
            </button>
          </div>

          <div className="relative block md:hidden">
            <button
              type="button"
              onClick={() => setMenuMaisAberto(!menuMaisAberto)}
              className={`w-8 h-8 rounded-lg flex flex-col gap-0.5 items-center justify-center transition-all ${
                menuMaisAberto ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              title="Mais opções de formatação"
            >
              <span className="w-4 h-0.5 bg-current rounded-full" />
              <span className="w-4 h-0.5 bg-current rounded-full" />
              <span className="w-4 h-0.5 bg-current rounded-full" />
            </button>

            {menuMaisAberto && (
              <div
                className="
                  absolute bottom-full right-0 mb-2
                  flex flex-col gap-3
                  bg-slate-900 border border-slate-700
                  p-3 rounded-xl shadow-2xl
                  w-48
                  animate-in slide-in-from-bottom-2 duration-150
                "
              >
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Fonte</label>
                  <select
                    className="text-xs bg-slate-800 border border-slate-700 rounded-md px-2 py-1.5 cursor-pointer outline-none text-slate-200 w-full"
                    value={editor.getAttributes("textStyle").fontFamily || ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      v ? editor.chain().focus().setFontFamily(v).run() : editor.chain().focus().unsetFontFamily().run();
                    }}
                  >
                    <option value="">Padrão</option>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times</option>
                  </select>
                </div>

                <div className="h-[1px] bg-slate-800" />

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">Alinhamento</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-lg">
                    <button
                      type="button"
                      className={`py-1 rounded text-center ${editor.isActive({ textAlign: "left" }) ? "bg-blue-600 text-white" : "text-slate-300"}`}
                      onClick={() => { editor.chain().focus().setTextAlign("left").run(); setMenuMaisAberto(false); }}
                    >
                      ⬅
                    </button>
                    <button
                      type="button"
                      className={`py-1 rounded text-center ${editor.isActive({ textAlign: "center" }) ? "bg-blue-600 text-white" : "text-slate-300"}`}
                      onClick={() => { editor.chain().focus().setTextAlign("center").run(); setMenuMaisAberto(false); }}
                    >
                      ⬌
                    </button>
                    <button
                      type="button"
                      className={`py-1 rounded text-center ${editor.isActive({ textAlign: "right" }) ? "bg-blue-600 text-white" : "text-slate-300"}`}
                      onClick={() => { editor.chain().focus().setTextAlign("right").run(); setMenuMaisAberto(false); }}
                    >
                      ➡
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <EditorContent editor={editor} className={`editor-reset ${className}`} />
    </div>
  );
}
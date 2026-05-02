import { useEffect } from "react";
import { useEditMode } from "../../context_admin/modo_editar";

export default function GlobalClickHandler() {
  const { setActiveEditorId } = useEditMode();

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest(".ProseMirror") || e.target.closest(".tiptap-toolbar")) {
        return;
      }

      setActiveEditorId(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
import { useEffect } from "react";
import { useEditMode } from "../../contexts/modo_editar";

export default function GlobalClickHandler() {
  const { setActiveEditorId } = useEditMode();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".ProseMirror") || target.closest(".tiptap-toolbar")) {
        return;
      }

      setActiveEditorId(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setActiveEditorId]);

  return null;
}

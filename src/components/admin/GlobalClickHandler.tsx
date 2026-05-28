import { useEffect } from "react";
import { useEditMode } from "../../contexts/modo_editar";

export default function GlobalClickHandler() {
  const { editMode, setActiveEditorId } = useEditMode();

  useEffect(() => {
    if (!editMode) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest(".editor-reset") || 
        target.closest(".ProseMirror") ||
        target.closest(".small-screen-editor") ||
        target.closest("button") ||
        target.closest("select") ||
        target.closest("input")
      ) {
        return;
      }

      setActiveEditorId("");
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [editMode, setActiveEditorId]);

  return null;
}
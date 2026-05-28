import { createContext, useContext, useState } from "react";

type EditContextType = {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  activeEditorId: string | null;
  setActiveEditorId: (id: string | null) => void;
};

const EditModeContext = createContext<EditContextType | null>(null);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [activeEditorId, setActiveEditorId] = useState<string | null>(null);

  return (
    <EditModeContext.Provider
      value={{ editMode, setEditMode, activeEditorId, setActiveEditorId }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used inside provider");
  return ctx;
}
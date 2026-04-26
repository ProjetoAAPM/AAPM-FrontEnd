NA PASTA COMPONENTES SO CRIA A PASTA ADMIN - EditorCK.tsx 


import React, { useState, useId } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const EditorCK = ({ isEditing, initialData, onChange, className }: any) => {
  const CKEditorComponent = CKEditor as any;
  const [isActive, setIsActive] = useState(false);

  const uniqueId = useId().replace(/:/g, "");
  const toolbarId = `toolbar-${uniqueId}`;

  if (!isEditing) {
    return (
      <div
        className={`${className} ck-content`}
        dangerouslySetInnerHTML={{ __html: initialData }}
      />
    );
  }

  return (
    <div className={`${className} relative`}>
      <div
        id={toolbarId}
        className={`absolute -top-16 left-1/2 -translate-x-1/2 z-[100] w-max transition-opacity duration-300
          ${isActive ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <CKEditorComponent
        editor={DecoupledEditor}
        data={initialData}
        config={{
          toolbar: [
            'heading', '|', 'bold', 'italic', 'underline',
            'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize',
            '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo'
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Parágrafo', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Título 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Título 2', class: 'ck-heading_heading2' }
            ]
          }
        }}
        onReady={(editor: any) => {
          const toolbarElement = editor.ui.view.toolbar.element;
          const toolbarContainer = document.querySelector(`#${toolbarId}`);

          if (toolbarContainer && toolbarElement) {
            toolbarContainer.innerHTML = "";
            toolbarElement.style.setProperty('background-color', '#1a1a1a', 'important');
            toolbarElement.style.setProperty('background', '#1a1a1a', 'important');
            toolbarElement.style.setProperty('border-radius', '100px', 'important');
            toolbarElement.style.setProperty('border', '1px solid #333', 'important');
            toolbarElement.style.setProperty('display', 'flex', 'important');
            toolbarElement.style.setProperty('padding', '4px 12px', 'important');

            const nodes = toolbarElement.querySelectorAll('.ck-icon, .ck-button__label, .ck-icon *');
            nodes.forEach((node: any) => {
              node.style.setProperty('color', '#ffffff', 'important');
              node.style.setProperty('fill', '#ffffff', 'important');
            });

            toolbarContainer.appendChild(toolbarElement);
          }
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={(_event: any, editor: any) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
};

export default EditorCK;

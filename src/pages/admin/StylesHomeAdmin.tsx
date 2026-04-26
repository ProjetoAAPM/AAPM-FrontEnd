import React from 'react';

const StylesHomeAdmin = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .ck-content, 
      .ck-content *, 
      .ck-editor__editable_inline, 
      .ck-editor__editable_inline *, 
      .hero-text-container, 
      .hero-text-container * {
        color: white !important;
        font-family: inherit !important;
      }

      .ck-content h1,
      .ck-editor__editable_inline h1,
      .hero-text-container h1 {
        font-weight: 700 !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        font-size: 1.5rem !important;
      }

      @media (min-width: 768px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 2rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 3rem !important;
        }
      }

      .ck-content p:nth-of-type(1),
      .ck-editor__editable_inline p:nth-of-type(1),
      .hero-text-container p:nth-of-type(1) {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-top: 1rem !important;
        font-weight: 500 !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.875rem !important;
        }
      }

      .ck-content p:nth-of-type(2),
      .ck-editor__editable_inline p:nth-of-type(2),
      .hero-text-container p:nth-of-type(2) {
        opacity: 0.9 !important;
        font-size: 1rem !important;
        margin-top: 1rem !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.5rem !important;
        }
      }

      .ck-content h1 span,
      .ck-editor__editable_inline h1 span,
      .hero-text-container h1 span {
        color: #FFDB4B !important;
      }

      .ck-content h3,
      .ck-editor__editable_inline h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #EFBF04 !important;
        color: white !important;
        margin-bottom: 1rem !important;
      }

      .ck-content p,
      .ck-editor__editable_inline p {
        color: #e5e7eb !important;
      }

      .ck-content ul,
      .ck-editor__editable_inline ul {
        list-style: disc !important;
        padding-left: 20px !important;
      }

      .ck-content li,
      .ck-editor__editable_inline li {
        font-size: 1.25rem !important;
        color: #e5e7eb !important;
      }

      .ck-content strong,
      .ck-editor__editable_inline strong {
        color: white !important;
        font-weight: 600 !important;
      }

      .btn-hero-fix {
        background-color: #C83D3D !important;
        color: white !important;
        border-radius: 9999px !important;
        width: 194px !important;
        height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
        margin-top: 2.5rem !important;
        border: none !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }

      .btn-hero-fix:hover {
        background-color: #b03535 !important;
      }

      .ck.ck-editor__main > .ck-editor__editable,
      .ck.ck-editor__main > .ck-editor__editable.ck-focused,
      .ck-editor__editable:focus,
      .ck-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ck-balloon-panel { 
        z-index: 9999 !important; 
      }

      [id^="toolbar-"] { 
        background: transparent !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        width: fit-content !important;
        margin: 0 auto !important;
      }

      .ck.ck-toolbar {
        background-color: rgba(255,255,255,0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 100px !important;
        padding: 6px 20px !important;
        border: 1px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2) !important;
      }

      .ck.ck-toolbar * {
        color: black !important;
        fill: black !important;
      }

      .ck.ck-button svg {
        color: black !important;
        fill: black !important;
      }.ck-content, 
      .ck-content *, 
      .ck-editor__editable_inline, 
      .ck-editor__editable_inline *, 
      .hero-text-container, 
      .hero-text-container * {
        color: white !important;
        font-family: inherit !important;
      }

      .ck-content h1,
      .ck-editor__editable_inline h1,
      .hero-text-container h1 {
        font-weight: 700 !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        font-size: 1.5rem !important;
      }

      @media (min-width: 768px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 2rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 3rem !important;
        }
      }

      .ck-content p:nth-of-type(1),
      .ck-editor__editable_inline p:nth-of-type(1),
      .hero-text-container p:nth-of-type(1) {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-top: 1rem !important;
        font-weight: 500 !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.875rem !important;
        }
      }

      .ck-content p:nth-of-type(2),
      .ck-editor__editable_inline p:nth-of-type(2),
      .hero-text-container p:nth-of-type(2) {
        opacity: 0.9 !important;
        font-size: 1rem !important;
        margin-top: 1rem !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.5rem !important;
        }
      }

      .ck-content h1 span,
      .ck-editor__editable_inline h1 span,
      .hero-text-container h1 span {
        color: #FFDB4B !important;
      }

      .ck-content h3,
      .ck-editor__editable_inline h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #EFBF04 !important;
        color: white !important;
        margin-bottom: 1rem !important;
      }

      .ck-content p,
      .ck-editor__editable_inline p {
        color: #e5e7eb !important;
      }

      .ck-content ul,
      .ck-editor__editable_inline ul {
        list-style: disc !important;
        padding-left: 20px !important;
      }

      .ck-content li,
      .ck-editor__editable_inline li {
        font-size: 1.25rem !important;
        color: #e5e7eb !important;
      }

      .ck-content strong,
      .ck-editor__editable_inline strong {
        color: white !important;
        font-weight: 600 !important;
      }

      .btn-hero-fix {
        background-color: #C83D3D !important;
        color: white !important;
        border-radius: 9999px !important;
        width: 194px !important;
        height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
        margin-top: 2.5rem !important;
        border: none !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }

      .btn-hero-fix:hover {
        background-color: #b03535 !important;
      }

      .ck.ck-editor__main > .ck-editor__editable,
      .ck.ck-editor__main > .ck-editor__editable.ck-focused,
      .ck-editor__editable:focus,
      .ck-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ck-balloon-panel { 
        z-index: 9999 !important; 
      }

      [id^="toolbar-"] { 
        background: transparent !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        width: fit-content !important;
        margin: 0 auto !important;
      }

      .ck.ck-toolbar {
        background-color: rgba(255,255,255,0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 100px !important;
        padding: 6px 20px !important;
        border: 1px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2) !important;
      }

      .ck.ck-toolbar * {
        color: black !important;
        fill: black !important;
      }

      .ck.ck-button svg {
        color: black !important;
        fill: black !important;
      }.ck-content, 
      .ck-content *, 
      .ck-editor__editable_inline, 
      .ck-editor__editable_inline *, 
      .hero-text-container, 
      .hero-text-container * {
        color: white !important;
        font-family: inherit !important;
      }

      .ck-content h1,
      .ck-editor__editable_inline h1,
      .hero-text-container h1 {
        font-weight: 700 !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        font-size: 1.5rem !important;
      }

      @media (min-width: 768px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 2rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 3rem !important;
        }
      }

      .ck-content p:nth-of-type(1),
      .ck-editor__editable_inline p:nth-of-type(1),
      .hero-text-container p:nth-of-type(1) {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-top: 1rem !important;
        font-weight: 500 !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.875rem !important;
        }
      }

      .ck-content p:nth-of-type(2),
      .ck-editor__editable_inline p:nth-of-type(2),
      .hero-text-container p:nth-of-type(2) {
        opacity: 0.9 !important;
        font-size: 1rem !important;
        margin-top: 1rem !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.5rem !important;
        }
      }

      .ck-content h1 span,
      .ck-editor__editable_inline h1 span,
      .hero-text-container h1 span {
        color: #FFDB4B !important;
      }

      .ck-content h3,
      .ck-editor__editable_inline h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #EFBF04 !important;
        color: white !important;
        margin-bottom: 1rem !important;
      }

      .ck-content p,
      .ck-editor__editable_inline p {
        color: #e5e7eb !important;
      }

      .ck-content ul,
      .ck-editor__editable_inline ul {
        list-style: disc !important;
        padding-left: 20px !important;
      }

      .ck-content li,
      .ck-editor__editable_inline li {
        font-size: 1.25rem !important;
        color: #e5e7eb !important;
      }

      .ck-content strong,
      .ck-editor__editable_inline strong {
        color: white !important;
        font-weight: 600 !important;
      }

      .btn-hero-fix {
        background-color: #C83D3D !important;
        color: white !important;
        border-radius: 9999px !important;
        width: 194px !important;
        height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
        margin-top: 2.5rem !important;
        border: none !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }

      .btn-hero-fix:hover {
        background-color: #b03535 !important;
      }

      .ck.ck-editor__main > .ck-editor__editable,
      .ck.ck-editor__main > .ck-editor__editable.ck-focused,
      .ck-editor__editable:focus,
      .ck-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ck-balloon-panel { 
        z-index: 9999 !important; 
      }

      [id^="toolbar-"] { 
        background: transparent !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        width: fit-content !important;
        margin: 0 auto !important;
      }

      .ck.ck-toolbar {
        background-color: rgba(255,255,255,0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 100px !important;
        padding: 6px 20px !important;
        border: 1px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2) !important;
      }

      .ck.ck-toolbar * {
        color: black !important;
        fill: black !important;
      }

      .ck.ck-button svg {
        color: black !important;
        fill: black !important;
      }.ck-content, 
      .ck-content *, 
      .ck-editor__editable_inline, 
      .ck-editor__editable_inline *, 
      .hero-text-container, 
      .hero-text-container * {
        color: white !important;
        font-family: inherit !important;
      }

      .ck-content h1,
      .ck-editor__editable_inline h1,
      .hero-text-container h1 {
        font-weight: 700 !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        font-size: 1.5rem !important;
      }

      @media (min-width: 768px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 2rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 3rem !important;
        }
      }

      .ck-content p:nth-of-type(1),
      .ck-editor__editable_inline p:nth-of-type(1),
      .hero-text-container p:nth-of-type(1) {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-top: 1rem !important;
        font-weight: 500 !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.875rem !important;
        }
      }

      .ck-content p:nth-of-type(2),
      .ck-editor__editable_inline p:nth-of-type(2),
      .hero-text-container p:nth-of-type(2) {
        opacity: 0.9 !important;
        font-size: 1rem !important;
        margin-top: 1rem !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.5rem !important;
        }
      }

      .ck-content h1 span,
      .ck-editor__editable_inline h1 span,
      .hero-text-container h1 span {
        color: #FFDB4B !important;
      }

      .ck-content h3,
      .ck-editor__editable_inline h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #EFBF04 !important;
        color: white !important;
        margin-bottom: 1rem !important;
      }

      .ck-content p,
      .ck-editor__editable_inline p {
        color: #e5e7eb !important;
      }

      .ck-content ul,
      .ck-editor__editable_inline ul {
        list-style: disc !important;
        padding-left: 20px !important;
      }

      .ck-content li,
      .ck-editor__editable_inline li {
        font-size: 1.25rem !important;
        color: #e5e7eb !important;
      }

      .ck-content strong,
      .ck-editor__editable_inline strong {
        color: white !important;
        font-weight: 600 !important;
      }

      .btn-hero-fix {
        background-color: #C83D3D !important;
        color: white !important;
        border-radius: 9999px !important;
        width: 194px !important;
        height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
        margin-top: 2.5rem !important;
        border: none !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }

      .btn-hero-fix:hover {
        background-color: #b03535 !important;
      }

      .ck.ck-editor__main > .ck-editor__editable,
      .ck.ck-editor__main > .ck-editor__editable.ck-focused,
      .ck-editor__editable:focus,
      .ck-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ck-balloon-panel { 
        z-index: 9999 !important; 
      }

      [id^="toolbar-"] { 
        background: transparent !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        width: fit-content !important;
        margin: 0 auto !important;
      }

      .ck.ck-toolbar {
        background-color: rgba(255,255,255,0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 100px !important;
        padding: 6px 20px !important;
        border: 1px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2) !important;
      }

      .ck.ck-toolbar * {
        color: black !important;
        fill: black !important;
      }

      .ck.ck-button svg {
        color: black !important;
        fill: black !important;
      }.ck-content, 
      .ck-content *, 
      .ck-editor__editable_inline, 
      .ck-editor__editable_inline *, 
      .hero-text-container, 
      .hero-text-container * {
        color: white !important;
        font-family: inherit !important;
      }

      .ck-content h1,
      .ck-editor__editable_inline h1,
      .hero-text-container h1 {
        font-weight: 700 !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        font-size: 1.5rem !important;
      }

      @media (min-width: 768px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 2rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content h1,
        .ck-editor__editable_inline h1,
        .hero-text-container h1 {
          font-size: 3rem !important;
        }
      }

      .ck-content p:nth-of-type(1),
      .ck-editor__editable_inline p:nth-of-type(1),
      .hero-text-container p:nth-of-type(1) {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        margin-top: 1rem !important;
        font-weight: 500 !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(1),
        .ck-editor__editable_inline p:nth-of-type(1),
        .hero-text-container p:nth-of-type(1) {
          font-size: 1.875rem !important;
        }
      }

      .ck-content p:nth-of-type(2),
      .ck-editor__editable_inline p:nth-of-type(2),
      .hero-text-container p:nth-of-type(2) {
        opacity: 0.9 !important;
        font-size: 1rem !important;
        margin-top: 1rem !important;
      }

      @media (min-width: 768px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.25rem !important;
        }
      }

      @media (min-width: 1024px) {
        .ck-content p:nth-of-type(2),
        .ck-editor__editable_inline p:nth-of-type(2),
        .hero-text-container p:nth-of-type(2) {
          font-size: 1.5rem !important;
        }
      }

      .ck-content h1 span,
      .ck-editor__editable_inline h1 span,
      .hero-text-container h1 span {
        color: #FFDB4B !important;
      }

      .ck-content h3,
      .ck-editor__editable_inline h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #EFBF04 !important;
        color: white !important;
        margin-bottom: 1rem !important;
      }

      .ck-content p,
      .ck-editor__editable_inline p {
        color: #e5e7eb !important;
      }

      .ck-content ul,
      .ck-editor__editable_inline ul {
        list-style: disc !important;
        padding-left: 20px !important;
      }

      .ck-content li,
      .ck-editor__editable_inline li {
        font-size: 1.25rem !important;
        color: #e5e7eb !important;
      }

      .ck-content strong,
      .ck-editor__editable_inline strong {
        color: white !important;
        font-weight: 600 !important;
      }

      .btn-hero-fix {
        background-color: #C83D3D !important;
        color: white !important;
        border-radius: 9999px !important;
        width: 194px !important;
        height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
        margin-top: 2.5rem !important;
        border: none !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }

      .btn-hero-fix:hover {
        background-color: #b03535 !important;
      }

      .ck.ck-editor__main > .ck-editor__editable,
      .ck.ck-editor__main > .ck-editor__editable.ck-focused,
      .ck-editor__editable:focus,
      .ck-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .ck-balloon-panel { 
        z-index: 9999 !important; 
      }

      [id^="toolbar-"] { 
        background: transparent !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        width: fit-content !important;
        margin: 0 auto !important;
      }

      .ck.ck-toolbar {
        background-color: rgba(255,255,255,0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 100px !important;
        padding: 6px 20px !important;
        border: 1px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2) !important;
      }

      .ck.ck-toolbar * {
        color: black !important;
        fill: black !important;
      }

      .ck.ck-button svg {
        color: black !important;
        fill: black !important;
      }
    `}} />
  );
};

export default StylesHomeAdmin;
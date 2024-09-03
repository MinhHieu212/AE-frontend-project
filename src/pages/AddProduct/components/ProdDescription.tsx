import React, { useRef } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductFormProps } from "../types/ProductFormProps";
import { IconUpload } from "@tabler/icons-react";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProdDescription: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: formData.description,
    onUpdate: ({ editor: _editor }) => {
      updateField("description", _editor.getHTML());
    },
  });

  const handleParseTxtFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        const htmlContent = content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/\n/g, "<br>")
          .replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));

        console.log("HTML content:", htmlContent);
        updateField("description", htmlContent);
        editor?.commands.setContent(htmlContent);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg">
        Description <span className="text-red-600"> *</span>
      </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#aca4a4] text-sm">
            Product name <span className="text-red-600"> *</span>
          </p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {startValidate && errors.name && (
            <p className="my-2 text-[#f12727] text-sm">
              {startValidate && errors.name}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 pb-1 text-[#aca4a4] text-sm">
              Business Description <span className="text-red-600"> *</span>
            </p>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              className="capitalize"
              startIcon={<IconUpload size={20} className="mb-[1px]" />}
            >
              Upload .txt files
              <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                onInput={handleParseTxtFile}
                accept=".txt"
                multiple
              />
            </Button>
          </div>
          <RichTextEditor
            editor={editor}
            w="100%"
            styles={{
              content: {
                minHeight: "82px",
                maxHeight: "420px",
                overflow: "scroll",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              },
            }}
          >
            <RichTextEditor.Toolbar>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            {editor && (
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Link />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            )}
            <RichTextEditor.Content />
          </RichTextEditor>
          {startValidate && errors.description && (
            <p className="my-2 text-[#f12727] text-sm">
              {startValidate && errors.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;

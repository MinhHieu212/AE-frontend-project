import React from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductFormProps } from "../types/ProductFormProps";
import { IconUpload } from "@tabler/icons-react";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
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
}) => {
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
          .replace(/\n/g, "<br>")
          .replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));

        console.log("HTML content:", htmlContent);

        updateField("description", htmlContent);
        editor?.commands.setContent(htmlContent);
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg">Description</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 text-[#cac4c4] text-sm">Product name</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            className="pb-4"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 pb-1 text-[#cac4c4] text-sm">
              Business Description
            </p>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              className="capitalize"
              startIcon={<IconUpload size={22} className="mb-[1px]" />}
            >
              Upload .txt files
              <VisuallyHiddenInput
                type="file"
                onChange={handleParseTxtFile}
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
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              },
            }}
          >
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
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

            <RichTextEditor.Content />
          </RichTextEditor>
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;

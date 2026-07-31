'use client'

import { usePackage } from "@/components/admin/context/PackageContext"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {TextStyle} from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { Extension } from '@tiptap/core'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  PilcrowSquare, // For paragraph
} from 'lucide-react'

// Create a FontSize extension
const FontSize = Extension.create({
  name: 'fontSize',

  addAttributes() {
    return {
      fontSize: {
        default: '16px',
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.fontSize) return {}
          return {
            style: `font-size: ${attributes.fontSize}`
          }
        }
      }
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: '16px',
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {}
              return {
                style: `font-size: ${attributes.fontSize}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize });
      },
    }
  }
})

// Create a LineHeight extension
const LineHeight = Extension.create({
  name: 'lineHeight',

  addAttributes() {
    return {
      lineHeight: {
        default: '1',
        parseHTML: element => String(element.style.lineHeight),
        renderHTML: attributes => {
          if (!attributes.lineHeight) return {}
          return {
            style: `line-height: ${attributes.lineHeight}`
          }
        }
      }
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          lineHeight: {
            default: '1.5',
            parseHTML: element => String(element.style.lineHeight),
            renderHTML: attributes => {
              if (!attributes.lineHeight) return {}
              return {
                style: `line-height: ${attributes.lineHeight}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setLineHeight: lineHeight => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight: String(lineHeight) });
      },
    }
  }
})

const MenuBar = ({ editor }) => {
  const [showUrlPopup, setShowUrlPopup] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  if (!editor) {
    return null
  }

  const fontSizes = [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'
  ]

  const lineHeights = [
    '0.5', '0.75', '1', '1.2', '1.5', '1.8', '2', '2.5', '3'
  ]

  const handleUrlSubmit = () => {
    if (urlInput) {
      editor.chain().focus().setLink({ href: urlInput }).run();
    }
    setShowUrlPopup(false);
    setUrlInput('');
  }

  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-2 relative">
      {/* Text Style Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('paragraph') ? 'bg-border' : ''}`}
          title="Paragraph"
        >
          <PilcrowSquare className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('heading', { level: 1 }) ? 'bg-border' : ''}`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('heading', { level: 2 }) ? 'bg-border' : ''}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('heading', { level: 3 }) ? 'bg-border' : ''}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>
      </div>

      {/* Basic Formatting Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('bold') ? 'bg-border' : ''}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('italic') ? 'bg-border' : ''}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('underline') ? 'bg-border' : ''}`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('strike') ? 'bg-border' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
      </div>

      {/* Alignment Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive({ textAlign: 'left' }) ? 'bg-border' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive({ textAlign: 'center' }) ? 'bg-border' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive({ textAlign: 'right' }) ? 'bg-border' : ''}`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lists Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('bulletList') ? 'bg-border' : ''}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('orderedList') ? 'bg-border' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {/* Special Formatting Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('blockquote') ? 'bg-border' : ''}`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('code') ? 'bg-border' : ''}`}
          title="Code"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <input
          type="color"
          onInput={event => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-8 h-8 p-1 rounded cursor-pointer"
          title="Text Color"
        />
      </div>

      {/* Links Group */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <button
          type="button"
          onClick={() => setShowUrlPopup(true)}
          className={`p-2 rounded hover:bg-surface ${editor.isActive('link') ? 'bg-border' : ''}`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* URL Popup Modal */}
      {showUrlPopup && (
        <div className="absolute left-1/2 top-12 -translate-x-1/2 z-50 bg-white border border-border rounded shadow-lg p-4 flex flex-col items-center min-w-[220px]">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="url-input" className="font-ui text-sm text-heading">Enter URL</Label>
            <input
              id="url-input"
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              className="border border-border px-2 py-1 rounded-[var(--radius-input)] w-full"
              placeholder="https://example.com"
              required
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowUrlPopup(false)} className="px-3 py-1 rounded bg-border hover:bg-border">Cancel</button>
              <button type="button" onClick={handleUrlSubmit} className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary-hover">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* History Group */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-surface disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-surface disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Font Size Dropdown */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <select
          className="p-1 rounded bg-transparent border border-border hover:bg-surface"
          onChange={e => {
            if (e.target.value) {
              editor.chain().focus().setFontSize(e.target.value).run()
            }
          }}
          value={editor.getAttributes('textStyle').fontSize || '16px'}
        >
          <option value="">Font Size</option>
          {fontSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Line Height Dropdown */}
      <div className="flex items-center gap-1 border-r border-border pr-2">
        <select
          className="p-1 rounded bg-transparent border border-border hover:bg-surface"
          onChange={e => {
            if (e.target.value) {
              editor.chain().focus().setLineHeight(String(e.target.value)).run()
            }
          }}
          value={editor.getAttributes('textStyle').lineHeight || '1.5'}
        >
          <option value="">Line Height</option>
          {lineHeights.map(height => (
            <option key={height} value={height}>
              {height}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const AddInfo = () => {
  const { handleSubmit, register, setValue, reset, watch } = useForm()
  const packages = usePackage()
  const selectedType = watch("info.typeOfSelection")

  const [editItem, setEditItem] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editorContent, setEditorContent] = useState('');
  const addEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle.configure({ types: ['textStyle'] }),
      FontSize.configure(),
      LineHeight.configure(),
      FontFamily,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Color,
      ListItem,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setValue('info.selectionDesc', editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    }
  });
  const editEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle.configure({ types: ['textStyle'] }),
      FontSize.configure(),
      LineHeight.configure(),
      FontFamily,
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Color,
      ListItem,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setValue('info.selectionDesc', editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    }
  });

  // Filter "Day Plan" info
  const dayPlanInfo = packages.info.filter(info => info.typeOfSelection === "Day Plan")
  // Filter other info
  const otherInfo = packages.info.filter(info => info.typeOfSelection !== "Day Plan")

  useEffect(() => {
    if (isOpen && !editItem&& addEditor) {
      setEditorContent('');
      setValue('info.selectionDesc', '');
      if (addEditor) addEditor.commands.setContent('');
    }
  }, [isOpen, editItem, setValue]);

  useEffect(() => {
    if (editItem) {
      setEditorContent(editItem.selectionDesc || '');
      setValue('info.selectionDesc', editItem.selectionDesc || '');
      if (editEditor) editEditor.commands.setContent(editItem.selectionDesc || '');
    }
  }, [editItem, setValue]);

  const onSubmit = async (data) => {
    data.pkgId = packages._id

    if (!data.info.typeOfSelection || !data.info.selectionTitle || !data.info.selectionDesc) {
      toast.error("All fields are required", {
        style: {
          border: "2px solid red",
          borderRadius: "10px"
        }
      })
      return
    }

    const packageDuration = packages.basicDetails?.duration || 0

    // Validate Day Plan count against package duration
    if (data.info.typeOfSelection === "Day Plan" && dayPlanInfo.length >= packageDuration && !editItem) {
      toast.error(`Cannot add more Day Plans than package duration (${packageDuration} days)`, {
        style: {
          border: "2px solid red",
          borderRadius: "10px"
        }
      })
      return
    }

    try {
      const response = await fetch("/api/admin/website-manage/addPackage/addInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const res = await response.json()

      if (response.ok) {
        toast.success("Info added successfully!", {
          style: {
            border: "2px solid green",
            borderRadius: "10px"
          }
        })
        window.location.reload()
      } else {
        toast.error(`Failed To Update Package: ${res.message}`, {
          style: {
            border: "2px solid red",
            borderRadius: "10px"
          }
        })
      }
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          border: "2px solid red",
          borderRadius: "10px"
        }
      })
    }
  }

  const handleUpdate = async (data) => {
    data.info._id = editItem._id;
    try {
      const response = await fetch(`/api/admin/website-manage/addPackage/addInfo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pkgId: packages._id,
          info: data.info,
        }),
      });

      const res = await response.json();

      if (response.ok) {
        toast.success("Info updated successfully!", { style: { borderRadius: "10px", border: "2px solid green" } });
        window.location.reload();
        setEditItem(null);
      } else {
        toast.error(`Failed to update Info`, { style: { borderRadius: "10px", border: "2px solid red" } });
      }
    } catch (error) {
      toast.error("Error updating Info", { style: { borderRadius: "10px", border: "2px solid red" } });
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsOpen(true);
    setValue("info.typeOfSelection", item.typeOfSelection);
    setValue("info.selectionTitle", item.selectionTitle);
    setValue("info.selectionDesc", item.selectionDesc);
    setValue("info.order", item.order);
  };

  const deleteMenuItem = async (InfoId) => {
    const id = packages._id;
    try {
      const response = await fetch(`/api/admin/website-manage/addPackage/addInfo`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, InfoId }),
      });

      if (response.ok) {
        toast.success("Info deleted successfully!", { style: { borderRadius: "10px", border: "2px solid green" } });
        window.location.reload();
      } else {
        toast.error("Failed to delete info", { style: { borderRadius: "10px", border: "2px solid red" } });
      }
    } catch (error) {
      console.error("Error deleting info:", error);
    }
  };

  const handleTypeChange = (value) => {
    setValue("info.typeOfSelection", value);
  };

  return (
    <>
      <div className="flex w-full max-w-full flex-col gap-8 rounded-[var(--radius-card)] bg-white p-6 font-body ring-1 ring-border/50 md:p-8">
        <h1 className="font-heading text-3xl text-heading md:text-4xl">Add Info</h1>
        <Button onClick={() => setIsOpen(true)}>
          Add Info
        </Button>

        {dayPlanInfo.length >= packages?.basicDetails?.duration && (
          <div className="text-error font-bold">
            Maximum Day Plans ({packages.basicDetails?.duration}) reached for this package
          </div>
        )}

        {/* Main Table for Non-Day Plan Info */}
        <Table className="max-w-5xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-heading w-1/3">Section</TableHead>
              <TableHead className="w-1/3 text-heading text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherInfo.length > 0 ? (
              otherInfo.sort((a, b) => a.order - b.order).map((info) => (
                <TableRow key={info._id} >
                  <TableCell className="border font-semibold border-border w-5/6"><Badge className="py-1.5 mr-4">{info?.typeOfSelection}</Badge>{info?.selectionTitle}</TableCell>
                  <TableCell className="border font-semibold border-border">
                    <div className="flex items-center justify-center gap-6">
                      <Button size="icon" onClick={() => handleEdit(info)} variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" onClick={() => deleteMenuItem(info._id)} variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))) : (
              <TableRow>
                <TableCell colSpan={4} className="border font-semibold border-border text-center">
                  No Info Added
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Day Plan Table */}
        <div className="w-full max-w-5xl mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-heading">Day Plan Details ({dayPlanInfo.length}/{packages.basicDetails?.duration})</h2>
          <Table className="max-w-5xl mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-heading w-2/3">Day</TableHead>
                <TableHead className="w-1/3 text-heading text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dayPlanInfo.length > 0 ? (
                dayPlanInfo.sort((a, b) => a.order - b.order).map((info) => (
                  <TableRow key={info._id}>
                    <TableCell className="border font-semibold border-border w-5/6"><Badge className="py-1.5 mr-4">{info?.typeOfSelection}</Badge>{info.selectionTitle}</TableCell>
                    <TableCell className="border font-semibold border-border">
                      <div className="flex items-center justify-center gap-6">
                        <Button size="icon" onClick={() => handleEdit(info)} variant="outline">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" onClick={() => deleteMenuItem(info._id)} variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="border font-semibold border-border text-center">
                    No Day Plan Added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add/Edit Info Dialogs */}
        {isOpen && (
          <Dialog open={!!isOpen} onOpenChange={() => { setIsOpen(false); window.location.reload(); }}>
            <DialogContent className="md:!max-w-3xl font-body">
              <DialogHeader>
                <DialogTitle>Add Info</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div className="flex flex-col gap-2 col-span-4">
                    <Label htmlFor="typeOfSelection" className="font-ui text-sm text-heading">Type Of Selection</Label>
                    <Select
                      name="typeOfSelection"
                      className="p-2 border border-border rounded-md"
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger className="border-2 bg-transparent border-border focus:border-border focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Type Of Selection" />
                      </SelectTrigger>
                      <SelectContent className="border border-border bg-white">
                        <SelectGroup>
                          <SelectItem
                            className="focus:bg-primary/20 font-bold"
                            value="Day Plan"
                            disabled={dayPlanInfo.length >= packages.basicDetails?.duration && !editItem}
                          >
                            Day Plan
                          </SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Inclusions">Inclusions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Exclusions">Exclusions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Location Map">Location Map</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Policy Content">Policy Content</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Frequently Asked Questions">Frequently Asked Questions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Important Information">Important Information</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {selectedType === "Day Plan" && dayPlanInfo.length >= packages.basicDetails?.duration && !editItem && (
                      <div className="text-error font-bold">
                        Maximum Day Plans ({packages.basicDetails?.duration}) reached for this package
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 col-span-3">
                    <Label className="font-ui text-sm text-heading">Main Title Heading</Label>
                    <Input {...register("info.selectionTitle")} />
                  </div>
                  <div className="flex flex-col gap-2 col-span-4">
                    <Label htmlFor="selectionDesc" className="font-ui text-sm text-heading">Description</Label>
                    <div className="border border-border rounded-[var(--radius-input)]">
                      <MenuBar editor={addEditor} />
                      <EditorContent
                        editor={addEditor}
                        className="h-[250px] overflow-y-auto min-h-[100px] p-2 prose max-w-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {editItem && (
          <Dialog open={!!editItem} onOpenChange={() => { setEditItem(null); window.location.reload(); }}>
            <DialogContent className="md:!max-w-3xl font-body">
              <DialogHeader>
                <DialogTitle>Edit Info</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div className="flex flex-col gap-2 col-span-4">
                    <Label htmlFor="typeOfSelection" className="font-ui text-sm text-heading">Type Of Selection</Label>
                    <Select name="typeOfSelection" className="p-2 border border-border rounded-md" defaultValue={editItem.typeOfSelection} onValueChange={handleTypeChange}>
                      <SelectTrigger className="border-2 bg-transparent border-border focus:border-border focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Type Of Selection" />
                      </SelectTrigger>
                      <SelectContent className="border border-border bg-white">
                        <SelectGroup>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Day Plan">Day Plan</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Inclusions">Inclusions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Exclusions">Exclusions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Location Map">Location Map</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Policy Content">Policy Content</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Frequently Asked Questions">Frequently Asked Questions</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Important Information">Important Information</SelectItem>
                          <SelectItem className="focus:bg-primary/20 font-bold" value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2 col-span-3">
                    <Label className="font-ui text-sm text-heading">Main Title Heading</Label>
                    <Input {...register("info.selectionTitle")} />
                  </div>
                  <div className="flex flex-col gap-2 col-span-4">
                    <Label htmlFor="selectionDesc" className="font-ui text-sm text-heading">Description</Label>
                    <div className="border border-border rounded-[var(--radius-input)]">
                      <MenuBar editor={editEditor} />
                      <EditorContent
                        editor={editEditor}
                        className="h-[250px] overflow-y-auto min-h-[100px] p-2 prose max-w-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}

      </div>
    </>
  )
}

export default AddInfo
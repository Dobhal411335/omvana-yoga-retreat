"use client"

import React, { useState, useRef } from 'react'
import {
  ArrowLeftIcon,
  Trash2,
  Plus,
  Upload,
  Save,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  PilcrowSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Typography } from '@tiptap/extension-typography'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import { ListItem } from '@tiptap/extension-list-item'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const initialCreateTags = [''];
const initialHighlights = [{ title: '', point: '' }];
const createEmptyParagraphSection = () => ({
  title: '',
  description: '',
  firstImage: { url: '', key: '' },
  secondImage: { url: '', key: '' },
  bulletPoints: ['']
});
const initialParagraphSections = [createEmptyParagraphSection()];
const initialTableRows = [{ column1: '', column2: '' }];
const initialAccordionTags = [{ left: '', right: '' }];
const initialNotices = [{ title: "", description: "", type: "warning" }];
const initialSearchLocations = [{ locationName: "", count: "" }];
const initialGridCards = [{ image: { url: '', key: '' }, chipName: '', title: '', link: '', galleryDate: '', postedBy: '', galleryDescription: '', bentoImages: [], youtubeShorts: [], youtubeVideos: [] }];
const initialTeamCards = [{ image: { url: '', key: '' }, name: '', designation: '', phone: '', facebook: '', instagram: '', youtube: '' }];
const TEMPLATE_OPTIONS = [
  { value: "design1", label: "Design 1" },
  { value: "design2", label: "Design 2" },
  { value: "design3", label: "Design 3" },
  { value: "design4", label: "Design 4" },
  { value: "design5", label: "Design 5" },
  { value: "design6", label: "Design 6" },
  { value: "design7", label: "Design 7" },
];

const fieldClass =
  'h-11 w-full rounded-input border-border bg-background font-body text-sm text-heading placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30';
const textareaClass =
  'min-h-24 w-full rounded-input border-border bg-background font-body text-sm text-heading placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30 resize-y';
const labelClass = 'font-ui text-sm font-medium text-heading';

const normalizeParagraphSections = (sections) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    return initialParagraphSections;
  }
  return sections.map((section) => ({
    title: section?.title || '',
    description: section?.description || '',
    firstImage: section?.firstImage || { url: '', key: '' },
    secondImage: section?.secondImage || { url: '', key: '' },
    bulletPoints: Array.isArray(section?.bulletPoints) && section.bulletPoints.length > 0 ? section.bulletPoints : ['']
  }));
};

const InlineRichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontFamily, Typography, TextAlign, Underline, Link, Color, ListItem],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'min-h-[120px] rounded-b-[var(--radius-input)] border border-t-0 border-border bg-background p-3 font-body text-sm text-heading focus:outline-none [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-medium [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-medium [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-medium [&_p]:my-1 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="w-full overflow-hidden rounded-input border border-border bg-surface">
      <div className="flex flex-wrap gap-1 border-b border-border bg-surface px-2 py-2">
        <Button type="button" variant={editor.isActive('bold') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('italic') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('underline') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('paragraph') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().setParagraph().run()}><PilcrowSquare className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="size-4" /></Button>
        <Button type="button" variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'} size="icon" className="size-8" onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="size-4" /></Button>
        <Button type="button" variant="ghost" size="icon" className="size-8" onClick={() => editor.chain().focus().undo().run()}><Undo className="size-4" /></Button>
        <Button type="button" variant="ghost" size="icon" className="size-8" onClick={() => editor.chain().focus().redo().run()}><Redo className="size-4" /></Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const EditWebpages = ({ activityId }) => {
  const router = useRouter();
  const imageFirstInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch webpage data on mount
  React.useEffect(() => {
    if (!activityId) return;
    setLoading(true);
    fetch(`/api/create_webpage/${activityId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          // Defensive: ensure all fields exist
          setForm(prev => ({
            ...prev,
            ...data,
            templateType: data.templateType || 'design1',
            imageFirst: data.imageFirst || { url: '', key: '' },
            bannerImage: data.bannerImage || { url: '', key: '' },
            mainProfileImage: data.mainProfileImage || { url: '', key: '' },
            paragraphFirstImage: data.paragraphFirstImage || { url: '', key: '' },
            paragraphSecondImage: data.paragraphSecondImage || { url: '', key: '' },
            advertisementImage: data.advertisementImage || { url: '', key: '' },
            imageGallery: Array.isArray(data.imageGallery) ? data.imageGallery : [],
            createTags: Array.isArray(data.createTags) && data.createTags.length > 0 ? data.createTags : initialCreateTags,
            postedBy: data.postedBy || { admin: false, user: false },
            highlights: Array.isArray(data.highlights) && data.highlights.length > 0 ? data.highlights : initialHighlights,
            paragraphSections: normalizeParagraphSections(data.paragraphSections),
            tableTitle: data.tableTitle || '',
            tableRows: Array.isArray(data.tableRows) && data.tableRows.length > 0 ? data.tableRows : initialTableRows,
            blockquoteMainTitle: data.blockquoteMainTitle || '',
            blockquoteLeftTitle: data.blockquoteLeftTitle || '',
            blockquoteDescription: data.blockquoteDescription || '',
            blockquoteTags: Array.isArray(data.blockquoteTags) && data.blockquoteTags.length > 0 ? data.blockquoteTags : initialCreateTags,
            accordionTags: Array.isArray(data.accordionTags) && data.accordionTags.length > 0 ? data.accordionTags : initialAccordionTags,
            advertisementUrl: data.advertisementUrl || '',
            sideThumbImage: typeof data.sideThumbImage === 'string' ? data.sideThumbImage : data.sideThumbImage?.url || '',
            sideThumbImageKey: data.sideThumbImageKey || (typeof data.sideThumbImage === 'object' ? data.sideThumbImage?.key || '' : ''),
            sideThumbName: data.sideThumbName || '',
            sideThumbDesignation: data.sideThumbDesignation || '',
            sideThumbDescription: data.sideThumbDescription || '',
            facebookUrl: data.facebookUrl || '',
            youtubeUrl: data.youtubeUrl || '',
            instaUrl: data.instaUrl || '',
            googleUrl: data.googleUrl || '',
            notices: Array.isArray(data.notices) && data.notices.length > 0 ? data.notices : initialNotices,
            boldParagraph: data.boldParagraph || '',
            searchLocations: Array.isArray(data.searchLocations) && data.searchLocations.length > 0 ? data.searchLocations : initialSearchLocations,
            design5Chip: data.design5Chip || '',
            design5MainHeading: data.design5MainHeading || '',
            gridCards: Array.isArray(data.gridCards) && data.gridCards.length > 0 ? data.gridCards : initialGridCards,
            design6Chip: data.design6Chip || '',
            design6ExploreLink: data.design6ExploreLink || '',
            design6MainHeading: data.design6MainHeading || '',
            design6SubHeading: data.design6SubHeading || '',
            design6Author: data.design6Author || '',
            design6MidHeading: data.design6MidHeading || '',
            design6MidLink: data.design6MidLink || '',
            teamCards: Array.isArray(data.teamCards) && data.teamCards.length > 0 ? data.teamCards : initialTeamCards,
          }));
        } else {
          setError(data.error || 'Could not load webpage');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch webpage: ' + err.message);
        setLoading(false);
      });
  }, [activityId]);

  const [uploadingImageFirst, setUploadingImageFirst] = useState(false);
  const [uploadingBannerImage, setUploadingBannerImage] = useState(false);
  const galleryInputRef = useRef(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const mainProfileImageInputRef = useRef(null);
  const [uploadingMainProfileImage, setUploadingMainProfileImage] = useState(false);
  const sideThumbImageInputRef = useRef(null);
  const [uploadingSideThumbImage, setUploadingSideThumbImage] = useState(false);
  const advertisementImageInputRef = useRef(null);
  const [uploadingParagraphFirstImage, setUploadingParagraphFirstImage] = useState(false);
  const [uploadingParagraphSecondImage, setUploadingParagraphSecondImage] = useState(false);
  const [uploadingAdvertisementImage, setUploadingAdvertisementImage] = useState(false);
  const handleCloudinaryImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    if (key === 'imageFirst') setUploadingImageFirst(true);
    if (key === 'bannerImage') setUploadingBannerImage(true);
    if (key === 'mainProfileImage') setUploadingMainProfileImage(true);
    if (key === 'sideThumbImage') setUploadingSideThumbImage(true);
    if (key === 'paragraphFirstImage') setUploadingParagraphFirstImage(true);
    if (key === 'paragraphSecondImage') setUploadingParagraphSecondImage(true);
    if (key === 'advertisementImage') setUploadingAdvertisementImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    try {
      const res = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm(prev => ({
          ...prev,
          ...(key === 'sideThumbImage'
            ? {
              sideThumbImage: data.url,
              sideThumbImageKey: data.key || ''
            }
            : {
              [key]: { url: data.url, key: data.key || '' }
            })
        }));
        toast.success('Image uploaded!');
      } else {
        toast.error('Cloudinary upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      toast.error('Cloudinary upload error: ' + err.message);
    }
    if (key === 'imageFirst') setUploadingImageFirst(false);
    if (key === 'bannerImage') setUploadingBannerImage(false);
    if (key === 'mainProfileImage') setUploadingMainProfileImage(false);
    if (key === 'sideThumbImage') setUploadingSideThumbImage(false);
    if (key === 'paragraphFirstImage') setUploadingParagraphFirstImage(false);
    if (key === 'paragraphSecondImage') setUploadingParagraphSecondImage(false);
    if (key === 'advertisementImage') setUploadingAdvertisementImage(false);
  };
  const handleDeleteCloudinaryImage = async (key) => {
    if (key === 'sideThumbImage') {
      const sideThumbImageKey = form.sideThumbImageKey;
      if (!sideThumbImageKey) {
        setForm(prev => ({ ...prev, sideThumbImage: '', sideThumbImageKey: '' }));
        return;
      }
      try {
        const res = await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: sideThumbImageKey }),
        });
        if (res.ok) {
          setForm(prev => ({ ...prev, sideThumbImage: '', sideThumbImageKey: '' }));
          toast.success('Image deleted!');
        }
      } catch (err) {
        toast.error('Delete error: ' + err.message);
      }
      return;
    }

    const image = form[key];
    if (image && image.key) {
      try {
        await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: image.key }),
        });
        setForm(prev => ({ ...prev, [key]: { url: '', key: '' } }));
        toast.success('Image deleted!');
      } catch (err) {
        toast.error('Delete error: ' + err.message);
      }
    }
  };

  const handleGridCardImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    try {
      const res = await fetch(`/api/cloudinary`, {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (res.ok && data.url) {
        const newCards = [...form.gridCards];
        newCards[index] = {
          ...newCards[index],
          image: { url: data.url, key: data.key || '' }
        };
        setForm(prev => ({ ...prev, gridCards: newCards }));
        toast.success('Grid card image uploaded!');
      } else {
        toast.error('Upload failed: ' + (data.error || 'Unknown'));
      }
    } catch (err) {
      toast.error('Upload error: ' + err.message);
    }
  };

  const handleDeleteGridCardImage = async (index) => {
    const card = form.gridCards[index];
    if (card && card.image && card.image.key) {
      try {
        await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: card.image.key }),
        });
      } catch (err) {
        console.error('Failed to delete grid card image from Cloudinary', err);
      }
    }
    const newCards = [...form.gridCards];
    newCards[index] = { ...newCards[index], image: { url: '', key: '' } };
    setForm(prev => ({ ...prev, gridCards: newCards }));
  };
  const handleBentoImageChange = async (e, cardIndex) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const uploadPromises = files.map(async (file) => {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        const res = await fetch(`/api/cloudinary`, {
          method: 'POST',
          body: formDataUpload
        });
        const data = await res.json();
        if (res.ok && data.url) {
          return { url: data.url, key: data.key || '' };
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setForm((prev) => {
        const newCards = [...prev.gridCards];
        const bentoImages = newCards[cardIndex].bentoImages || [];
        newCards[cardIndex] = {
          ...newCards[cardIndex],
          bentoImages: [...bentoImages, ...uploadedImages]
        };
        return { ...prev, gridCards: newCards };
      });
      toast.success(`${uploadedImages.length} Bento image(s) uploaded!`);
    } catch (err) {
      toast.error('Upload error: ' + err.message);
    }
  };

  const handleDeleteBentoImage = async (cardIndex, imgIndex) => {
    const card = form.gridCards[cardIndex];
    if (card && card.bentoImages && card.bentoImages[imgIndex] && card.bentoImages[imgIndex].key) {
      try {
        await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: card.bentoImages[imgIndex].key }),
        });
      } catch (err) {
        console.error('Failed to delete bento image from Cloudinary', err);
      }
    }
    setForm((prev) => {
      const newCards = [...prev.gridCards];
      const newBentoImages = [...(newCards[cardIndex].bentoImages || [])];
      newBentoImages.splice(imgIndex, 1);
      newCards[cardIndex] = { ...newCards[cardIndex], bentoImages: newBentoImages };
      return { ...prev, gridCards: newCards };
    });
  };

  const handleTeamCardImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    try {
      const res = await fetch(`/api/cloudinary`, {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (res.ok && data.url) {
        const newCards = [...form.teamCards];
        newCards[index] = {
          ...newCards[index],
          image: { url: data.url, key: data.key || '' }
        };
        setForm(prev => ({ ...prev, teamCards: newCards }));
        toast.success('Team card image uploaded!');
      } else {
        toast.error('Upload failed: ' + (data.error || 'Unknown'));
      }
    } catch (err) {
      toast.error('Upload error: ' + err.message);
    }
  };

  const handleDeleteTeamCardImage = async (index) => {
    const card = form.teamCards[index];
    if (card && card.image && card.image.key) {
      try {
        await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: card.image.key }),
        });
      } catch (err) {
        console.error('Failed to delete team card image from Cloudinary', err);
      }
    }
    const newCards = [...form.teamCards];
    newCards[index] = { ...newCards[index], image: { url: '', key: '' } };
    setForm(prev => ({ ...prev, teamCards: newCards }));
  };

  const initialForm = {
    title: '',
    slug: '',
    active: true,
    templateType: 'design1',
    firstTitle: '',
    imageFirst: { url: '', key: '' },
    bannerImage: { url: '', key: '' },
    secondTitle: '',
    createTags: initialCreateTags,
    postedBy: { admin: false, user: false },
    highlights: initialHighlights,
    paragraphSections: initialParagraphSections,
    tableTitle: '',
    tableRows: initialTableRows,
    blockquoteMainTitle: '',
    blockquoteLeftTitle: '',
    blockquoteDescription: '',
    blockquoteTags: initialCreateTags,
    accordionTags: initialAccordionTags,
    advertisementImage: { url: '', key: '' },
    advertisementUrl: '',
    sideThumbImage: '',
    sideThumbImageKey: '',
    sideThumbName: '',
    sideThumbDesignation: '',
    sideThumbDescription: '',
    facebookUrl: '',
    youtubeUrl: '',
    instaUrl: '',
    googleUrl: '',
    mainProfileImage: { url: '', key: '' },
    imageGallery: [],
    notices: initialNotices,
    boldParagraph: '',
    searchLocations: initialSearchLocations,
    design5Chip: '',
    design5MainHeading: '',
    gridCards: initialGridCards,
    design6Chip: '',
    design6ExploreLink: '',
    design6MainHeading: '',
    design6SubHeading: '',
    design6Author: '',
    design6MidHeading: '',
    design6MidLink: '',
    teamCards: initialTeamCards,
  };

  const [form, setForm] = useState(initialForm);
  const isDesignOneOrTwo = form.templateType === 'design1' || form.templateType === 'design2';
  const isDesignThree = form.templateType === 'design3';
  const isDesignFour = form.templateType === 'design4';
  const isDesignFive = form.templateType === 'design5';
  const isDesignSix = form.templateType === 'design6';
  const isDesignSeven = form.templateType === 'design7';
  const [topSectionView, setTopSectionView] = useState('all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostedByChange = (key) => {
    setForm((prev) => ({
      ...prev,
      postedBy: {
        ...prev.postedBy,
        [key]: !prev.postedBy?.[key],
      },
    }));
  };

  const handleArrayTextChange = (name, index, value) => {
    setForm((prev) => {
      const next = [...(prev[name] || [])];
      next[index] = value;
      return { ...prev, [name]: next };
    });
  };

  const addArrayTextRow = (name) => {
    setForm((prev) => ({ ...prev, [name]: [...(prev[name] || []), ''] }));
  };

  const removeArrayTextRow = (name, index) => {
    setForm((prev) => ({ ...prev, [name]: (prev[name] || []).filter((_, i) => i !== index) }));
  };

  const handleObjectArrayChange = (name, index, key, value) => {
    setForm((prev) => {
      const next = [...(prev[name] || [])];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, [name]: next };
    });
  };

  const addObjectArrayRow = (name, newRow) => {
    setForm((prev) => ({ ...prev, [name]: [...(prev[name] || []), newRow] }));
  };

  const removeObjectArrayRow = (name, index) => {
    setForm((prev) => ({ ...prev, [name]: (prev[name] || []).filter((_, i) => i !== index) }));
  };

  const addParagraphBulletPoint = (paragraphIndex) => {
    setForm((prev) => {
      const nextParagraphs = [...(prev.paragraphSections || [])];
      const currentBullets = nextParagraphs[paragraphIndex]?.bulletPoints || [''];
      nextParagraphs[paragraphIndex] = {
        ...nextParagraphs[paragraphIndex],
        bulletPoints: [...currentBullets, ''],
      };
      return { ...prev, paragraphSections: nextParagraphs };
    });
  };

  const removeParagraphBulletPoint = (paragraphIndex, bulletIndex) => {
    setForm((prev) => {
      const nextParagraphs = [...(prev.paragraphSections || [])];
      const currentBullets = nextParagraphs[paragraphIndex]?.bulletPoints || [''];
      const updatedBullets = currentBullets.filter((_, idx) => idx !== bulletIndex);
      nextParagraphs[paragraphIndex] = {
        ...nextParagraphs[paragraphIndex],
        bulletPoints: updatedBullets.length > 0 ? updatedBullets : [''],
      };
      return { ...prev, paragraphSections: nextParagraphs };
    });
  };

  const handleParagraphBulletPointChange = (paragraphIndex, bulletIndex, value) => {
    setForm((prev) => {
      const nextParagraphs = [...(prev.paragraphSections || [])];
      const currentBullets = [...(nextParagraphs[paragraphIndex]?.bulletPoints || [''])];
      currentBullets[bulletIndex] = value;
      nextParagraphs[paragraphIndex] = {
        ...nextParagraphs[paragraphIndex],
        bulletPoints: currentBullets,
      };
      return { ...prev, paragraphSections: nextParagraphs };
    });
  };

  const hasNonEmptyText = (value) => typeof value === 'string' && value.trim().length > 0;
  const hasAnyNonEmptyTag = (tags) => Array.isArray(tags) && tags.some((tag) => hasNonEmptyText(tag));
  const hasPostedBySelection = (postedBy) => !!(postedBy?.admin || postedBy?.user);

  const hasTopTextSectionContent = (data) => {
    return (
      hasNonEmptyText(data?.firstTitle) ||
      hasNonEmptyText(data?.secondTitle) ||
      hasAnyNonEmptyTag(data?.createTags) ||
      hasPostedBySelection(data?.postedBy) ||
      !!data?.imageFirst?.url
    );
  };

  const hasTopBannerContent = (data) => !!data?.bannerImage?.url;

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, __v, createdAt, updatedAt, ...restPayload } = form;
      const payload = { ...restPayload };
      const firstParagraphSection = Array.isArray(payload.paragraphSections) && payload.paragraphSections.length > 0
        ? payload.paragraphSections[0]
        : null;
      if (firstParagraphSection) {
        payload.paragraphFirstImage = firstParagraphSection.firstImage || { url: '', key: '' };
        payload.paragraphSecondImage = firstParagraphSection.secondImage || { url: '', key: '' };
      }

      const hasTopText = hasTopTextSectionContent(payload);
      const hasTopBanner = hasTopBannerContent(payload);
      if (hasTopText && hasTopBanner) {
        toast.error('Please fill either top text section or top banner image, not both.');
        return;
      }


      const res = await fetch(`/api/create_webpage/${activityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('webpage updated successfully!');
        // Refetch webpage data so form stays in sync
        fetch(`/api/create_webpage/${activityId}`)
          .then(res => res.json())
          .then(data => {
            if (data && !data.error) {
              setForm(prev => ({
                ...prev,
                ...data,
                templateType: data.templateType || 'design1',
                imageFirst: data.imageFirst || { url: '', key: '' },
                bannerImage: data.bannerImage || { url: '', key: '' },
                mainProfileImage: data.mainProfileImage || { url: '', key: '' },
                paragraphFirstImage: data.paragraphFirstImage || { url: '', key: '' },
                paragraphSecondImage: data.paragraphSecondImage || { url: '', key: '' },
                advertisementImage: data.advertisementImage || { url: '', key: '' },
                imageGallery: Array.isArray(data.imageGallery) ? data.imageGallery : [],
                createTags: Array.isArray(data.createTags) && data.createTags.length > 0 ? data.createTags : initialCreateTags,
                postedBy: data.postedBy || { admin: false, user: false },
                highlights: Array.isArray(data.highlights) && data.highlights.length > 0 ? data.highlights : initialHighlights,
                paragraphSections: normalizeParagraphSections(data.paragraphSections),
                tableTitle: data.tableTitle || '',
                tableRows: Array.isArray(data.tableRows) && data.tableRows.length > 0 ? data.tableRows : initialTableRows,
                blockquoteMainTitle: data.blockquoteMainTitle || '',
                blockquoteLeftTitle: data.blockquoteLeftTitle || '',
                blockquoteDescription: data.blockquoteDescription || '',
                blockquoteTags: Array.isArray(data.blockquoteTags) && data.blockquoteTags.length > 0 ? data.blockquoteTags : initialCreateTags,
                accordionTags: Array.isArray(data.accordionTags) && data.accordionTags.length > 0 ? data.accordionTags : initialAccordionTags,
                advertisementUrl: data.advertisementUrl || '',
                sideThumbImage: typeof data.sideThumbImage === 'string' ? data.sideThumbImage : data.sideThumbImage?.url || '',
                sideThumbImageKey: data.sideThumbImageKey || (typeof data.sideThumbImage === 'object' ? data.sideThumbImage?.key || '' : ''),
                sideThumbName: data.sideThumbName || '',
                sideThumbDesignation: data.sideThumbDesignation || '',
                sideThumbDescription: data.sideThumbDescription || '',
                facebookUrl: data.facebookUrl || '',
                youtubeUrl: data.youtubeUrl || '',
                instaUrl: data.instaUrl || '',
                googleUrl: data.googleUrl || ''
              }));
            }
          });
      } else {
        toast.error(data.error || 'Failed to update webpage');
      }
    } catch (err) {
      toast.error('Failed to update webpage: ' + err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background py-8 font-body">
      <div className="mx-auto mb-6 max-w-4xl px-4 md:px-0">
        <Button type="button" variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeftIcon className="size-4" />
          Back to Webpages
        </Button>
      </div>
      <form
        className="mx-auto w-full max-w-4xl space-y-8 rounded-card border border-border bg-card p-6 shadow-sm md:p-10"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2 border-b border-border pb-6">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-heading">
            Edit Webpage: <span className="text-primary">{form.title}</span>
          </h2>
          <p className="font-ui text-sm text-muted-foreground">
            Update the content and configuration for this webpage.
          </p>
        </div>
        <div className="space-y-2">
                <Label className={labelClass}>Frontend Design</Label>
          <Input type="text" value={form.templateType} disabled readOnly className={fieldClass} />
        </div>
        {(isDesignOneOrTwo || isDesignThree || isDesignFour || isDesignFive || isDesignSix || isDesignSeven) && (
          <>
            {!isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-2">
                <Label className={labelClass}>Top Section View</Label>
                <div className="inline-flex overflow-hidden rounded-button border border-border">
                  <Button
                    type="button"
                    variant={topSectionView === 'all' ? 'default' : 'ghost'}
                    onClick={() => setTopSectionView('all')}
                    className="rounded-none"
                  >
                    All Inputs
                  </Button>
                  <Button
                    type="button"
                    variant={topSectionView === 'bannerOnly' ? 'default' : 'ghost'}
                    onClick={() => setTopSectionView('bannerOnly')}
                    className="rounded-none"
                  >
                    Banner Image Only
                  </Button>
                </div>
              </div>
            )}

            {(topSectionView === 'all' || isDesignFour || isDesignFive || isDesignSix || isDesignSeven) && (
              <>
                {/* Main Top Title Tag Line */}
                <div className="space-y-2">
                <Label className={labelClass}>Main Top Title Tag Line</Label>
                  <Input type="text" name="secondTitle" value={form.secondTitle} onChange={handleChange} placeholder="Type Here" className={fieldClass} />
                </div>

                {/* Main Top Image (Cloudinary Upload) */}
                {!isDesignThree && (
                  <div className="space-y-2">
                <Label className={labelClass}>Main Top Image</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleCloudinaryImageChange(e, 'imageFirst')}
                      ref={imageFirstInputRef}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="default" className="mb-2 gap-2"
                      onClick={() => imageFirstInputRef.current && imageFirstInputRef.current.click()}
                    >
                      <Upload className="size-4" />
                      <span>Upload Here</span>
                    </Button>
                    {uploadingImageFirst && <div className="font-ui text-sm text-primary">Uploading...</div>}
                    {form.imageFirst && form.imageFirst.url && (
                      <div className="relative mb-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                        <img
                          src={form.imageFirst.url}
                          alt="Image First Preview"
                          className="object-contain w-full h-full"
                        />
                        <Button
                          type="button"
                          onClick={() => handleDeleteCloudinaryImage('imageFirst')}
                          variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                          title="Remove image"
                        >
                          <Trash2 className="size-5 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {/* Main Short Tag Line */}

                <div className="space-y-2">
                <Label className={labelClass}>Main Short Tag Line</Label>
                  <Input type="text" name="firstTitle" value={form.firstTitle} onChange={handleChange} placeholder="Type Here" className={fieldClass} />
                </div>
                {/* Create Tag */}
                {!isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
                  <div className="space-y-2">
                <Label className={labelClass}>Create Tag</Label>
                    {form.createTags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          type="text"
                          value={tag}
                          onChange={(e) => handleArrayTextChange('createTags', index, e.target.value)}
                          placeholder="Type Here"
                          className={fieldClass}
                        />
                        <Button type="button" onClick={() => addArrayTextRow('createTags')} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                        {form.createTags.length > 1 && (
                          <Button type="button" onClick={() => removeArrayTextRow('createTags', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Posted By */}
                {!isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
                  <div className="space-y-2">
                <Label className={labelClass}>Posted By</Label>
                    <div className="flex items-center gap-6">
                      <Label className="flex items-center gap-2 font-ui text-sm font-medium text-heading">
                        <Checkbox checked={!!form.postedBy?.admin} onCheckedChange={() => handlePostedByChange('admin')} /> Admin
                      </Label>
                      <Label className="flex items-center gap-2 font-ui text-sm font-medium text-heading">
                        <Checkbox checked={!!form.postedBy?.user} onCheckedChange={() => handlePostedByChange('user')} /> User
                      </Label>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Main Top Banner Image (Cloudinary Upload) */}
            {(topSectionView === 'bannerOnly' && !isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven) && (
              <div className="space-y-2">
                <Label className={labelClass}>Main Top Banner Image</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleCloudinaryImageChange(e, 'bannerImage')}
                  ref={bannerImageInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="default" className="mb-2 gap-2"
                  onClick={() => bannerImageInputRef.current && bannerImageInputRef.current.click()}
                >
                  <Upload className="size-4" />
                  <span>Upload Here</span>
                </Button>
                {uploadingBannerImage && <div className="font-ui text-sm text-primary">Uploading...</div>}
                {form.bannerImage && form.bannerImage.url && (
                  <div className="relative mb-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                    <img
                      src={form.bannerImage.url}
                      alt="Banner Image Preview"
                      className="object-contain w-full h-full"
                    />
                    <Button
                      type="button"
                      onClick={() => handleDeleteCloudinaryImage('bannerImage')}
                      variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                      title="Remove image"
                    >
                      <Trash2 className="size-5 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            )}


            {/* Highlights */}
            {!isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                <Label className={labelClass}>Highlights</Label>
                {form.highlights.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                    <Input
                      type="text"
                      value={row.title}
                      onChange={(e) => handleObjectArrayChange('highlights', index, 'title', e.target.value)}
                      placeholder="Highlight Title"
                      className={fieldClass}
                    />
                    <Input
                      type="text"
                      value={row.point}
                      onChange={(e) => handleObjectArrayChange('highlights', index, 'point', e.target.value)}
                      placeholder="Point"
                      className={fieldClass}
                    />
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => addObjectArrayRow('highlights', { title: '', point: '' })} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                      {form.highlights.length > 1 && (
                        <Button type="button" onClick={() => removeObjectArrayRow('highlights', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paragraph Section */}
            {!isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                <Label className={labelClass}>Paragraph Section</Label>
                {form.paragraphSections.map((row, index) => (
                  <div key={index} className="space-y-4 rounded-card border border-border bg-background p-4 md:p-5">
                    <Label className={labelClass}>Paragraph Heading</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        value={row.title}
                        onChange={(e) => handleObjectArrayChange('paragraphSections', index, 'title', e.target.value)}
                        placeholder="Title Text Line"
                        className={fieldClass}
                      />
                      <Button type="button" onClick={() => addObjectArrayRow('paragraphSections', createEmptyParagraphSection())} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                      {form.paragraphSections.length > 1 && (
                        <Button type="button" onClick={() => removeObjectArrayRow('paragraphSections', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                      )}
                    </div>
                    <Label className={labelClass}>Paragraph Description</Label>
                    <InlineRichTextEditor
                      value={row.description}
                      onChange={(html) => handleObjectArrayChange('paragraphSections', index, 'description', html)}
                    />
                    <div className="flex flex-col gap-3 mt-2">
                      <div>
                        <input id={`paragraph-first-image-${index}`} type="file" accept="image/*" onChange={e => handleParagraphSectionImageChange(e, index, 'firstImage')} className="hidden" />
                        <Label htmlFor={`paragraph-first-image-${index}`} className="my-2 inline-flex cursor-pointer items-center rounded-button border border-transparent bg-primary px-4 py-2 font-body text-sm font-medium text-primary-foreground hover:bg-primary-hover">Upload First Image</Label>
                        {uploadingParagraphFirstImage && <div className="font-ui text-sm text-primary my-2">Uploading...</div>}
                        {row.firstImage?.url && (
                          <div className="relative mb-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                            <img
                              src={row.firstImage.url}
                              alt="Paragraph First Image Preview"
                              className="object-contain w-full h-full"
                            />
                            <Button
                              type="button"
                              onClick={() => handleDeleteParagraphSectionImage(index, 'firstImage')}
                              variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                              title="Remove image"
                            >
                              <Trash2 className="size-5 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div>
                        <input id={`paragraph-second-image-${index}`} type="file" accept="image/*" onChange={e => handleParagraphSectionImageChange(e, index, 'secondImage')} className="hidden" />
                        <Label htmlFor={`paragraph-second-image-${index}`} className="inline-flex cursor-pointer items-center rounded-button border border-border bg-surface px-4 py-2 font-body text-sm font-medium text-heading hover:bg-background">Upload Second Image</Label>
                        {uploadingParagraphSecondImage && <div className="font-ui text-sm text-primary my-2">Uploading...</div>}
                        {row.secondImage?.url && (
                          <div className="relative mb-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                            <img
                              src={row.secondImage.url}
                              alt="Paragraph Second Image Preview"
                              className="object-contain w-full h-full"
                            />
                            <Button
                              type="button"
                              onClick={() => handleDeleteParagraphSectionImage(index, 'secondImage')}
                              variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                              title="Remove image"
                            >
                              <Trash2 className="size-5 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 rounded-card border border-border bg-background p-4">
                        <Label className={labelClass}>Bullet Points</Label>
                        {(row.bulletPoints || ['']).map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-center gap-2 mb-2">
                            <Input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleParagraphBulletPointChange(index, bulletIndex, e.target.value)}
                              placeholder="Add bullet point"
                              className={fieldClass}
                            />
                            <Button type="button" onClick={() => addParagraphBulletPoint(index)} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                            {(row.bulletPoints || []).length > 1 && (
                              <Button type="button" onClick={() => removeParagraphBulletPoint(index, bulletIndex)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isDesignFour && !isDesignSix && !isDesignSeven && (
              <>
                <div className="space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                  <Label className={labelClass}>Notices (Design 4)</Label>
                  {form.notices.map((row, index) => (
                    <div key={index} className="space-y-4 rounded-card border border-border bg-background p-4 md:p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div>
                          <Label className={labelClass}>Notice Title</Label>
                          <Input
                            type="text"
                            value={row.title}
                            onChange={(e) => handleObjectArrayChange('notices', index, 'title', e.target.value)}
                            placeholder="Notice Title"
                            className={fieldClass}
                          />
                        </div>
                        <div>
                          <Label className={labelClass}>Notice Type</Label>
                          <Select
                            value={row.type}
                            onValueChange={(value) => handleObjectArrayChange('notices', index, 'type', value)}
                          >
                            <SelectTrigger className={`w-full ${fieldClass}`}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="warning">Warning (Yellow/Orange)</SelectItem>
                              <SelectItem value="info">Info (Blue)</SelectItem>
                              <SelectItem value="danger">Danger (Red)</SelectItem>
                              <SelectItem value="success">Success (Green)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-2">
                        <Label className={labelClass}>Notice Description</Label>
                        <Textarea
                          value={row.description}
                          onChange={(e) => handleObjectArrayChange('notices', index, 'description', e.target.value)}
                          placeholder="Notice Description"
                          className={textareaClass}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" onClick={() => addObjectArrayRow('notices', { title: '', description: '', type: 'warning' })} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                        {form.notices.length > 1 && (
                          <Button type="button" onClick={() => removeObjectArrayRow('notices', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                <Label className={labelClass}>Bold Paragraph Text</Label>
                  <Textarea
                    name="boldParagraph"
                    value={form.boldParagraph}
                    onChange={handleChange}
                    placeholder="Experience the ultimate spiritual journey..."
                    className={textareaClass}
                   />
                </div>
                <div className="space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                  <Label className={labelClass}>Search Locations Sidebar (Design 4)</Label>
                  {form.searchLocations.map((row, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                      <Input
                        type="text"
                        value={row.locationName}
                        onChange={(e) => handleObjectArrayChange('searchLocations', index, 'locationName', e.target.value)}
                        placeholder="Location Name"
                        className={fieldClass}
                      />
                      <Input
                        type="text"
                        value={row.count}
                        onChange={(e) => handleObjectArrayChange('searchLocations', index, 'count', e.target.value)}
                        placeholder="Count"
                        className={fieldClass}
                      />
                      <div className="flex gap-2">
                        <Button type="button" onClick={() => addObjectArrayRow('searchLocations', { locationName: '', count: '' })} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                        {form.searchLocations.length > 1 && (
                          <Button type="button" onClick={() => removeObjectArrayRow('searchLocations', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Table Data */}
            {!isDesignFive && !isDesignSix && !isDesignSeven && (
              <>
                <Label className={labelClass}>Table Data</Label>
                <div className="space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                  <Label className={labelClass}>Table Heading</Label>
                  <Input
                    type="text"
                    name="tableTitle"
                    value={form.tableTitle}
                    onChange={handleChange}
                    placeholder="Table Title"
                    className={fieldClass}
                  />
                  <Label className={labelClass}>Table Description</Label>

                  {form.tableRows.map((row, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2">

                      <Input type="text" value={row.column1} onChange={(e) => handleObjectArrayChange('tableRows', index, 'column1', e.target.value)} placeholder="Column 1" className={fieldClass} />
                      <Input type="text" value={row.column2} onChange={(e) => handleObjectArrayChange('tableRows', index, 'column2', e.target.value)} placeholder="Column 2" className={fieldClass} />
                      <div className="flex gap-2">
                        <Button type="button" onClick={() => addObjectArrayRow('tableRows', { column1: '', column2: '' })} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                        {form.tableRows.length > 1 && (
                          <Button type="button" onClick={() => removeObjectArrayRow('tableRows', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Blockquote */}
            {!isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-2">
                <Label className={labelClass}>Blockquote Title</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <Input type="text" name="blockquoteMainTitle" value={form.blockquoteMainTitle} onChange={handleChange} placeholder="Title Name For Blockquote" className={fieldClass} />
                  <Input type="text" name="blockquoteLeftTitle" value={form.blockquoteLeftTitle} onChange={handleChange} placeholder="Blockquote Left Para" className={fieldClass} />
                </div>
                <Label className={labelClass}>BlockQoute Description</Label>
                <InlineRichTextEditor
                  value={form.blockquoteDescription}
                  onChange={(html) => setForm((prev) => ({ ...prev, blockquoteDescription: html }))}
                />
                <div className="mt-2">
                  <Label className={labelClass}>Blockquote Tags</Label>
                  {form.blockquoteTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input type="text" value={tag} onChange={(e) => handleArrayTextChange('blockquoteTags', index, e.target.value)} placeholder="Blockquote Tag" className={fieldClass} />
                      <Button type="button" onClick={() => addArrayTextRow('blockquoteTags')} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                      {form.blockquoteTags.length > 1 && (
                        <Button type="button" onClick={() => removeArrayTextRow('blockquoteTags', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accordion Tag */}
            {!isDesignThree && !isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-2">
                <Label className={labelClass}>Advertisement Section</Label>
                <div className="flex flex-col gap-4">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleCloudinaryImageChange(e, 'advertisementImage')}
                      ref={advertisementImageInputRef}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => advertisementImageInputRef.current && advertisementImageInputRef.current.click()}
                      variant="outline" className="justify-start"
                    >
                      {form.advertisementImage?.url ? 'Change Advertisement Image' : 'Upload Advertisement Image'}
                    </Button>
                    {uploadingAdvertisementImage && <div className="font-ui text-sm text-primary mt-1">Uploading...</div>}
                    {form.advertisementImage?.url && (
                      <div className="relative mt-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                        <img src={form.advertisementImage.url} alt="Advertisement Preview" className="object-contain w-full h-full" />
                        <Button
                          type="button"
                          onClick={() => handleDeleteCloudinaryImage('advertisementImage')}
                          variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                          title="Remove image"
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className={labelClass}>Advertisement URL</h2>
                    <Input
                      type="text"
                      name="advertisementUrl"
                      value={form.advertisementUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {!isDesignThree && !isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-2">
                <Label className={labelClass}>Accordion Tag</Label>
                {form.accordionTags.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>Accordion Main Title</Label>
                      <Input type="text" value={row.left} onChange={(e) => handleObjectArrayChange('accordionTags', index, 'left', e.target.value)} placeholder="Title Text Line" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className={labelClass}>Accordion Description</Label>
                      <Input type="text" value={row.right} onChange={(e) => handleObjectArrayChange('accordionTags', index, 'right', e.target.value)} placeholder="Accordion Tag Line" className={fieldClass} />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="button" onClick={() => addObjectArrayRow('accordionTags', { left: '', right: '' })} variant="default" size="icon" className="shrink-0"><Plus className="size-4" /></Button>
                      {form.accordionTags.length > 1 && (
                        <Button type="button" onClick={() => removeObjectArrayRow('accordionTags', index)} variant="destructive" size="icon" className="shrink-0"><Trash2 className="size-4" /></Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Side Thumb Blog */}
            {!isDesignThree && !isDesignFour && !isDesignFive && !isDesignSix && !isDesignSeven && (
              <div className="space-y-2">
                <Label className={labelClass}>Side Thumb Blog</Label>
                <div className="flex flex-col gap-5 mb-2">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleCloudinaryImageChange(e, 'sideThumbImage')}
                      ref={sideThumbImageInputRef}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => sideThumbImageInputRef.current && sideThumbImageInputRef.current.click()}
                      variant="outline" className="justify-start"
                    >
                      {form.sideThumbImage ? 'Change Thumb Image' : 'Upload Thumb Image'}
                    </Button>
                    {uploadingSideThumbImage && <div className="font-ui text-sm text-primary mt-1">Uploading...</div>}
                    {form.sideThumbImage && (
                      <div className="relative mt-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                        <img src={form.sideThumbImage} alt="Side Thumb Preview" className="object-contain w-full h-full" />
                        <Button
                          type="button"
                          onClick={() => handleDeleteCloudinaryImage('sideThumbImage')}
                          variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                          title="Remove image"
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col  gap-2">
                    <h2 className={labelClass}>Side Thumb Name</h2>
                    <Input type="text" name="sideThumbName" value={form.sideThumbName} onChange={handleChange} placeholder="Name Here" className={fieldClass} />
                    <h2 className={labelClass}>Side Thumb Designation</h2>
                    <Input type="text" name="sideThumbDesignation" value={form.sideThumbDesignation} onChange={handleChange} placeholder="Designation" className={fieldClass} />
                    <h2 className={labelClass}>Side Thumb Description</h2>
                    <Input type="text" name="sideThumbDescription" value={form.sideThumbDescription} onChange={handleChange} placeholder="Description" className={fieldClass} />
                  </div>
                </div>
                <hr className='my-6 border-border' />
                <h2 className="font-heading text-xl font-medium text-heading my-2">Social Media Links</h2>
                <div className="grid grid-col-1 gap-2">
                  <h2 className={labelClass}>Facebook URL</h2>
                  <Input type="text" name="facebookUrl" value={form.facebookUrl} onChange={handleChange} placeholder="Facebook Url" className={fieldClass} />
                  <h2 className={labelClass}>Youtube URL</h2>
                  <Input type="text" name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} placeholder="Youtube Url" className={fieldClass} />
                  <h2 className={labelClass}>Instagram URL</h2>
                  <Input type="text" name="instaUrl" value={form.instaUrl} onChange={handleChange} placeholder="Insta Url" className={fieldClass} />
                  <h2 className={labelClass}>Google URL</h2>
                  <Input type="text" name="googleUrl" value={form.googleUrl} onChange={handleChange} placeholder="Google Url" className={fieldClass} />
                </div>
              </div>
            )}
          </>
        )}
        {isDesignFive && !isDesignSix && !isDesignSeven && (
          <>
            {/* Design 5 Content */}
            <div className="mt-8 space-y-6 border-t border-border pt-8">
              <h3 className="font-heading text-2xl font-medium text-heading mb-2">Design 5 Sections</h3>

              <div className="space-y-2">
                <Label className={labelClass}>Top Chip Text (e.g. Why Choose Us)</Label>
                <Input type="text" name="design5Chip" value={form.design5Chip} onChange={handleChange} placeholder="Type Here" className={fieldClass} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Main Heading</Label>
                <Input type="text" name="design5MainHeading" value={form.design5MainHeading} onChange={handleChange} placeholder="Type Here" className={fieldClass} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Grid Cards</Label>
                {form.gridCards.map((card, index) => (
                  <div key={index} className="relative mb-4 space-y-4 rounded-card border border-border bg-surface p-5">
                    <Button type="button" onClick={() => {
                      setForm((prev) => {
                        const nextGridCards = [...(prev.gridCards || [])];
                        nextGridCards.splice(index, 1);
                        return { ...prev, gridCards: nextGridCards };
                      });
                    }} variant="destructive" size="icon" className="absolute top-2 right-2 size-8">
                      <Trash2 className="size-4" />
                    </Button>

                    <div className="mb-2">
                      <h2 className={labelClass}>Card Image</h2>
                      <div className="flex flex-col gap-2">
                        <div>
                          <Label className="inline-flex cursor-pointer items-center rounded-button border border-border bg-surface px-4 py-2 font-body text-sm font-medium text-heading hover:bg-background">
                            {card.image?.url ? 'Change Card Image' : 'Upload Card Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleGridCardImageChange(e, index)}
                              className="hidden"
                            />
                          </Label>
                          {card.image?.url && (
                            <div className="relative mt-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                              <img src={card.image.url} alt="Grid Card Preview" className="object-contain w-full h-full" />
                              <Button
                                type="button"
                                onClick={() => handleDeleteGridCardImage(index)}
                                variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                                title="Remove image"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <Label className={labelClass}>Chip Name</Label>
                        <Input type="text" value={card.chipName} onChange={(e) => {
                          setForm((prev) => {
                            const nextGridCards = [...(prev.gridCards || [])];
                            nextGridCards[index].chipName = e.target.value;
                            return { ...prev, gridCards: nextGridCards };
                          });
                        }} placeholder="e.g. Fintech" className={fieldClass} />
                      </div>

                      <div>
                        <Label className={labelClass}>Title</Label>
                        <Input type="text" value={card.title} onChange={(e) => {
                          setForm((prev) => {
                            const nextGridCards = [...(prev.gridCards || [])];
                            nextGridCards[index].title = e.target.value;
                            return { ...prev, gridCards: nextGridCards };
                          });
                        }} placeholder="e.g. Compliance Consulting" className={fieldClass} />
                      </div>

                      <div className="md:col-span-2">
                        <Label className={labelClass}>Link URL (for Explore More)</Label>
                        <Input type="text" value={card.link} onChange={(e) => {
                          setForm((prev) => {
                            const nextGridCards = [...(prev.gridCards || [])];
                            nextGridCards[index].link = e.target.value;
                            return { ...prev, gridCards: nextGridCards };
                          });
                        }} placeholder="/some-link" className={fieldClass} />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" onClick={() => {
                  setForm((prev) => {
                    const nextGridCards = [...(prev.gridCards || [])];
                    nextGridCards.push({ image: { url: '', key: '' }, chipName: '', title: '', link: '' });
                    return { ...prev, gridCards: nextGridCards };
                  });
                }} variant="default" className="mt-2 gap-2">
                  <Plus className="size-4" /> Add Grid Card
                </Button>
              </div>
            </div>
          </>
        )}

        {isDesignSix && (
          <>
            {/* Design 6 Content */}
            <div className="mt-8 space-y-6 border-t border-border pt-8">
              <h3 className="font-heading text-2xl font-medium text-heading mb-2">Design 6 (Team Page) Sections</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className={labelClass}>Top Chip Text</Label>
                  <Input type="text" name="design6Chip" value={form.design6Chip} onChange={handleChange} placeholder="e.g. News & Insight" className={fieldClass} />
                </div>
                <div>
                  <Label className={labelClass}>Explore Area Link</Label>
                  <Input type="text" name="design6ExploreLink" value={form.design6ExploreLink} onChange={handleChange} placeholder="/explore" className={fieldClass} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Main Heading</Label>
                <Input type="text" name="design6MainHeading" value={form.design6MainHeading} onChange={handleChange} placeholder="The latest news and insights..." className={fieldClass} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Sub Heading / Paragraph Text</Label>
                <Textarea name="design6SubHeading" value={form.design6SubHeading} onChange={handleChange} placeholder="Business consulting is a professional service..." className={textareaClass} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Author Attribution</Label>
                <Input type="text" name="design6Author" value={form.design6Author} onChange={handleChange} placeholder="Mr. Daniel Scoot, Mr. Daniel Scoot" className={fieldClass} />
              </div>

              <hr className="my-6 border-border" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className={labelClass}>Mid Section Heading</Label>
                  <Input type="text" name="design6MidHeading" value={form.design6MidHeading} onChange={handleChange} placeholder="Excellent Service Provided by..." className={fieldClass} />
                </div>
                <div>
                  <Label className={labelClass}>Explore People Link</Label>
                  <Input type="text" name="design6MidLink" value={form.design6MidLink} onChange={handleChange} placeholder="/people" className={fieldClass} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Team Cards</Label>
                {form.teamCards.map((card, index) => (
                  <div key={index} className="relative mb-4 space-y-4 rounded-card border border-border bg-surface p-5">
                    <Button type="button" onClick={() => {
                      setForm((prev) => {
                        const nextCards = [...(prev.teamCards || [])];
                        nextCards.splice(index, 1);
                        return { ...prev, teamCards: nextCards };
                      });
                    }} variant="destructive" size="icon" className="absolute top-2 right-2 size-8">
                      <Trash2 className="size-4" />
                    </Button>

                    <div className="mb-2">
                      <h2 className={labelClass}>Card Image</h2>
                      <div className="flex flex-col gap-2">
                        <div>
                          <Label className="inline-flex cursor-pointer items-center rounded-button border border-border bg-surface px-4 py-2 font-body text-sm font-medium text-heading hover:bg-background">
                            {card.image?.url ? 'Change Image' : 'Upload Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleTeamCardImageChange(e, index)}
                              className="hidden"
                            />
                          </Label>
                          {card.image?.url && (
                            <div className="relative mt-2 h-48 w-full overflow-hidden rounded-image border border-border bg-background">
                              <img src={card.image.url} alt="Team Preview" className="object-contain w-full h-full" />
                              <Button
                                type="button"
                                onClick={() => handleDeleteTeamCardImage(index)}
                                variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10"
                                title="Remove image"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className={labelClass}>Name</Label>
                        <Input type="text" value={card.name} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].name = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="Mr. Anthony Brian" className={fieldClass} />
                      </div>

                      <div>
                        <Label className={labelClass}>Designation</Label>
                        <Input type="text" value={card.designation} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].designation = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="Senior Consultant" className={fieldClass} />
                      </div>

                      <div>
                        <Label className={labelClass}>Phone Number</Label>
                        <Input type="text" value={card.phone} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].phone = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="+91 656 786 53" className={fieldClass} />
                      </div>

                      <div>
                        <Label className={labelClass}>Facebook URL Link</Label>
                        <Input type="text" value={card.facebook} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].facebook = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="https://facebook.com/..." className={fieldClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Instagram URL Link</Label>
                        <Input type="text" value={card.instagram} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].instagram = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="https://instagram.com/..." className={fieldClass} />
                      </div>
                      <div>
                        <Label className={labelClass}>Youtube URL Link</Label>
                        <Input type="text" value={card.youtube} onChange={(e) => {
                          setForm((prev) => {
                            const nextCards = [...(prev.teamCards || [])];
                            nextCards[index].youtube = e.target.value;
                            return { ...prev, teamCards: nextCards };
                          });
                        }} placeholder="https://youtube.com/..." className={fieldClass} />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" onClick={() => {
                  setForm((prev) => {
                    const nextCards = [...(prev.teamCards || [])];
                    nextCards.push({ image: { url: '', key: '' }, name: '', designation: '', phone: '', facebook: '', instagram: '', youtube: '' });
                    return { ...prev, teamCards: nextCards };
                  });
                }} variant="default" className="mt-2 gap-2">
                  <Plus className="size-4" /> Add Team Card
                </Button>
              </div>
            </div>
          </>
        )}

        {isDesignSeven && (
          <>
            {/* Design 7 Content */}
            <div className="mt-6 space-y-6 border-t border-border pt-8">
              <h3 className="font-heading text-2xl font-medium text-heading mb-2">Design 7 Sections</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className={labelClass}>Top Chip Text</Label>
                  <Input type="text" name="design7Chip" value={form.design7Chip} onChange={handleChange} placeholder="News & Insight" className={fieldClass} />
                </div>
                <div>
                  <Label className={labelClass}>Explore Link URL</Label>
                  <Input type="text" name="design7ExploreLink" value={form.design7ExploreLink} onChange={handleChange} placeholder="/explore" className={fieldClass} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Main Heading</Label>
                <Input type="text" name="design7MainHeading" value={form.design7MainHeading} onChange={handleChange} placeholder="The latest news and insights..." className={fieldClass} />
              </div>

              {/* Gallery Grid Cards for Design 7 */}
              <div className="mb-4 space-y-4 rounded-card border border-border bg-surface p-5 md:p-6">
                <h4 className="font-heading text-xl font-medium text-heading mb-4">Gallery Image Cards</h4>
                {form.gridCards.map((card, index) => (
                  <div key={index} className="relative mb-4 space-y-4 rounded-card border border-border bg-background p-5">
                    <Button type="button" onClick={() => {
                      setForm((prev) => {
                        const nextGridCards = [...(prev.gridCards || [])];
                        nextGridCards.splice(index, 1);
                        return { ...prev, gridCards: nextGridCards };
                      });
                    }} variant="destructive" size="icon" className="absolute top-2 right-2 size-8">
                      <Trash2 className="size-4" />
                    </Button>

                    <div className="mb-2">
                      <h2 className={labelClass}>Card Image</h2>
                      <div className="flex flex-col gap-2">
                        <input id={`grid-card-image-${index}`} type="file" accept="image/*" onChange={(e) => handleGridCardImageChange(e, index)} className="hidden" />
                        <Label htmlFor={`grid-card-image-${index}`} className="inline-flex w-max cursor-pointer items-center rounded-button border border-transparent bg-primary px-4 py-2 font-body text-sm font-medium text-primary-foreground hover:bg-primary-hover">
                          Upload Image
                        </Label>
                        {card.image?.url && (
                          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-image border border-border bg-background">
                            <img src={card.image.url} alt="Grid Card" className="object-cover w-full h-full" />
                            <Button type="button" onClick={() => handleDeleteGridCardImage(index)} variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10" title="Remove image">
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <Label className={labelClass}>Hover Chip Name</Label>
                        <Input type="text" value={card.chipName} onChange={(e) => {
                          setForm((prev) => {
                            const nextGridCards = [...(prev.gridCards || [])];
                            nextGridCards[index].chipName = e.target.value;
                            return { ...prev, gridCards: nextGridCards };
                          });
                        }} placeholder="e.g. Fintech" className={fieldClass} />
                      </div>

                      <div>
                        <Label className={labelClass}>Hover Title (Link Text)</Label>
                        <Input type="text" value={card.title} onChange={(e) => {
                          setForm((prev) => {
                            const nextGridCards = [...(prev.gridCards || [])];
                            nextGridCards[index].title = e.target.value;
                            return { ...prev, gridCards: nextGridCards };
                          });
                        }} placeholder="e.g. Compliance Consulting" className={fieldClass} />
                      </div>

                      {/* Expandable Gallery Detail Section */}
                      <div className="md:col-span-2 mt-4 space-y-4 rounded-card border border-border bg-surface p-5">
                        <h3 className="font-heading text-lg font-medium text-heading mb-2">Gallery Detail Page Content</h3>
                        <p className="font-ui text-xs text-muted-foreground mb-4">Filling this out will generate a detail page at <strong>/gallery/{card.gallerySlug || "<auto-generated>"}</strong></p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className={labelClass}>Date</Label>
                            <Input type="date" value={card.galleryDate || ''} onChange={(e) => {
                              setForm((prev) => {
                                const nextGridCards = [...(prev.gridCards || [])];
                                nextGridCards[index].galleryDate = e.target.value;
                                return { ...prev, gridCards: nextGridCards };
                              });
                            }} className={fieldClass} />
                          </div>
                          <div>
                            <Label className={labelClass}>Posted By</Label>
                            <Input type="text" value={card.postedBy || ''} onChange={(e) => {
                              setForm((prev) => {
                                const nextGridCards = [...(prev.gridCards || [])];
                                nextGridCards[index].postedBy = e.target.value;
                                return { ...prev, gridCards: nextGridCards };
                              });
                            }} placeholder="Author Name" className={fieldClass} />
                          </div>
                          <div className="md:col-span-2">
                            <Label className={labelClass}>Description Paragraph</Label>
                            <Textarea value={card.galleryDescription || ''} onChange={(e) => {
                              setForm((prev) => {
                                const nextGridCards = [...(prev.gridCards || [])];
                                nextGridCards[index].galleryDescription = e.target.value;
                                return { ...prev, gridCards: nextGridCards };
                              });
                            }} rows="3" className={textareaClass} />
                          </div>
                        </div>

                        <div className="mb-6">
                          <Label className={labelClass}>Bento Gallery Images</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(card.bentoImages || []).map((img, imgIdx) => (
                              <div key={imgIdx} className="relative h-24 w-24 overflow-hidden rounded-image border border-border bg-background">
                                <img src={img.url} alt="Bento" className="object-cover w-full h-full" />
                                <Button type="button" onClick={() => handleDeleteBentoImage(index, imgIdx)} variant="ghost" size="icon" className="absolute top-2 right-2 size-8 rounded-full border border-border bg-surface/90 text-destructive hover:bg-destructive/10" title="Remove image">
                                  <Trash2 className="size-3 text-destructive" />
                                </Button>
                              </div>
                            ))}
                            <div className="relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-image border-2 border-dashed border-border bg-background hover:bg-surface">
                              <input type="file" multiple accept="image/*" onChange={(e) => handleBentoImageChange(e, index)} className="absolute inset-0 opacity-0 cursor-pointer" />
                              <span className="text-xl text-primary">+</span>
                              <span className="font-ui text-xs text-muted-foreground mt-1">Upload</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <Label className={labelClass}>YouTube Shorts</Label>
                          {(card.youtubeShorts || []).map((short, shortIdx) => (
                            <div key={shortIdx} className="mb-2 flex w-full items-center gap-2 rounded-input border border-border bg-background p-2">
                              <div className="w-full">
                                <Input type="text" value={short.url} onChange={(e) => {
                                  setForm(prev => {
                                    const newCards = [...prev.gridCards];
                                    newCards[index].youtubeShorts[shortIdx].url = e.target.value;
                                    return { ...prev, gridCards: newCards };
                                  });
                                }} placeholder="YouTube URL" className={fieldClass} />
                              </div>
                              <div className="md:col-span-1 text-center">
                                <Button type="button" onClick={() => {
                                  setForm(prev => {
                                    const newCards = [...prev.gridCards];
                                    newCards[index].youtubeShorts.splice(shortIdx, 1);
                                    return { ...prev, gridCards: newCards };
                                  });
                                }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4 inline" /></Button>
                              </div>
                            </div>
                          ))}
                          <Button type="button" onClick={() => {
                            setForm(prev => {
                              const newCards = [...prev.gridCards];
                              if (!newCards[index].youtubeShorts) newCards[index].youtubeShorts = [];
                              newCards[index].youtubeShorts.push({ url: '' });
                              return { ...prev, gridCards: newCards };
                            });
                          }} variant="outline" size="sm"><Plus className="size-4" /> Add Short</Button>
                        </div>

                        <div>
                          <Label className={labelClass}>YouTube Highlight Videos</Label>
                          {(card.youtubeVideos || []).map((vid, vidIdx) => (
                            <div key={vidIdx} className="mb-2 flex w-full items-center gap-2 rounded-input border border-border bg-background p-2">
                              <div className="w-full">
                                <Input type="text" value={vid.url} onChange={(e) => {
                                  setForm(prev => {
                                    const newCards = [...prev.gridCards];
                                    newCards[index].youtubeVideos[vidIdx].url = e.target.value;
                                    return { ...prev, gridCards: newCards };
                                  });
                                }} placeholder="YouTube URL" className={fieldClass} />
                              </div>
                              <div className="text-center">
                                <Button type="button" onClick={() => {
                                  setForm(prev => {
                                    const newCards = [...prev.gridCards];
                                    newCards[index].youtubeVideos.splice(vidIdx, 1);
                                    return { ...prev, gridCards: newCards };
                                  });
                                }} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4 inline" /></Button>
                              </div>
                            </div>
                          ))}
                          <Button type="button" onClick={() => {
                            setForm(prev => {
                              const newCards = [...prev.gridCards];
                              if (!newCards[index].youtubeVideos) newCards[index].youtubeVideos = [];
                              newCards[index].youtubeVideos.push({ url: '', });
                              return { ...prev, gridCards: newCards };
                            });
                          }} variant="outline" size="sm"><Plus className="size-4" /> Add Video</Button>
                        </div>

                      </div>

                    </div>
                  </div>
                ))}

                <Button type="button" onClick={() => {
                  setForm((prev) => {
                    const nextGridCards = [...(prev.gridCards || [])];
                    nextGridCards.push({ image: { url: '', key: '' }, chipName: '', title: '', link: '', galleryDate: '', postedBy: '', galleryDescription: '', bentoImages: [], youtubeShorts: [], youtubeVideos: [] });
                    return { ...prev, gridCards: nextGridCards };
                  });
                }} variant="default" className="mt-2 gap-2">
                  <Plus className="size-4" /> Add Gallery Card
                </Button>
              </div>

            </div>
          </>
        )}

        {/* Data Save Button */}
        <div className="mt-8 flex justify-end border-t border-border pt-6">
          <Button type="submit" size="lg" className="min-w-40 gap-2">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
};

export default EditWebpages

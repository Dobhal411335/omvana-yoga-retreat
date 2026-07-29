# DEVELOPMENT_GUIDE.md

# Omvana Retreat CMS

Development Guide

Version 1.0

---

# Purpose

This document defines the coding standards, folder conventions, naming rules, package usage, API structure, Git workflow and development practices.

Every developer and AI assistant contributing to this project must follow these standards.

---

# General Principles

Code should be:

• Readable

• Reusable

• Predictable

• Simple

• Maintainable

Avoid clever solutions.

Choose clarity over complexity.

---

# Tech Stack

Framework

Next.js App Router

Language

JavaScript

Database

MongoDB

ODM

Mongoose

Styling

TailwindCSS

Component Library

shadcn/ui

Icons

Lucide React

Animation

Framer Motion

Forms

React Hook Form

Validation

Zod

Authentication

JWT

Password Hashing

bcryptjs

Emails

Brevo

Images

Cloudinary

Logger

Winston

Notifications

React-hot toast

---

# Folder Convention

Everything should live inside src/.

Example

src/

app/

components/

features/

hooks/

lib/

middleware/

models/

services/

providers/

styles/

utils/

config/

constants/

data/

---

# Component Organization

Components should be grouped by purpose.

components/

admin/

website/

common/

layout/

forms/

ui/

Never create duplicate components.

---

# Feature Organization

Each feature owns its own logic.

Example

features/

gallery/

retreats/

contact/

hero/

testimonials/

settings/

Future feature folders can contain

components/

hooks/

constants/

helpers/

validation/

services/

---

# File Naming

React Components

PascalCase

Example

GalleryCard.jsx

HeroSection.jsx

DashboardHeader.jsx

---

Utility Files

camelCase

Example

formatDate.js

slugify.js

logger.js

---

Hooks

Always start with use

Example

useAuth.js

usePagination.js

---

Constants

camelCase

Example

navigation.js

theme.js

---

Environment Variables

UPPER_CASE

Example

JWT_SECRET

MONGODB_URI

---

# Component Rules

One component per file.

One responsibility per component.

Keep components under approximately 200 lines where practical.

Extract repeated UI into shared components.

Avoid deeply nested JSX.

---

# Server Components

Use Server Components by default.

Examples

Website pages

Dashboard pages

Static sections

Data fetching

SEO metadata

Server Components should never use

useState

useEffect

window

document

---

# Client Components

Use only when necessary.

Examples

Forms

Dialogs

Dropdowns

Animations

Image Upload

Tabs

Accordions

Toast

Search Input

Date Picker

Always place

"use client"

at the top.

---

# Route Handlers

Use Route Handlers for

Authentication

CRUD APIs

File Upload

Email Sending

Database Updates

Do not place business logic directly inside the handler.

Call service functions instead.

---

# Services

Business logic belongs here.

Example

galleryService.js

enquiryService.js

authService.js

cloudinaryService.js

brevoService.js

---

# Database Models

One model per file.

Never place queries inside models.

Models should only define schemas.

---

# Utility Functions

Utilities should be generic.

Examples

truncateText()

capitalize()

generateSlug()

formatDate()

Never create feature-specific utilities here.

---

# Validation

Frontend

React Hook Form

+

Zod

Backend

Zod

Never trust frontend validation.

Always validate again on the server.

---

# API Design

RESTful structure.

Example

GET

POST

PATCH

DELETE

Return consistent responses.

Example

{
success,
message,
data
}

Never expose stack traces.

---

# Error Handling

Every Route Handler should use

try

catch

Return meaningful error messages.

Log unexpected errors.

Never expose internal implementation.

---

# Authentication

Only one Admin.

JWT authentication.

HTTP Only Cookie.

No role-based access.

No registration.

No social login.

---

# Image Handling

Validate file type.

Validate size.

Upload to Cloudinary.

Store secure URL.

Delete Cloudinary asset when removing.

Never store image binaries inside MongoDB.

---

# Email

Use Brevo only.

Create reusable email templates.

Never duplicate email logic.

---

# Logger

Use Winston.

Only log

Login

Logout

Failed Login

Session Expired

Avoid excessive logging.

---

# Environment Variables

Never hardcode secrets.

Always use process.env.

Provide .env.example.

Validate environment variables during startup.

---

# Styling Rules

TailwindCSS only.

Do not use CSS Modules.

Do not use Bootstrap.

Do not use inline styles.

Global styles belong in globals.css.

---

# UI Library

Use shadcn/ui whenever a component exists.

Examples

Button

Input

Textarea

Dialog

Sheet

Dropdown Menu

Select

Popover

Tabs

Accordion

Card

Table

Alert Dialog

Do not reinvent these components.

---

# Icons

Lucide React only.

Maintain consistent sizing.

Default

24px

Table

20px

Cards

28–32px

---

# Forms

Every form should include

Loading State

Validation

Error State

Disabled State

Success Feedback

Required indicators where applicable.

---

# State Management

Use React state for local UI.

Use Context only when state is shared globally.

Avoid unnecessary global state.

Do not install Redux.

---

# Data Fetching

Prefer Server Components for initial data.

Use fetch where possible.

Use client fetching only for interactive features.

---

# Performance

Lazy load heavy components.

Optimize images.

Reuse components.

Avoid unnecessary re-renders.

Avoid deeply nested state.

---

# Accessibility

Semantic HTML.

Keyboard navigation.

Visible focus states.

Labels for all inputs.

Alt text for images.

Accessible dialogs.

---

# Git Workflow

One feature per branch.

One feature per commit.

Never mix unrelated changes.

Commit examples

feat: add gallery management

fix: resolve login validation bug

refactor: simplify image uploader

style: improve dashboard spacing

chore: update dependencies

---

# Documentation

Every new feature should include

Purpose

Files added

API endpoints

Database changes

Future improvements

Update the documentation when architecture changes.

---

# AI Development Rules

When using Cursor, Claude Code or other AI assistants:

Read PROJECT_RULES.md first.

Then read

ARCHITECTURE.md

DESIGN_SYSTEM.md

UI_GUIDELINES.md

Only read feature specifications relevant to the task.

Never rewrite working code without instruction.

Never introduce new libraries without approval.

Prefer extending existing components.

Follow existing naming conventions.

Maintain consistency across the codebase.

---

# Definition of Done

A feature is complete only if:

✓ Functionality works

✓ Validation exists

✓ Responsive layout

✓ Error handling implemented

✓ Loading state implemented

✓ Empty state handled

✓ Documentation updated (if needed)

✓ No console errors

✓ Reusable components used

✓ Code follows project standards

---

# Final Principle

Every line of code should make the project easier to maintain, not harder.

When in doubt, choose the simpler solution.
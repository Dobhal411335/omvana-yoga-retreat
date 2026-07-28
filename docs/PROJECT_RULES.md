# PROJECT RULES

Project Name

Omvana Retreat CMS

Version

1.0

---

## Purpose

This document is the single source of truth for the project.

Every AI assistant, developer, and contributor must follow these rules before writing or modifying code.

Unless explicitly instructed, never violate these rules.

---

## Documentation Hierarchy

Always follow documents in this order.

1. PROJECT_RULES.md
2. ARCHITECTURE.md
3. DESIGN_SYSTEM.md
4. UI_GUIDELINES.md
5. DEVELOPMENT_GUIDE.md
6. Feature Specifications

If two documents conflict, the one higher in this list wins.

---

## Core Philosophy

The project should feel:

• Calm
• Premium
• Elegant
• Minimal
• Human
• Spacious
• Timeless

Never build a dashboard that feels corporate.

Never build a frontend that feels like a template.

---

## Technology

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

UI Library

shadcn/ui

Icons

Lucide React

Animations

Framer Motion

Authentication

JWT + HTTP Only Cookie

Emails

Brevo

Storage

Cloudinary

Logger

Winston

Validation

React Hook Form + Zod

---

## Project Rules

Never hardcode website content.

Everything visible must be editable from Admin.

Create reusable components.

Avoid duplicated code.

Keep components focused on one responsibility.

Always handle loading states.

Always handle empty states.

Always handle errors.

Use environment variables for secrets.

Use async/await.

Use clean folder structure.

Never introduce new UI styles that conflict with the design system.

---

## Before Creating Any Feature

Always:

Read ARCHITECTURE.md

Read DESIGN_SYSTEM.md

Read UI_GUIDELINES.md

Then begin development.

---

## Before Editing Existing Code

Understand existing implementation.

Reuse components.

Never rewrite working code without reason.

Prefer extending instead of replacing.

---

## Commit Philosophy

One feature per commit.

One bug per commit.

One UI improvement per commit.

Never mix unrelated changes.

---

## AI Behaviour

When generating code:

Do not create unnecessary abstractions.

Do not install unnecessary packages.

Do not introduce technologies outside this documentation.

Prefer maintainability over cleverness.
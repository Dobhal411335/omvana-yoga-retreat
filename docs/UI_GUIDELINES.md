# UI_GUIDELINES.md

# Omvana Retreat CMS

UI Guidelines

Version 1.0

---

# Purpose

This document defines how every user interface should be designed.

It applies to:

- Public Website
- Admin Dashboard
- Forms
- Tables
- Navigation
- Dialogs
- Empty States
- Loading States

This document should always be followed together with DESIGN_SYSTEM.md.

---

# General UI Rules

Every screen should have one clear purpose.

Avoid clutter.

Prioritize readability over decoration.

Every component should have breathing room.

Never create different versions of the same component unless absolutely necessary.

Reuse components whenever possible.

---

# Website Layout

Structure

Navbar

↓

Hero

↓

Content Sections

↓

CTA

↓

Footer

Every page should follow this structure unless the content requires a different layout.

---

# Navbar

Transparent over Hero.

Solid background after scrolling.

Desktop

- Logo on left
- Navigation center
- CTA button on right

Mobile

- Logo
- Menu button
- Full-screen slide menu

Rules

Sticky navigation.

Large click targets.

Smooth transition.

Never overcrowd the navbar.

---

# Hero Section

Purpose

Immediately communicate calmness and luxury.

Layout

Large full-width image.

Large heading.

Supporting paragraph.

Primary CTA.

Optional secondary CTA.

Rules

Hero image should occupy at least 70vh.

Never place too much text.

Avoid more than two buttons.

---

# Section Layout

Every section contains

Section Label (optional)

↓

Heading

↓

Description

↓

Content

↓

Spacing before next section

Maximum content width

1200px

Reading width

720px

---

# Section Heading

Heading

Large serif font.

Description

Readable width.

Muted colour.

Center aligned when appropriate.

---

# Cards

Use one card style across the project.

Structure

Image

↓

Title

↓

Description

↓

CTA

Rules

Equal heights.

Rounded corners.

Soft border.

Minimal shadow.

---

# Retreat Cards

Image

Title

Duration

Location

Short description

Button

Cards should always align evenly.

Images should have consistent aspect ratios.

---

# Gallery

Grid layout.

Consistent image sizes.

Rounded corners.

Hover zoom effect.

Lazy loading.

Open image dialog on click.

Future support for categories.

---

# Testimonials

Image

↓

Name

↓

Location

↓

Rating

↓

Review

Cards should never feel cramped.

---

# CTA Sections

Large background.

Minimal content.

One heading.

One description.

One button.

Never include excessive information.

---

# Contact Section

Simple.

Clean.

Comfortable spacing.

Fields

Name

Email

Phone

Message

Submit Button

Validation messages should appear beneath fields.

---

# Footer

Dark background.

Minimal links.

Contact information.

Social icons.

Copyright.

Privacy links.

No unnecessary widgets.

---

# Admin Dashboard

Overall Philosophy

The dashboard should feel like:

Linear

Stripe

Vercel

Shopify

Never like:

Bootstrap Admin

Classic CRM

ERP

---

# Dashboard Layout

Sidebar

↓

Top Header

↓

Page Header

↓

Content

↓

Footer

---

# Sidebar

Dark background.

Collapsible.

Logo at top.

Grouped navigation.

Icons from Lucide.

Active page highlighted.

No nested menus beyond two levels.

---

# Top Header

Contains

Search

Notifications

Profile

Breadcrumb

Sticky on scroll.

---

# Dashboard Home

Display

Overview Cards

Recent Activity

Recent Enquiries

Website Status

Storage Status

Quick Actions

Avoid overwhelming the user.

---

# Page Header

Every admin page should have

Title

↓

Description

↓

Action Button (optional)

↓

Divider

---

# Tables

Use TanStack Table.

Minimal borders.

Comfortable spacing.

Search above table.

Pagination below.

Bulk actions when needed.

Empty state if no data.

---

# Forms

Only use shadcn/ui components.

Each field includes

Label

Placeholder

Validation

Helper text (optional)

Error message

Required indicator when applicable.

---

# Buttons

Primary

Secondary

Outline

Ghost

Danger

Only these variants are allowed.

---

# Dialogs

Use for

Delete confirmation

Image preview

Settings

Large forms

Rounded corners.

Clear actions.

Escape closes dialog.

---

# Toast Notifications

Success

Green

Error

Red

Warning

Amber

Info

Neutral

Short messages.

Never block the interface.

---

# Image Upload

Preview immediately.

Show upload progress.

Allow remove before saving.

Display validation errors.

Support drag and drop.

---

# Search

Always placed above data.

Instant filtering when practical.

Clear empty state.

---

# Filters

Compact.

Responsive.

Multiple filters should wrap gracefully.

Reset option always available.

---

# Empty States

Illustration or icon.

Short explanation.

Primary action.

Never show blank pages.

Example

"No gallery images yet."

[Upload Image]

---

# Loading States

Use Skeleton components.

Avoid spinners unless necessary.

Maintain layout while loading.

---

# Error States

Friendly message.

Retry button.

Never expose technical details.

---

# Confirmation Dialog

Used before

Delete

Logout

Permanent actions

Should include

Title

Description

Primary action

Cancel action

---

# Pagination

Bottom aligned.

Current page highlighted.

Keep controls simple.

---

# Breadcrumb

Always show current hierarchy.

Example

Dashboard / Gallery / Create

---

# Responsive Behaviour

Desktop

Full sidebar.

Tablet

Collapsible sidebar.

Mobile

Drawer navigation.

No horizontal scrolling.

---

# Accessibility

Keyboard navigation.

Visible focus states.

ARIA labels where appropriate.

Proper form labels.

Alt text for images.

Semantic HTML.

---

# Micro Interactions

Hover effects

Button feedback

Card elevation

Input focus

Sidebar animation

Image hover

Keep interactions subtle.

---

# Icons

Lucide React only.

Consistent sizing.

Do not mix filled and outlined styles.

---

# Component Reuse

Never duplicate components.

If a component is reused more than once, move it into the shared components directory.

---

# Future UI Modules

Blog

Events

Teachers

Courses

Newsletter

These modules should reuse existing layouts and components without introducing new visual patterns.

---

# Final Principle

If a user moves from the public website to the admin dashboard, both experiences should feel like they belong to the same product.

Consistency is more important than originality.
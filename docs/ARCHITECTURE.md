# Omvana Retreat CMS

# Architecture Document

Version: 1.0

---

# Overview

Omvana Retreat CMS is a premium content management system built entirely with **Next.js App Router**.

The application consists of two parts inside a single Next.js project.

- Public Website
- Admin Dashboard

Both share the same backend through Next.js Route Handlers and connect to a single MongoDB database.

There is only one administrator.

No employee roles.

No customer login.

No payment gateway.

No multi-tenancy.

The primary goal is simplicity, maintainability and scalability.

---

# Technology Stack

## Framework

Next.js App Router

## Language

JavaScript

## Styling

TailwindCSS

## Component Library

shadcn/ui

## Icons

Lucide React

## Animation

Framer Motion

## Database

MongoDB Atlas

## ODM

Mongoose

## Authentication

JWT

HTTP Only Cookie

## Password Encryption

bcryptjs

## Forms

React Hook Form

Zod

## Image Storage

Cloudinary

## Email

Brevo

## Logging

Winston

---

# High Level Architecture

```

Browser

↓

Next.js Application

↓

Route Handlers

↓

Services

↓

MongoDB

↓

Cloudinary

↓

Brevo

```

Everything passes through Route Handlers.

There is no Express server.

---

# Project Structure

src/

app/

(website)/

admin/

api/

components/

admin/

website/

common/

forms/

layout/

ui/

features/

hooks/

lib/

middleware/

models/

services/

providers/

utils/

constants/

config/

styles/

public/

images/

docs/

```

---

# Folder Responsibilities

## app/

Contains all routes.

Examples

Home

Gallery

About

Contact

Admin

API

---

## components/

Reusable UI.

Never place business logic here.

Subfolders

admin/

website/

ui/

common/

layout/

forms/

---

## features/

Business modules.

Each feature owns its components, helpers and logic.

Example

gallery/

hero/

retreats/

contact/

testimonials/

settings/

---

## services/

Contains reusable business logic.

Examples

cloudinaryService

brevoService

enquiryService

authenticationService

---

## lib/

Configuration files.

Examples

mongodb.js

cloudinary.js

logger.js

brevo.js

auth.js

---

## middleware/

Authentication middleware.

No business logic.

---

## models/

Mongoose schemas.

One model per file.

---

## hooks/

Reusable React hooks.

---

## providers/

React Providers.

Theme

Toast

Etc.

---

## utils/

Generic helper functions.

Never include feature logic.

---

# Routing Structure

Public

/

about

gallery

retreats

contact

privacy-policy

terms

---

Admin

/admin/login

/admin

/admin/content

/admin/gallery

/admin/packages

/admin/testimonials

/admin/enquiries

/admin/settings

---

API

/api/auth

/api/gallery

/api/packages

/api/testimonials

/api/enquiries

/api/settings

---

# Rendering Strategy

Use Server Components by default.

Only use Client Components when necessary.

Examples requiring Client Components

Forms

Animation

Image Upload

Dialogs

Dropdowns

Interactive Filters

Everything else should remain Server Components.

---

# Authentication Flow

There is only one administrator.

No registration.

Admin account is manually created.

Flow

Admin Login

↓

Validate Input

↓

Find Admin

↓

Compare Password

↓

Generate JWT

↓

Store HTTP Only Cookie

↓

Redirect Dashboard

↓

Middleware Protects Routes

↓

Logout

↓

Clear Cookie

---

# Protected Routes

Everything inside

/admin

requires authentication.

Public pages remain accessible.

---

# Middleware Responsibilities

Verify JWT.

Validate Cookie.

Redirect unauthenticated users.

Redirect authenticated users away from Login.

Nothing more.

Middleware should remain lightweight.

---

# Database Collections

Admin

Hero

RetreatPackage

Gallery

GalleryCategory

Testimonial

Enquiry

WebsiteSettings

ContactInformation

Newsletter

ActivityLog

---

# Cloudinary Flow

Image Selected

↓

Validate

↓

Upload

↓

Receive Secure URL

↓

Store URL in MongoDB

↓

Display

↓

Delete Image

↓

Delete Cloudinary Asset

↓

Remove MongoDB Record

---

# Brevo Flow

Visitor submits enquiry

↓

Validate

↓

Save to MongoDB

↓

Send Confirmation Email

↓

Send Admin Notification

↓

Return Success

---

# Logger Flow

Only authentication logs.

Log

Successful Login

Failed Login

Logout

Session Expired

Each log stores

Date

Time

Email

IP Address

Browser

Operating System

Result

Reason

Logs use Winston.

---

# API Response Format

Every API returns

{
success,
message,
data
}

Example

{
"success": true,
"message": "Gallery loaded successfully",
"data": []
}

Errors

{
"success": false,
"message": "Gallery not found",
"data": null
}

Never return inconsistent structures.

---

# Error Handling

Every Route Handler must

Validate

Try

Catch

Log

Return meaningful message

Never expose stack traces.

---

# Validation Strategy

Frontend

React Hook Form

+

Zod

Backend

Zod

Never trust frontend validation.

---

# Environment Variables

MONGODB_URI

JWT_SECRET

JWT_EXPIRES

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

BREVO_API_KEY

BREVO_SENDER_EMAIL

NEXT_PUBLIC_SITE_URL

---

# Image Rules

Maximum Size

5MB

Allowed

jpg

jpeg

png

webp

Automatically optimise before storing.

---

# Reusable Components

Container

Section

SectionTitle

Button

Input

Textarea

Select

Dialog

Loader

EmptyState

PageHeader

ImageUploader

Pagination

Table

DeleteDialog

ConfirmationDialog

These components should never contain feature-specific logic.

---

# Naming Convention

Folders

lowercase

Files

PascalCase for components

camelCase for utilities

Routes

kebab-case

Database Models

PascalCase

Environment Variables

UPPER_CASE

---

# Coding Principles

Single Responsibility.

Reusable Components.

Composition over duplication.

Server Components first.

Never hardcode content.

Never duplicate styles.

Keep components small.

Prefer readability over cleverness.

Keep business logic outside UI.

---

# Scalability

Future modules should plug into the existing architecture without changing the existing folder structure.

Examples

Blog

Events

Teachers

Courses

Bookings

Donations

Newsletter

---

# Deployment

Platform

VPS

Process Manager

PM2

Reverse Proxy

Nginx

Environment

Production

Next.js Build

MongoDB Atlas

Cloudinary

Brevo

---

# Final Goal

The project should remain simple enough for a single developer to maintain while being structured enough to grow into a professional production application.

Every decision should favour clarity, consistency and maintainability over unnecessary complexity.
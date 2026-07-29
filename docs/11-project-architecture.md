# 11-project-architecture.md

# Omvana Retreat CMS

Version 1.0

---

# Project Goal

Develop a premium content-managed website using **Next.js App Router**.

The project contains both:

- Public Website
- Admin Dashboard

inside one Next.js project.

The project should remain simple, scalable and easy to maintain.

There are NO employee roles.

There is only ONE Admin login.

Everything displayed on the website should be editable from the Admin Panel.

---

# Technology Stack

Framework

Next.js 15+

Language

JavaScript

Styling

TailwindCSS

UI

shadcn/ui

Icons

Lucide React

Animations

Framer Motion

Database

MongoDB Atlas

ODM

Mongoose

Authentication

JWT

HTTP Only Cookies

Password Hashing

bcryptjs

Validation

Zod

Forms

React Hook Form

Emails

Brevo

Image Storage

Cloudinary

Logger

Winston

Date Library

dayjs

Notifications

React-hot toast

Tables

TanStack Table

Charts (Future)

Recharts

---

# What We Are NOT Using

Express

Redux

Role Based Access

Socket.io

Redis

SEO Package

Caching

Audit Trail

Analytics

Internationalization

Payments

Multi Tenant

Multiple Admins

---

# Application Structure

One Next.js application.

Inside the project there are two major parts.

Public Website

Admin Dashboard

Both communicate with the same MongoDB database.

Everything uses Next.js Route Handlers.

No separate Express server.

---

# Folder Structure

src/

    app/

        (website)/

        admin/

        api/

    components/

        ui/

        common/

        website/

        admin/

        forms/

        layout/

    features/

        authentication/

        hero/

        philosophy/

        retreats/

        gallery/

        testimonials/

        enquiry/

        contact/

        footer/

        navbar/

        settings/

    lib/

        mongodb.js

        cloudinary.js

        brevo.js

        logger.js

        auth.js

        validators.js

        helpers.js

        constants.js

    models/

    services/

    hooks/

    actions/

    middleware/

    utils/

    providers/

    styles/

    data/

    config/

---

# Route Structure

/

Home

/about

/gallery

/retreats

/plan-your-retreat

/contact

/privacy-policy

/terms

/admin/login

/admin

/admin/content

/admin/gallery

/admin/packages

/admin/testimonials

/admin/enquiries

/admin/settings

---

# Website Flow

Visitor

↓

Visits Home

↓

Browses Pages

↓

Views Gallery

↓

Views Packages

↓

Submits Enquiry

↓

Receives Confirmation Email

↓

Admin receives Email

↓

Enquiry stored in MongoDB

---

# Admin Flow

Admin opens

/admin/login

↓

Login

↓

JWT Generated

↓

HTTP Only Cookie

↓

Redirect

↓

Dashboard

↓

Manage Website

↓

Logout

---

# Authentication Flow

Only one administrator.

No user registration.

Admin account is manually inserted into MongoDB.

Login Page

↓

Validate

↓

Compare Password

↓

Generate JWT

↓

Store Cookie

↓

Redirect Dashboard

↓

Middleware protects

/admin

↓

Logout clears cookie

---

# Protected Routes

Everything inside

/admin

requires authentication.

Public routes never require login.

---

# Middleware Responsibilities

Check JWT

Validate Cookie

Redirect if unauthenticated

Prevent logged-in admin from revisiting login page

Nothing more.

---

# Database Collections

Admin

Hero

RetreatPackage

Gallery

GalleryCategory

Testimonial

ContactInformation

WebsiteSettings

Enquiry

Newsletter

ActivityLog

---

# Cloudinary Flow

Admin uploads image

↓

Temporary validation

↓

Cloudinary Upload

↓

Receive URL

↓

Save URL into MongoDB

↓

Display image

↓

Delete

↓

Delete from Cloudinary

↓

Delete from MongoDB

---

# Brevo Flow

Visitor submits enquiry

↓

Validate Form

↓

Save Database

↓

Send confirmation email

↓

Send admin notification

↓

Success response

---

# Logger Flow

Only authentication events.

Login Success

Login Failure

Logout

Session Expired

Each log contains

Timestamp

IP Address

Browser

Operating System

Email

Status

Reason

Logs stored using Winston.

---

# Error Handling

Every API should return

Success

Message

Data

Errors

Status Code

Example

{
success:true,
message:"",
data:{}
}

Never return inconsistent responses.

---

# API Convention

/api/auth/login

/api/auth/logout

/api/hero

/api/gallery

/api/packages

/api/testimonials

/api/enquiries

/api/settings

Every route should support only required methods.

---

# Image Rules

Maximum Size

5MB

Allowed Types

jpg

jpeg

png

webp

Images should be optimized before upload.

---

# Form Validation

React Hook Form

+

Zod

Validation happens

Frontend

Backend

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

# Reusable Components

Button

Input

Textarea

Select

Dialog

Alert

Card

Table

Loader

Badge

Pagination

Breadcrumb

ImageUploader

RichTextEditor

PageHeader

SectionHeader

EmptyState

DeleteDialog

ConfirmDialog

No duplicated components.

---

# Naming Convention

Components

PascalCase

Functions

camelCase

Variables

camelCase

Folders

lowercase

Routes

kebab-case

Database Models

PascalCase

Environment Variables

UPPER_CASE

---

# Coding Standards

One component per file.

One responsibility per component.

Keep files small.

No business logic inside UI.

Use reusable hooks.

Avoid duplicated code.

Prefer composition.

Always validate input.

Always catch errors.

---

# Responsive Breakpoints

Mobile

Tablet

Laptop

Desktop

Large Desktop

Website must be responsive.

Admin should also work on tablets.

---

# Future Ready

The architecture should allow future additions without major refactoring.

Possible future modules

Blogs

Events

Donation

Booking

Yoga Teachers

Courses

Newsletter Automation

Language Support

These should plug into the existing structure naturally.

---

# Final Goal

Build a calm, luxurious, highly maintainable CMS where every visible piece of website content is editable from a beautifully designed admin dashboard while keeping the codebase simple, modular and scalable.
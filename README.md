# SecureShare Hub

Create a modern B2B web application for secure file exchange between an Administrator and multiple Companies.

The application should look like a premium SaaS dashboard built with:

- React

- Tailwind CSS

- shadcn/ui

- Lucide Icons

- Modern minimalist design

- Soft shadows

- Rounded corners

- Responsive layout

Do NOT generate any landing page or marketing pages.

Generate only the authenticated application.

------------------------------------------------

ROLES

There are only two roles:

1. Administrator

2. Company User

The application automatically shows the correct dashboard depending on the logged user.

------------------------------------------------

ADMIN APPLICATION

Use a left sidebar.

Menu:

- Dashboard

- Companies

- File Exchange

- Audit Log

- Settings

Topbar:

- Notifications

- Profile Menu

------------------------------------------------

ADMIN DASHBOARD

Create a modern dashboard with statistics.

Cards:

• Total Companies

• Files Received

• Files Sent

• Pending Deliveries

Below create a Recent Activity section showing actions like:

- Company uploaded a file

- Administrator sent a file

- Company created

- File downloaded

Also include a notification panel showing companies that uploaded new files and require review.

------------------------------------------------

COMPANIES PAGE

Display companies inside a modern DataTable.

Columns:

Logo

Company

RUC

User

Email

Position

Status

Actions

Top actions:

Search

Filters

New Company button

Each row should have:

View

Edit

Delete

------------------------------------------------

NEW COMPANY

Create a dedicated page instead of a modal.

Use a Card with sections.

Fields:

Company Name

RUC

Username

Email

Position

Company Logo

Password

Buttons:

Cancel

Create Company

------------------------------------------------

COMPANY DETAIL PAGE

Display company information inside a clean layout.

Header:

Logo

Company Name

RUC

Email

Position

Status Badge

Below create three cards.

Card 1

Latest File Received

Filename

Upload Date

Download Button

Delete Button

Card 2

Latest File Sent

Filename

Sent Date

Download Button

Delete Button

Card 3

Send New File

Large Drag & Drop upload area

Upload button

Show upload progress

Display success message after upload.

------------------------------------------------

FILE EXCHANGE PAGE

Display all exchanged files.

Columns:

Company

Direction

Filename

Status

Sent Date

Downloaded Date

Actions

Status badges:

Pending

Available

Downloaded

Deleted

Use filters by company and status.

------------------------------------------------

AUDIT LOG

Modern table.

Columns:

Date

User

Action

Entity

Description

Example actions:

Company Created

Company Updated

Password Changed

File Uploaded

File Downloaded

File Deleted

Login

Logout

------------------------------------------------

COMPANY USER APPLICATION

Use a smaller sidebar.

Menu:

- Home

- My Files

- Profile

------------------------------------------------

HOME

Display a welcome card.

Show company information.

Create two cards.

Latest Received File

Filename

Received Date

Download Button

Latest Uploaded File

Filename

Upload Date

Status

------------------------------------------------

MY FILES

Large upload area.

Allow uploading ONLY ONE active file.

If a file already exists, ask for confirmation before replacing it.

Show:

Current uploaded file

Upload date

Status

Upload button

Replace button

Delete button

------------------------------------------------

PROFILE

Allow updating:

Password

Profile picture

Contact email

------------------------------------------------

NOTIFICATIONS

Administrator receives a notification whenever a company uploads a file.

Show unread notifications in the bell icon.

------------------------------------------------

UX REQUIREMENTS

Use modern cards instead of large forms.

Use confirmation dialogs before deleting or replacing files.

Use skeleton loaders.

Use empty states.

Use toast notifications.

Use drag-and-drop upload.

Use badges for file status.

Use responsive layouts.

Generate realistic mock data for companies, users and files.

The application should feel similar to Linear, Vercel Dashboard, Clerk Dashboard or Stripe Dashboard.

Focus on premium UX/UI rather than basic CRUD pages.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aura-files.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c483095c-472f-4d6f-90ac-ef0bde1023f0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

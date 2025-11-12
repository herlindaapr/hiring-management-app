# Hiring Apps

A Next.js 14 application for managing job postings and candidate applications. Admins can create roles, review applicants submitted through the candidate-facing flow, and track each application end-to-end.

## Features

- **Job Management** – Create, list, and manage job openings from the admin dashboard.
- **Candidate Application Flow** – Candidates browse available jobs, apply through a dedicated form, and their submissions are persisted locally.
- **Job-aware Applications** – Each application tracks the job the candidate selected, enabling filtered review per opening.
- **Local Storage Persistence** – Applicant data is saved in `localStorage` so the admin view survives page reloads during development.
- **Interactive UI Components** – Custom inputs for dates, phone numbers, domicile selection, and job cards tailored for the hiring workflow.

## Tech Stack

- [Next.js 14](https://nextjs.org)
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth](https://next-auth.js.org) (API scaffolding for auth)

## Getting Started

### Prerequisites

- Node.js 18+
- npm (comes with Node) or your preferred package manager

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Application Workflows

### Admin Dashboard

- Visit `/admins` to see the job management dashboard.
- Use **Create a new job** to open the job creation modal.
- Each job card exposes a **Manage Job** button that navigates to `/admins/manage-job?id=<jobId>` and filters the candidate list to that specific job.

### Candidate Experience

- Visit `/candidates` to browse available roles.
- Selecting a job card and clicking **Apply** routes candidates to `/candidates/apply-job?jobId=<jobId>`.
- After submission, the application is stored locally and visible on the corresponding manage-job page.

## Sample Accounts

Use the following credentials when testing authentication-related flows:

- **User** – `user@example.com` / `user123`
- **Admin** – `admin@example` / `admin123`

> These credentials are intended for local development and demonstration purposes.

## Project Structure

```
src/
  app/
    admins/          # Admin dashboard & manage-job views
    candidates/      # Candidate job list and apply form
    components/      # Shared UI components
    context/         # React context for job management
    api/             # API routes (NextAuth, provinces data)
```

## Data Notes

- Applications are persisted via `window.localStorage` under the key `submittedCandidates`.
- Seed data is provided for both jobs and candidates to showcase the UI when the store is empty.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-update`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push the branch: `git push origin feature/my-update`.
5. Open a pull request describing your changes.

## License

This project is distributed for educational purposes. Adapt or extend it to fit your hiring workflow needs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email Notifications (all website forms)

Every form on the site emails its submitted details to **chiekenn@gmail.com** (configurable via `NOTIFICATION_EMAIL`) as soon as the visitor clicks submit:

| Form | Page | API route |
| --- | --- | --- |
| Contact enquiry | `/contact` | `/api/enquiry` |
| Expression of Interest / Programme Application | `/apply` | `/api/application` |
| Postgraduate Application (passport photo attached) | `/apply` | `/api/application/postgraduate` |
| Entrepreneur Training Registration (passport photo attached) | `/entrepreneur-training` | `/api/application/training` |

Each email's **Reply-To** is set to the person who filled the form, so you can reply straight from Gmail. The email code lives in `src/lib/mailer.ts`.

To enable email delivery, configure SMTP environment variables (see `.env.example`):

```bash
NOTIFICATION_EMAIL="chiekenn@gmail.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password"
```

For Gmail, create an **App Password** (Google Account → Security → 2-Step Verification → App passwords) and use it as `SMTP_PASS`. Submissions are also saved to the database when one is configured; a submission only fails if **both** the database save and the email delivery fail.

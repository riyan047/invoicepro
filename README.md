# 💼 InvoicePro

**InvoicePro** is a sleek, modern invoicing platform built for freelancers, entrepreneurs, and small businesses.

With InvoicePro, users can:
- 🧾 **Create** and manage professional invoices  
- 📩 **Send** invoices via email to clients using Tailtrap (via Nodemailer)  
- 📊 **Track** all invoices with payment statuses  
- 🔔 **Send follow-up reminders** manually via email  

🌐 [Live App](https://invoicepro.riyang.co.in/)

---

## 🚀 Features

- ✅ Easy invoice creation with line items and notes  
- ✉️ Email delivery of invoices via Nodemailer + Tailtrap  
- 📁 Organize and filter invoices by status (paid, unpaid)  
- 🔍 Track all sent invoices from your dashboard  
- 🔔 Manually send follow-up emails as payment reminders  
- 👥 Manage customer contacts  
- 📄 PDF invoice download to customers  

---

## 🖥️ Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS  
- **Backend**: Next.js API routes, Prisma  
- **Database**: PostgreSQL  
- **Auth**: [NextAuth.js](https://next-auth.js.org/)  
- **Email Service**: Nodemailer + Tailtrap SMTP  

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/invoicepro.git
cd invoicepro

## 2. Install Dependencies
bash
Copy code
npm install
# or
yarn

## 3. Configure Environment Variables
Create a .env.local file in the root directory and add the following:

env
Copy code
AUTH_SECRET=your_nextauth_secret

EMAIL_SERVER_USER=your_tailtrap_username
EMAIL_SERVER_PASSWORD=your_tailtrap_password
EMAIL_SERVER_HOST=smtp.mailtrap.io
EMAIL_SERVER_PORT=587
EMAIL_FROM=no-reply@invoicepro.riyang.co.in

DATABASE_URL=your_postgres_database_url
MAILTRAP_TOKEN=your_mailtrap_token


## 4. Run the Development Server
bash
Copy code
npm run dev
# or
yarn dev
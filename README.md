# 🚀 Starter Backend API

A secure, modular, and production-ready Node.js backend boilerplate built with **Express**, **MongoDB**, **JWT authentication**, **AWS S3 file upload**, **SMTP email sending**, and **role-based access control**.

---

## 🧰 Features

- 🛡️ JWT Authentication with refresh token support
- 🔒 Role-based access control (`admin`, `employee`)
- 📤 AWS S3 file upload and retrieval
- 📧 Nodemailer email service via SMTP
- 📂 Clean Express routing structure
- 🧪 Integrated with Jest & Supertest for unit and integration testing
- 🔍 ESLint + Prettier + AirBnB config
- 🌱 Database seeding for roles and admin user
- 🌐 CORS & Helmet for security
- 🧾 API request logging with Morgan
- ⚙️ Environment config with dotenv

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- AWS S3
- JWT
- Nodemailer
- Jest & Supertest
- ESLint + Prettier
- Husky (Git hooks)

---

## 🛠️ Getting Started

###  Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
yarn install
````

## 🧾  Environment Configuration

```bash
PORT=4001
APP_URL=http://localhost:4001

MONGO_DB_URL=mongodb://localhost:27017/your_db_name

ACCESS_TOKEN_SECRET=yourAccessTokenSecret
ACCESS_TOKEN_EXPIRES=30m
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
REFRESH_TOKEN_EXPIRES=7d
ACCESS_TOKEN_SIGN_ALGO=HS256

DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=YourStrongPassword

AWS_ACCESS_KEY=yourAWSAccessKey
AWS_SECRET_ACCESS_KEY=yourAWSSecret
AWS_REGION=us-east-1
AWS_BUCKET=yourBucketName

SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=465
SMTP_EMAIL=no-reply@yourdomain.com
SMTP_PASSWORD=yourSMTPPassword
APP_NAME=StarterApp
````

## 📦  Available Commands
```bash
yarn dev         # Start development server with nodemon
yarn start       # Start production server
yarn format      # Format code with Prettier
yarn lint        # Lint code using ESLint
yarn test        # Run unit and integration tests
````

## 🗂️  Project Structure
```bash
starter/
├── src/
│   ├── config/           # AWS, SMTP, file types
│   ├── controllers/      # Auth, Email, File, etc.
│   ├── helpers/          # JWT, password hashing, etc.
│   ├── middlewares/      # Error handling, auth checks
│   ├── models/           # Mongoose models (User, Role)
│   ├── routes/           # Route definitions
│   ├── services/         # AWS S3, Emailing
│   └── index.js          # App entry point
├── test/                 # Jest + Supertest test suites
├── .env.example          # Environment variable template
├── .eslintrc.js          # ESLint config
├── .prettierrc           # Prettier config
├── package.json
└── README.md
````

## 📡  Example APIs
### 🔐 Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refreshToken
- GET /api/v1/auth/me (requires token)

### 📁 Files
- POST /api/v1/file/upload
- GET /api/v1/file/find?path=your-folder/

### ✉️ Email
- POST /api/v1/email/send

### 📚  References
- Express.js
- MongoDB
- AWS SDK
- Nodemailer
- jsonwebtoken
- dotenv
- jest
- supertest
- eslint
- prettier

## 👤  Author

**Saif Borghol**  
MIT Licensed – Feel free to fork and adapt.

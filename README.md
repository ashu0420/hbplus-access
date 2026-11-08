# HB+ Access

A cross-platform application built using React Native and Expo, supporting Android and Web.

The application implements Google OAuth authentication and restricts access based on an allowed email domain using Firebase Authentication.

**Live Demo:** https://hb-plus-assignment.netlify.app


## Features

- Google Sign-In
- Email domain validation
- Protected dashboard
- Persistent authentication
- Logout functionality
- Loading and error handling
- Responsive mobile and web interface

## Tech Stack

- React Native
- React Native Web
- Expo
- Expo Router
- Firebase Authentication
- Google OAuth 2.0
- TypeScript

## Project Structure

```text
src/
├── app/
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── _layout.tsx
├── auth/
│   ├── useAuth.ts
│   ├── googleSignIn.ts
│   ├── googleSignIn.native.ts
│   └── googleSignIn.web.ts
└── config/
    ├── accessPolicy.ts
    ├── auth.ts
    ├── auth.native.ts
    ├── auth.web.ts
    └── firebase.ts
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ashu0420/hbplus-access
cd hbplus-access
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN=your-allowed-domain
```

Replace `your-allowed-domain` with the domain that should be authorized.

Example:

```env
EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN=hbplus.fit
```

Configure Firebase using your Firebase project credentials.
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

### 4. Start the application

Start the Expo development server:

```bash
npx expo start
```

### 5. Run on Web

```bash
npx expo start --web
```

### 6. Run on Android

Start the development server:

```bash
npx expo start --dev-client
```

Open the application in your configured Android development client.

## Authentication Flow

1. The user opens the application.
2. The application checks the current Firebase authentication state.
3. An authenticated and authorized user is redirected to the dashboard.
4. An unauthenticated user sees the login page.
5. The user clicks Continue with Google.
6. Google OAuth authenticates the user.
7. The application retrieves the user's email.
8. The email domain is validated against the configured allowed domain.
9. Authorized users are granted access to the dashboard.
10. Unauthorized users receive an access restriction error.

## Domain Restriction

The application uses the configured email domain to determine whether a user is authorized.

For example, if the allowed domain is:

```text
hbplus.fit
```

An email such as:

```text
user@hbplus.fit
```

is allowed.

An email such as:

```text
user@outlook.com
```

is rejected.

The domain validation is implemented in:

```text
src/config/accessPolicy.ts
```

The application checks authorization during Google Sign-In and before displaying protected dashboard content.

## Protected Dashboard

The dashboard is accessible only to authenticated users who satisfy the configured domain restriction.

Unauthenticated users are redirected to the login page.

Unauthorized users are not allowed to access the dashboard.

The application also supports logout, which signs the user out of Firebase Authentication.

## Platforms

The application supports:

- Android
- Web

The project uses React Native with Expo and Expo Router for cross-platform development.

## Assignment

This project was developed as part of an assignment to implement Google authentication, email domain restriction, protected routes, and cross-platform support using React Native.
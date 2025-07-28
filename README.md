# Fish Restaurant - Next.js Application

A modern fish restaurant website with reservation system built with Next.js, Firebase, and TypeScript.

## Features

- 🍽️ Restaurant menu with categories
- 📅 Table reservation system
- 🖼️ Photo gallery
- 👨‍💼 Admin panel for managing dishes, gallery, and reservations
- 📧 Email notifications for reservations
- 📱 Responsive design

## Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd fish-restaurant
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Storage
3. Create a web app in your Firebase project
4. Generate a service account key from Project Settings > Service Accounts

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
```

Fill in the Firebase configuration:
- Get the client config from Firebase Console > Project Settings > General
- Generate service account JSON and convert to base64:
  ```bash
  base64 -i path/to/your/service-account-key.json
  ```

### 4. Development

```bash
npm run dev
```

## Deployment

### Netlify Deployment

1. **Push to Git repository** (GitHub, GitLab, etc.)

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

3. **Environment Variables**
   - In Netlify dashboard: Site settings > Environment variables
   - Add all the variables from your `.env.local` file
   - **Important**: Make sure all Firebase environment variables are properly set

4. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

5. **Deploy**
   - Click "Deploy site"

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard

## Important Notes for Deployment

⚠️ **Firebase Configuration Required**: The app will fail to build if Firebase environment variables are not properly configured. Make sure:

- All `NEXT_PUBLIC_FIREBASE_*` variables are set
- `GOOGLE_SERVICE_ACCOUNT_BASE64` is properly encoded
- `BASE_URL` is set to your production domain

The application gracefully handles missing Firebase configuration during development but requires it for production builds.

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin panel
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions and Firebase config  
├── public/               # Static assets
└── styles/               # CSS styles
```

## API Routes

- `/api/reservations` - Create reservations
- `/api/reservations/slots` - Check availability
- `/api/admin/dishes` - Manage menu items
- `/api/admin/gallery` - Manage gallery
- `/api/admin/reservations` - Manage reservations

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

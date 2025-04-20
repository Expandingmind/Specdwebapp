# SpecdR - Car Enthusiast Social Platform

SpecdR is a modern social platform for car enthusiasts to share and discover custom car builds. Built with Next.js, Firebase, and Tailwind CSS.

![SpecdR - Car Enthusiast Community](https://placehold.co/1200x630/FF4605/FFFFFF/png?text=SpecdR)

## Features

- **Share Custom Builds**: Showcase your custom cars with detailed specs and high-quality photos
- **Explore Builds**: Discover amazing custom car builds from enthusiasts around the world
- **Social Interaction**: Like, comment, and share car builds with the community
- **User Profiles**: Create your profile and manage your collection of custom builds
- **Responsive Design**: Perfect experience on any device

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Expandingmind/Specdwebapp.git
cd Specdwebapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Firebase and NextAuth configuration:
```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_string_for_nextauth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

The easiest way to deploy SpecdR is through [Vercel](https://vercel.com):

1. Push your code to a GitHub repository.
2. Import the project to Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all car enthusiasts who inspired this project.
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/). 
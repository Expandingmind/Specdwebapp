import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout/Layout';
import AuthProvider from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpecdR - Custom Car Builds Community',
  description: 'A community for car enthusiasts to share and discover amazing custom builds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
} 
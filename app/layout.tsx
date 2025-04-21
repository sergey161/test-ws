import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/redux/provider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: 'Пользователи и комментарии',
    description:
        'Одностраничное приложение для отображения пользователей и комментариев',
};

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

export default RootLayout;

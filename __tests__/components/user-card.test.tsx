import type React from 'react';
import { render, screen } from '@testing-library/react';
import { UserCard } from '@/components/user-card';
import '@testing-library/jest-dom';

// Мок для next/link
jest.mock('next/link', () => {
    return ({
        children,
        href,
    }: {
        children: React.ReactNode;
        href: string;
    }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('UserCard', () => {
    const mockUser = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
            street: 'Main St',
            suite: 'Apt 1',
            city: 'New York',
            zipcode: '10001',
            geo: {
                lat: '40.7128',
                lng: '-74.0060',
            },
        },
        phone: '123-456-7890',
        website: 'example.com',
        company: {
            name: 'Example Inc',
            catchPhrase: 'Making examples since 2023',
            bs: 'innovative examples',
        },
    };

    it('renders user information correctly', () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(
            screen.getByText('Нажмите для подробностей')
        ).toBeInTheDocument();
    });

    it('links to the user detail page', () => {
        render(<UserCard user={mockUser} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/1');
    });
});

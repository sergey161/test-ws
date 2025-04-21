import { render, screen } from '@testing-library/react';
import { CommentList } from '@/components/comment-list';
import '@testing-library/jest-dom';

describe('CommentList', () => {
    const mockComments = [
        {
            id: 1,
            postId: 1,
            name: 'Comment Title 1',
            email: 'user1@example.com',
            body: 'This is the first comment body',
        },
        {
            id: 2,
            postId: 1,
            name: 'Comment Title 2',
            email: 'user2@example.com',
            body: 'This is the second comment body',
        },
        {
            id: 3,
            postId: 2,
            name: 'Comment Title 3',
            email: 'user3@example.com',
            body: 'This is the third comment body',
        },
    ];

    it('renders comments correctly', () => {
        render(<CommentList comments={mockComments} isLoading={false} />);

        // Проверяем, что все заголовки комментариев отображаются
        expect(screen.getByText('Comment Title 1')).toBeInTheDocument();
        expect(screen.getByText('Comment Title 2')).toBeInTheDocument();
        expect(screen.getByText('Comment Title 3')).toBeInTheDocument();

        // Проверяем, что все тексты комментариев отображаются
        expect(
            screen.getByText('This is the first comment body')
        ).toBeInTheDocument();
        expect(
            screen.getByText('This is the second comment body')
        ).toBeInTheDocument();
        expect(
            screen.getByText('This is the third comment body')
        ).toBeInTheDocument();

        // Проверяем, что все email отображаются
        expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.getByText('user2@example.com')).toBeInTheDocument();
        expect(screen.getByText('user3@example.com')).toBeInTheDocument();
    });

    it('renders loading spinner when isLoading is true', () => {
        render(<CommentList comments={mockComments} isLoading={true} />);

        // Проверяем, что компонент LoadingSpinner отображается
        // Так как LoadingSpinner - это компонент, мы проверяем его контейнер
        const spinnerContainer = document.querySelector(
            '[class*="spinner-container"]'
        );
        expect(spinnerContainer).toBeInTheDocument();

        // Проверяем, что комментарии не отображаются
        expect(screen.queryByText('Comment Title 1')).not.toBeInTheDocument();
    });

    it('renders empty state when there are no comments', () => {
        render(<CommentList comments={[]} isLoading={false} />);

        // Проверяем, что отображается сообщение о пустом списке
        expect(
            screen.getByText('У пользователя нет комментариев')
        ).toBeInTheDocument();
    });
});

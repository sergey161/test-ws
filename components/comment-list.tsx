'use client';

import styled from 'styled-components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Comment } from '@/types';
import { LoadingSpinner } from './loading-spinner';

const CommentGrid = styled.div`
    display: grid;
    gap: 1rem;
`;

const CommentCard = styled(Card)`
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }
`;

const CommentTitle = styled(CardTitle)`
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CommentBody = styled.p`
    color: var(--muted-foreground);
    line-height: 1.5;
`;

const CommentEmail = styled.div`
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-top: 0.5rem;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 2rem;
    color: var(--muted-foreground);
`;

interface CommentListProps {
    comments: Comment[];
    isLoading: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
    if (isLoading) {
        return <LoadingSpinner size="sm" />;
    }

    if (comments.length === 0) {
        return <EmptyState>У пользователя нет комментариев</EmptyState>;
    }

    return (
        <CommentGrid>
            {comments.map((comment) => (
                <CommentCard key={comment.id}>
                    <CardHeader className="pb-2">
                        <CommentTitle>{comment.name}</CommentTitle>
                    </CardHeader>
                    <CardContent>
                        <CommentBody>{comment.body}</CommentBody>
                        <CommentEmail>{comment.email}</CommentEmail>
                    </CardContent>
                </CommentCard>
            ))}
        </CommentGrid>
    );
}

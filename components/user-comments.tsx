import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { refreshComments } from '@/redux/features/commentSlice';
import type { AppDispatch } from '@/redux/store';
import { CommentList } from '@/components/comment-list';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';
import type { Comment } from '@/types';

const Section = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

interface UserCommentsProps {
    userId: number;
    comments: Comment[];
    status: string;
    error: string | null;
}

export function UserComments({
    userId,
    comments,
    status,
    error,
}: UserCommentsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = status === 'loading';
    const hasError = status === 'failed';

    const handleRefreshComments = () => {
        if (userId) {
            dispatch(refreshComments(userId));
        }
    };

    if (isLoading) {
        return <LoadingSpinner containerSize="small" size="md" />;
    }

    if (hasError) {
        return (
            <ErrorMessage
                message={error || 'Произошла ошибка при загрузке комментариев'}
            />
        );
    }

    return (
        <Section>
            <SectionTitle>
                Комментарии пользователя
                <Button
                    onClick={handleRefreshComments}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Обновить
                </Button>
            </SectionTitle>
            <CommentList comments={comments} isLoading={isLoading} />
        </Section>
    );
}

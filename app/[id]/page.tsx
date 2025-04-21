'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { fetchUserById } from '@/redux/features/userSlice';
import { fetchCommentsByUser } from '@/redux/features/commentSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import { UserDetails } from '@/components/user-details';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserComments } from '@/components/user-comments';

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-left: 1rem;
`;

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

export default function UserPage() {
    const { id } = useParams();
    const userId = typeof id === 'string' ? Number.parseInt(id) : 0;

    const dispatch = useDispatch<AppDispatch>();
    const {
        selectedUser,
        status: userStatus,
        error: userError,
    } = useSelector((state: RootState) => state.users);
    const {
        comments,
        status: commentsStatus,
        error: commentsError,
    } = useSelector((state: RootState) => state.comments);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
            dispatch(fetchCommentsByUser(userId));
        }
    }, [dispatch, userId]);

    const isLoading = userStatus === 'loading';
    const hasError = userStatus === 'failed';
    const errorMessage = userError;

    if (isLoading) {
        return <LoadingSpinner size="lg" />;
    }

    if (hasError) {
        return (
            <ErrorMessage
                message={errorMessage || 'Произошла ошибка при загрузке данных'}
            />
        );
    }

    if (!selectedUser) {
        return <ErrorMessage message="Пользователь не найден" />;
    }

    return (
        <Container>
            <Header>
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <Title>{selectedUser.name}</Title>
            </Header>

            <Section>
                <SectionTitle>Информация о пользователе</SectionTitle>
                <UserDetails user={selectedUser} />
            </Section>

            <UserComments
                userId={userId}
                comments={comments}
                status={commentsStatus}
                error={commentsError}
            />
        </Container>
    );
}

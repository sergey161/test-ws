'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchUsers } from '@/redux/features/userSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import type { User } from '@/types';
import { Pagination } from '@/components/pagination';
import { UserCard } from '@/components/user-card';
import { SortButton } from '@/components/sort-button';
import { ErrorMessage } from '@/components/error-message';
import { LoadingSpinner } from '@/components/loading-spinner';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const Header = styled.header`
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
`;

const UserGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const SortContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, status, error } = useSelector(
        (state: RootState) => state.users
    );
    const [sortedUsers, setSortedUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const usersPerPage = 6;

    useEffect(() => {
        if (status === 'idle' || users.length < 1) {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (users.length > 0) {
            const sorted = [...users].sort((a, b) => {
                if (sortDirection === 'asc') {
                    return a.name.localeCompare(b.name);
                }
                return b.name.localeCompare(a.name);
            });
            setSortedUsers(sorted);
        }
    }, [users, sortDirection]);

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    // получаем текущих пользователей для пагинации
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (status === 'loading') {
        return <LoadingSpinner size="lg" />;
    }

    if (status === 'failed') {
        return (
            <ErrorMessage
                message={error || 'Произошла ошибка при загрузке пользователей'}
            />
        );
    }

    return (
        <Container>
            <Header>
                <Title>Список пользователей</Title>
                <SortContainer>
                    <SortButton
                        direction={sortDirection}
                        onClick={toggleSortDirection}
                    />
                </SortContainer>
            </Header>

            <UserGrid>
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </UserGrid>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Container>
    );
}

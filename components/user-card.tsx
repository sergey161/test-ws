'use client';

import Link from 'next/link';
import styled from 'styled-components';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { User } from '@/types';
import { Mail, MapPin } from 'lucide-react';

const StyledCard = styled(Card)`
    transition:
        transform 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    svg {
        margin-right: 0.5rem;
        flex-shrink: 0;
    }
`;

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    return (
        <Link href={`/${user.id}`} passHref>
            <StyledCard className="h-full cursor-pointer">
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <InfoItem>
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                    </InfoItem>
                    <InfoItem>
                        <MapPin className="h-4 w-4" />
                        <span>{user.address.city}</span>
                    </InfoItem>
                </CardContent>
                <CardFooter>
                    <span className="text-sm text-muted-foreground">
                        Нажмите для подробностей
                    </span>
                </CardFooter>
            </StyledCard>
        </Link>
    );
}

'use client';

import styled from 'styled-components';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ErrorContainer = styled.div`
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const ActionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <ErrorContainer>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
            <ActionContainer>
                <Button onClick={handleRetry}>Попробовать снова</Button>
            </ActionContainer>
        </ErrorContainer>
    );
}

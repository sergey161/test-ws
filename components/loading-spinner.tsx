'use client';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ $containerSize?: 'small' | 'full' }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem;
    height: ${(props) => (props.$containerSize === 'small' ? '100%' : '100vh')};
`;

const getSpinnerSize = (size: 'sm' | 'md' | 'lg' | undefined) => {
    switch (size) {
        case 'sm':
            return '1.5rem';
        case 'lg':
            return '3rem';
        default:
            return '2rem';
    }
};

const getBorderWidth = (size: 'sm' | 'md' | 'lg' | undefined) => {
    return size === 'sm' ? '2px' : '3px';
};

const Spinner = styled.div<{ $size?: 'sm' | 'md' | 'lg' }>`
    width: ${(props) => getSpinnerSize(props.$size)};
    height: ${(props) => getSpinnerSize(props.$size)};
    border-radius: 50%;
    border: ${(props) => getBorderWidth(props.$size)} solid var(--muted);
    border-top-color: var(--primary);
    animation: ${spin} 0.8s linear infinite;
`;

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    containerSize?: 'small' | 'full';
}

export function LoadingSpinner({
    size = 'md',
    containerSize,
}: LoadingSpinnerProps) {
    return (
        <SpinnerContainer
            $containerSize={containerSize}
            className="spinner-container"
        >
            <Spinner $size={size} />
        </SpinnerContainer>
    );
}

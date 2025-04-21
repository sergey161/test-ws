'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

const SortButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

interface SortButtonProps {
    direction: 'asc' | 'desc';
    onClick: () => void;
}

export function SortButton({ direction, onClick }: SortButtonProps) {
    return (
        <SortButtonContainer>
            <span className="text-sm text-muted-foreground">Сортировка:</span>
            <Button variant="outline" size="sm" onClick={onClick}>
                {direction === 'asc' ? (
                    <>
                        <ArrowDownAZ className="h-4 w-4 mr-2" />
                        По имени (А-Я)
                    </>
                ) : (
                    <>
                        <ArrowUpAZ className="h-4 w-4 mr-2" />
                        По имени (Я-А)
                    </>
                )}
            </Button>
        </SortButtonContainer>
    );
}

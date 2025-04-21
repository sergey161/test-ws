'use client';

import styled from 'styled-components';
import { Card, CardContent } from '@/components/ui/card';
import type { User } from '@/types';
import { Mail, MapPin, Phone, Globe, Building, UserIcon } from 'lucide-react';

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    padding: 0.75rem;

    svg {
        margin-right: 0.75rem;
        flex-shrink: 0;
    }
`;

const DetailLabel = styled.span`
    font-weight: 500;
    margin-right: 0.5rem;
`;

const DetailValue = styled.span`
    word-break: break-word;
`;

const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.75rem;
`;

interface UserDetailsProps {
    user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
    return (
        <Card>
            <CardContent className="pt-6">
                <DetailGrid>
                    <DetailItem>
                        <UserIcon className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Имя:</DetailLabel>
                            <DetailValue>{user.name}</DetailValue>
                        </div>
                    </DetailItem>

                    <DetailItem>
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Email:</DetailLabel>
                            <DetailValue>{user.email}</DetailValue>
                        </div>
                    </DetailItem>

                    <DetailItem>
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Телефон:</DetailLabel>
                            <DetailValue>{user.phone}</DetailValue>
                        </div>
                    </DetailItem>

                    <DetailItem>
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Веб-сайт:</DetailLabel>
                            <DetailValue>
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {user.website}
                                </a>
                            </DetailValue>
                        </div>
                    </DetailItem>

                    <DetailItem>
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Компания:</DetailLabel>
                            <DetailValue>{user.company.name}</DetailValue>
                        </div>
                    </DetailItem>

                    <DetailItem className="col-span-full">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                            <DetailLabel>Адрес:</DetailLabel>
                            <AddressContainer>
                                <DetailValue>
                                    {user.address.street}, {user.address.suite}
                                </DetailValue>
                                <DetailValue>
                                    {user.address.city}, {user.address.zipcode}
                                </DetailValue>
                            </AddressContainer>
                        </div>
                    </DetailItem>
                </DetailGrid>
            </CardContent>
        </Card>
    );
}

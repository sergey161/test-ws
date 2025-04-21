import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
    fetchUsers,
    fetchUserById,
} from '@/redux/features/userSlice';
import { describe, expect, beforeEach, it, jest } from '@jest/globals';

// Мок для fetch
global.fetch = jest.fn();

describe('userSlice', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                users: userReducer,
            },
        });
        jest.clearAllMocks();
    });

    describe('fetchUsers', () => {
        it('should handle successful fetch', async () => {
            const mockUsers = [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Smith' },
            ];

            // Мокируем успешный ответ
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers,
            });

            await store.dispatch(fetchUsers());
            const state = store.getState().users;

            expect(state.status).toBe('succeeded');
            expect(state.users).toEqual(mockUsers);
            expect(state.error).toBeNull();
        });

        it('should handle failed fetch', async () => {
            // Мокируем неуспешный ответ
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
            });

            await store.dispatch(fetchUsers());
            const state = store.getState().users;

            expect(state.status).toBe('failed');
            expect(state.error).toBeTruthy();
        });
    });

    describe('fetchUserById', () => {
        it('should handle successful fetch', async () => {
            const mockUser = { id: 1, name: 'John Doe' };

            // Мокируем успешный ответ
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            await store.dispatch(fetchUserById(1));
            const state = store.getState().users;

            expect(state.status).toBe('succeeded');
            expect(state.selectedUser).toEqual(mockUser);
            expect(state.error).toBeNull();
        });

        it('should handle failed fetch', async () => {
            // Мокируем неуспешный ответ
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
            });

            await store.dispatch(fetchUserById(1));
            const state = store.getState().users;

            expect(state.status).toBe('failed');
            expect(state.error).toBeTruthy();
        });
    });
});

import { configureStore } from '@reduxjs/toolkit';
import commentReducer, {
    fetchCommentsByUser,
    refreshComments,
} from '@/redux/features/commentSlice';
import { describe, expect, beforeEach, it, jest } from '@jest/globals';

// Мок для fetch
global.fetch = jest.fn();

describe('commentSlice', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                comments: commentReducer,
            },
        });
        jest.clearAllMocks();
    });

    describe('fetchCommentsByUser', () => {
        it('should handle successful fetch with comments', async () => {
            const mockPosts = [
                { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
                { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
            ];

            const mockComments1 = [
                {
                    id: 1,
                    postId: 1,
                    name: 'Comment 1',
                    email: 'user1@example.com',
                    body: 'Comment body 1',
                },
                {
                    id: 2,
                    postId: 1,
                    name: 'Comment 2',
                    email: 'user2@example.com',
                    body: 'Comment body 2',
                },
            ];

            const mockComments2 = [
                {
                    id: 3,
                    postId: 2,
                    name: 'Comment 3',
                    email: 'user3@example.com',
                    body: 'Comment body 3',
                },
            ];

            // Мокируем успешный ответ для постов
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockPosts,
            });

            // Мокируем успешные ответы для комментариев к каждому посту
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockComments1,
            });
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockComments2,
            });

            await store.dispatch(fetchCommentsByUser(1));
            const state = store.getState().comments;

            expect(state.status).toBe('succeeded');
            expect(state.comments).toHaveLength(3); // Общее количество комментариев
            expect(state.comments).toEqual([
                ...mockComments1,
                ...mockComments2,
            ]);
            expect(state.error).toBeNull();
        });

        it('should handle successful fetch with no posts', async () => {
            // Мокируем успешный ответ, но без постов
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [],
            });

            await store.dispatch(fetchCommentsByUser(1));
            const state = store.getState().comments;

            expect(state.status).toBe('succeeded');
            expect(state.comments).toHaveLength(0);
            expect(state.error).toBeNull();
        });

        it('should handle failed fetch for posts', async () => {
            // Мокируем неуспешный ответ для постов
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
            });

            await store.dispatch(fetchCommentsByUser(1));
            const state = store.getState().comments;

            expect(state.status).toBe('failed');
            expect(state.error).toBeTruthy();
        });

        it('should handle failed fetch for comments', async () => {
            const mockPosts = [
                { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
            ];

            // Мокируем успешный ответ для постов
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockPosts,
            });

            // Мокируем неуспешный ответ для комментариев
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
            });

            await store.dispatch(fetchCommentsByUser(1));
            const state = store.getState().comments;

            expect(state.status).toBe('failed');
            expect(state.error).toBeTruthy();
        });
    });

    describe('refreshComments', () => {
        it('should set status to loading when refreshing comments', async () => {
            // Мокируем dispatch для unwrap
            const mockDispatch = jest.fn().mockResolvedValue([]);

            // Создаем мок для dispatch и getState
            const thunkAPI = {
                dispatch: mockDispatch,
                getState: jest.fn(),
                extra: undefined,
                requestId: '',
                signal: new AbortController().signal,
                rejectWithValue: jest.fn(),
                fulfillWithValue: jest.fn(),
            };

            // Вызываем thunk напрямую
            await refreshComments(1)(
                thunkAPI.dispatch,
                thunkAPI.getState,
                undefined
            );

            // Проверяем, что был вызван fetchCommentsByUser
            expect(mockDispatch).toHaveBeenCalled();

            // Проверяем состояние loading в store
            store.dispatch({ type: 'comments/refreshComments/pending' });
            const state = store.getState().comments;
            expect(state.status).toBe('loading');
        });
    });
});

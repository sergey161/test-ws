import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';
import type { Comment } from '@/types';

interface CommentState {
    comments: Comment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    status: 'idle',
    error: null,
};

export const fetchCommentsByUser = createAsyncThunk(
    'comments/fetchCommentsByUser',
    async (userId: number) => {
        try {
            // JSONPlaceholder не имеет прямого эндпоинта для комментариев по пользователю,
            // поэтому мы будем получать посты пользователя и затем комментарии к этим постам
            const postsResponse = await fetch(
                `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
            );
            if (!postsResponse.ok) {
                throw new Error('Не удалось загрузить посты пользователя');
            }

            const posts = await postsResponse.json();

            if (posts.length === 0) {
                return [];
            }

            // получаем комментарии для каждого поста
            const commentsPromises = posts.map(async (post: { id: number }) => {
                const commentsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
                );
                if (!commentsResponse.ok) {
                    throw new Error('Не удалось загрузить комментарии');
                }
                return commentsResponse.json();
            });

            const commentsArrays = await Promise.all(commentsPromises);

            // массив комментариев
            const allComments = commentsArrays.flat();

            return allComments as Comment[];
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Неизвестная ошибка'
            );
        }
    }
);

export const refreshComments = createAsyncThunk(
    'comments/refreshComments',
    async (userId: number, { dispatch }) => {
        // обновляем комментарии
        return dispatch(fetchCommentsByUser(userId)).unwrap();
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCommentsByUser.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.status = 'succeeded';
                    state.comments = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchCommentsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message || 'Не удалось загрузить комментарии';
            })
            .addCase(refreshComments.pending, (state) => {
                state.status = 'loading';
            });
    },
});

export default commentSlice.reducer;

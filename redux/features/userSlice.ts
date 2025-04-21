import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';
import type { User } from '@/types';

interface UserState {
    users: User[];
    selectedUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        if (!response.ok) {
            throw new Error('Не удалось загрузить пользователей');
        }
        const data = await response.json();
        return data as User[];
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'Неизвестная ошибка'
        );
    }
});

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId: number) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}`
            );
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные пользователя');
            }
            const data = await response.json();
            return data as User;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'Неизвестная ошибка'
            );
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // запрос всех пользователей
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.status = 'succeeded';
                    state.users = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ||
                    'Не удалось загрузить пользователей';
            })

            // запрос пользователя по ID
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchUserById.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.status = 'succeeded';
                    state.selectedUser = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ||
                    'Не удалось загрузить данные пользователя';
            });
    },
});

export default userSlice.reducer;

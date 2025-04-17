// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUser } from '../../typing/user';

const getLocalStorageUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') || '') || null;
    } catch {
        return null;
    }
};

const getAuthTokens = () => {
    try {
        return {
            access_token: localStorage.getItem('access_token'),
            refresh_token:localStorage.getItem('refresh_token'),
        };
    } catch (e){
        console.log(e)
        return { access_token: null, refresh_token: null };
    }
};

const { access_token, refresh_token } = getAuthTokens();

interface initialStateProps {
    user: ResponseUser | null;
    access_token: string | null;
    refresh_token: string | null;
    refresh_token_life_time:string | null;
    access_token_life_time: string | null;

}

const initialState: initialStateProps = {
    user: getLocalStorageUser(),
    access_token,
    refresh_token,
    refresh_token_life_time:null,
    access_token_life_time:null,

};

// 🔁 Shared logic for logout/reset
const clearUserSession = (state: initialStateProps) => {
    state.user = null;
    state.access_token = null;
    state.refresh_token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ResponseUser>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        removeUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setTokens: (
            state,
            action: PayloadAction<{ access_token: string; refresh_token: string }>
        ) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            localStorage.setItem('access_token', state.access_token || '');
            localStorage.setItem('refresh_token', state.refresh_token || '');
        },
        removeTokens: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        logout: (state) => {
            clearUserSession(state); // 🎯 Reuse the shared logic here
        },
    },
});

export const { setUser, removeUser, setTokens, removeTokens, logout } = userSlice.actions;
export default userSlice.reducer;

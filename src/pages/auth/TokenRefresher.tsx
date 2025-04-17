import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setTokens } from '../../store/user/userSlice';
import { useAppSelector } from '../../store/hooks';
import { jwtDecode } from 'jwt-decode';

type Props = {
    children: React.ReactNode;
};

const TokenRefresher = ({ children }: Props) => {
    const dispatch = useDispatch();
    const {
        access_token,
        refresh_token,
        access_token_life_time,
        refresh_token_life_time,
    } = useAppSelector((state) => state.user);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const refreshToken = async () => {
        if (!refresh_token) return;
        try {
            const response = await axios.post('/api/token/refresh/', {
                refresh: refresh_token,
            });
            dispatch(setTokens({
                access_token: response.data.access,
                refresh_token: refresh_token,
            }));
        } catch (error) {
            console.error("Token refresh failed", error);
        }
    };

    useEffect(() => {
        if (!access_token || !refresh_token || !access_token_life_time) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const refreshBefore = 30 * 60; // 30 minutes in seconds
        const refreshInMs = (access_token_life_time - refreshBefore) * 1000;

        if (refreshInMs > 0) {
            intervalRef.current = setInterval(() => {
                refreshToken();
            }, refreshInMs);
        } else {
            // If token is already near expiry or past, refresh immediately
            refreshToken();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [access_token, refresh_token, access_token_life_time]);

    return <>{children}</>;
};

export default TokenRefresher;

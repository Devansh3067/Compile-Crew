import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true, 
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    // Ensure backend URL is correctly set
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://compile-crew.onrender.com';
    console.log('Connecting to backend URL:', backendURL);

    return io(backendURL, options);
};

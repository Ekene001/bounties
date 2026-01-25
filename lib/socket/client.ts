import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  withCredentials: true, // Useful if the server uses cookies for auth
  transports: ['websocket'], // Prefer WebSockets for better performance
});

// Logging and Event Handlers
socket.on('connect', () => {
  console.log('[Socket] Connected to server:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('[Socket] Disconnected:', reason);
  if (reason === 'io server disconnect') {
    // The disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
});

socket.on('connect_error', (error) => {
  console.error('[Socket] Connection error:', error);
});

socket.on('reconnect', (attemptNumber) => {
  console.log('[Socket] Reconnected after', attemptNumber, 'attempts');
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('[Socket] Reconnection attempt:', attemptNumber);
});

socket.on('reconnect_error', (error) => {
  console.error('[Socket] Reconnection error:', error);
});

socket.on('reconnect_failed', () => {
  console.error('[Socket] Reconnection failed');
});

// Heartbeat Mechanism (Built-in to Socket.IO, but adding custom log for visibility if needed)
socket.on('ping', () => {
  console.debug('[Socket] Ping sent');
});

socket.on('pong', (latency) => {
  console.debug('[Socket] Pong received, latency:', latency, 'ms');
});

export default socket;

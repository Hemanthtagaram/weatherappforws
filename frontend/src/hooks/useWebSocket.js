import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useWebSocket = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const socketFactory = () => new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: socketFactory,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket successfully.');
                client.subscribe('/topic/weather', (message) => {
                    if (message.body) {
                        try {
                            const data = JSON.parse(message.body);
                            setAlerts(prev => [data, ...prev].slice(0, 5)); // Keep last 5 alerts
                        } catch (e) {
                            console.error('WebSocket Parse Error:', e);
                        }
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
            }
        });

        client.activate();

        return () => {
            if (client.active) {
                client.deactivate();
            }
        };
    }, []);

    return { alerts };
};

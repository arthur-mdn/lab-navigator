import { FiMapPin, FiBell, FiSmartphone, FiCpu, FiMoon, FiWifi, FiEye, FiZap } from 'react-icons/fi';

const testDefinitions = [
    {
        id: 'vibration',
        label: 'Vibration',
        icon: FiZap,
        autoDetect: false,
        run: (onSuccess, onError) => {
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200]);
                onSuccess();
            } else {
                onError('Non supporté');
            }
        },
    },
    {
        id: 'geolocation',
        label: 'Géolocalisation',
        icon: FiMapPin,
        autoDetect: false,
        run: (onSuccess, onError) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        onSuccess(`Position : ${latitude}, ${longitude}`);
                    },
                    (err) => {
                        onError(err.message);
                    }
                );
            } else {
                onError('Non supporté');
            }
        },
    },
    {
        id: 'notification',
        label: 'Notification',
        icon: FiBell,
        autoDetect: false,
        run: (onSuccess, onError) => {
            if (!('Notification' in window)) {
                onError('Non supporté');
            } else {
                Notification.requestPermission().then((perm) => {
                    if (perm === 'granted') {
                        new Notification('Hello !');
                        onSuccess();
                    } else {
                        onError(`Permission refusée : ${perm}`);
                    }
                });
            }
        },
    },
    {
        id: 'resize',
        label: 'Redimensionnement',
        icon: FiSmartphone,
        autoDetect: true,
    },
    {
        id: 'darkmode',
        label: 'Mode sombre détecté',
        icon: FiMoon,
        autoDetect: true,
    },
    {
        id: 'online',
        label: 'Connexion détectée',
        icon: FiWifi,
        autoDetect: true,
    },
    {
        id: 'visibility',
        label: 'Page visible',
        icon: FiEye,
        autoDetect: true,
    }
];

export default testDefinitions;
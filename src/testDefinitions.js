import {FiMapPin, FiBell, FiSmartphone, FiCpu, FiClipboard, FiMoon, FiWifi, FiEye, FiZap, FiMaximize, FiShare2, FiMic, FiCamera, FiVolume2, FiLock} from 'react-icons/fi';

let wakeLockRef = null;

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
        id: 'clipboard-read',
        label: 'Lecture du presse-papiers',
        icon: FiClipboard,
        autoDetect: false,
        run: async (onSuccess, onError) => {
            try {
                const text = await navigator.clipboard.readText();
                onSuccess(`Texte lu dans le clipboard : ${text}`);
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'clipboard-write',
        label: 'Écriture dans le presse-papiers',
        icon: FiClipboard,
        autoDetect: false,
        run: async (onSuccess, onError) => {
            try {
                await navigator.clipboard.writeText('Texte copié depuis le laboratoire !');
                onSuccess('Texte copié avec succès');
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'fullscreen',
        label: 'Basculer en plein écran',
        icon: FiMaximize,
        autoDetect: false,
        run: (onSuccess, onError) => {
            try {
                document.documentElement.requestFullscreen();
                onSuccess();
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'share',
        label: 'Partage natif',
        icon: FiShare2,
        autoDetect: false,
        run: (onSuccess, onError) => {
            if (navigator.share) {
                navigator.share({ title: 'Partage test', text: 'Test de partage via Laboratoire' });
                onSuccess();
            } else {
                onError('Non supporté');
            }
        },
    },
    {
        id: 'mic',
        label: 'Micro',
        icon: FiMic,
        autoDetect: false,
        run: async (onSuccess, onError, setStream) => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (setStream) setStream(stream);
                onSuccess('Micro activé');
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'camera',
        label: 'Caméra',
        icon: FiCamera,
        autoDetect: false,
        run: async (onSuccess, onError, setStream) => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (setStream) setStream(stream);
                onSuccess('Caméra activée');
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'speech-synth',
        label: 'Synthèse vocale',
        icon: FiVolume2,
        autoDetect: false,
        run: (onSuccess, onError) => {
            try {
                const utterance = new SpeechSynthesisUtterance('Bonjour, ceci est un test de synthèse vocale.');
                speechSynthesis.speak(utterance);
                onSuccess('Voix parlée');
            } catch (err) {
                onError(err.message);
            }
        },
    },
    {
        id: 'wake-lock',
        label: 'Wake Lock (écran allumé)',
        icon: FiLock,
        autoDetect: false,
        run: async (onSuccess, onError, setStream, toggleState) => {
            try {
                if (wakeLockRef) {
                    await wakeLockRef.release();
                    wakeLockRef = null;
                    toggleState('wake-lock', false);
                    onSuccess('Wake lock désactivé');
                } else {
                    wakeLockRef = await navigator.wakeLock.request('screen');
                    toggleState('wake-lock', true);
                    onSuccess('Wake lock activé');
                }
            } catch (err) {
                onError(err.message);
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
        label: "Page visible (changez d'onglet pour déclencher)",
        icon: FiEye,
        autoDetect: true,
    }
];

export default testDefinitions;
import { useEffect } from 'react';

export default function useAutoDetection(log, markTest) {
    useEffect(() => {
        const handleResize = () => {
            log(`Fenêtre redimensionnée : ${window.innerWidth}x${window.innerHeight}`, 'event');
            markTest('resize', true);
        };

        const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
        const handleDark = (e) => {
            log(`Mode sombre détecté : ${e.matches ? 'activé' : 'désactivé'}`, 'event');
            markTest('darkmode', true);
        };

        const handleOnline = () => {
            log('Connexion détectée', 'event');
            markTest('online', true);
        };
        const handleOffline = () => {
            log('Connexion perdue', 'event');
            markTest('online', true);
        };

        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                log('Page rendue visible', 'event');
                markTest('visibility', true);
            }
        };

        window.addEventListener('resize', handleResize);
        darkMode.addEventListener('change', handleDark);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        document.addEventListener('visibilitychange', handleVisibility);

        if (darkMode.matches) {
            log('Mode sombre initial détecté', 'event');
            markTest('darkmode', true);
        }

        if (navigator.onLine) {
            log('Connexion initialement active', 'event');
            markTest('online', true);
        }

        if (!navigator.onLine) {
            log('Connexion initialement inactive', 'event');
            markTest('online', true);
        }

        if (document.visibilityState === 'visible') {
            log('Page visible au démarrage', 'event');
            markTest('visibility', true);
        }

        log('App démarrée', 'info');

        return () => {
            window.removeEventListener('resize', handleResize);
            darkMode.removeEventListener('change', handleDark);
            window.removeEventListener('online', handleOnline);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);
}
// Remplace l'ancien service worker de l'application à cette adresse :
// supprime la copie hors connexion, se désinstalle et recharge la page de fermeture.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('frigofiche-v')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
self.addEventListener('fetch', () => {}); // tout passe par le réseau

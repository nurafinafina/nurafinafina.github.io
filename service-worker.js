importScripts ('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);

workbox.precaching.precacheAndRoute([
      { url: "/", revision: "1"},
      { url: "/css/maskable_icon192x192.png", revision: "1"},
      { url: "/css/maskable_icon256x256.png", revision: "1"},
      { url: "/css/maskable_icon512x512.png", revision: "1"},
      { url: "/manifest.json", revision: "1"},
      { url: "/nav.html", revision: "1"},
      { url: "/index.html", revision: "1"},
      { url: "/detailTeam.html", revision: "1"},
      { url: "/detailMatches.html", revision: "1"},
      { url: "/pages/home.html", revision: "1"},
      { url: "/pages/matches.html", revision: "1"},
      { url: "/pages/standings.html", revision: "1"},
      { url: "/pages/bookfavteam.html", revision: "1"},
      { url: "/pages/team.html", revision: "1"},
      { url: "/detailclub.js", revision: "1"},
      { url: "/detailmatch.js", revision: "1"},
      { url: "/css/fontawesome/all.min.css", revision: "1"},
      { url: "/css/fontawesome/fontawesome.min.css", revision: "1"},
      { url: "/css/materialize.min.css", revision: "1"},
      { url: "/css/materialize.css", revision: "1"},
      { url: "/css/webfonts/fa-brands-400.eot", revision: "1"},
      { url: "/css/webfonts/fa-brands-400.svg", revision: "1"},
      { url: "/css/webfonts/fa-brands-400.ttf", revision: "1"},
      { url: "/css/webfonts/fa-brands-400.woff", revision: "1"},
      { url: "/css/webfonts/fa-brands-400.woff2", revision: "1"},
      { url: "/css/webfonts/fa-regular-400.eot", revision: "1"},
      { url: "/css/webfonts/fa-regular-400.svg", revision: "1"},
      { url: "/css/webfonts/fa-regular-400.ttf", revision: "1"},
      { url: "/css/webfonts/fa-regular-400.woff", revision: "1"},
      { url: "/css/webfonts/fa-regular-400.woff2", revision: "1"},
      { url: "/css/webfonts/fa-solid-900.eot", revision: "1"},
      { url: "/css/webfonts/fa-solid-900.svg", revision: "1"},
      { url: "/css/webfonts/fa-solid-900.ttf", revision: "1"},
      { url: "/css/webfonts/fa-solid-900.woff", revision: "1"},
      { url: "/css/webfonts/fa-solid-900.woff2", revision: "1"},
      { url: "/css/style.css", revision: "1"},
      { url: "/vendor/materialize.min.js", revision: "1"},
      { url: "/vendor/materialize.js", revision: "1"},
      { url: "/vendor/idb.js", revision: "1"},
      { url: "/main.js", revision: "1"},
      { url: "/push.js", revision: "1"},
      { url: "/js/api.js", revision: "1"},
      { url: "/js/db.js", revision: "1"},
      { url: "/js/helper.js", revision: "1"},
      { url: "/js/nav.js", revision: "1"},
      { url: "/js/page.js", revision: "1"},
      { url: "/js/registersw.js", revision: "1"},
      { url: "/js/view.js", revision: "1"},
      { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
      { url: "https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1"},
      { url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1"},
      { url: "https://fonts.googleapis.com/css?family=Muli:400,400i|Roboto+Condensed:400,600,700", revision: "1"},
      { url: "https://code.jquery.com/jquery-2.1.1.min.js", revision: "1"},

    ],{
    ignoreUrlParametersMatching: [/.*/]
    }
    );
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
          cacheName: "images",
          plugins: [
              new workbox.expiration.Plugin({
                  maxEntries: 50,
                  maxAgeSeconds: 7 * 24 * 60 * 60,
              }),
          ],
      })
  );
    workbox.routing.registerRoute(
      ({url}) => url.origin,
      workbox.strategies.staleWhileRevalidate()
    );
    workbox.routing.registerRoute(
          ({url}) => url.origin === 'https://api.football-data.org/v2/',
          workbox.strategies.staleWhileRevalidate()
        );
}
else{
  console.log(`Workbox gagal dimuat`);
}
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/css/maskable_icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
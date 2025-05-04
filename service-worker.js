// service-worker.js

const CACHE_NAME = "gestor-tareas-cache-v1";
const URLS_TO_CACHE = [

  "index.html",
  "css/styles.css", //CSS
  "js/script.js",
  "img/icono.png",
  "img/192-icono.png", // icono 192×192
  "img/512-icono.png", // icono 512×512
  "img/organizacion.jpg",
  "json/manifest.json", // manifest
  "screenshots/screen1.png",
  "screenshots/screen2.png",
];

// 1) Instalación: guardo en caché los recursos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// 2) Activación: limpio cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// 3) Fetch: respondo desde caché o red
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("service-worker.js")) {
    return;
  }

  // Si no es service-worker.js, busco en caché o hace la solicitud a la red
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});

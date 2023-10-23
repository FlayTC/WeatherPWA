const cacheName = "my-cache-v1"; // Cambia el nombre de la versión cuando actualices recursos

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "index.html",
        "style.css",
        "app.js",
        "images/search.png",
        "images/cloud.png",
        "images/sun.png",
        "images/rain.png",
        "images/rain-cloud.png",
        "images/partly-cloudy.png",
        "images/dew.png",
        "images/wind.png",
        "images/thermometer.png",
        "images/sunrise.png",
        "images/sunset.png",
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap"
      ]);
    }).catch(function(error) {
      console.error("Cache installation failed:", error);
    })
  );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(existingCacheName) {
            if (existingCacheName !== cacheName) {
              return caches.delete(existingCacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(fetchResponse) {
        // Verifica si la respuesta es válida antes de almacenarla en la caché
        if (fetchResponse && fetchResponse.status === 200) {
          // Abre la caché y almacena el recurso si es válido
          return caches.open(cacheName).then(function(cache) { // Agregar un return aquí
            cache.put(event.request, fetchResponse.clone()); // Clonar la respuesta
          }).then(function() {
            return fetchResponse; // Devolver la respuesta original
          });
        }
        return fetchResponse;
      }).catch(function(error) {
        console.error("Network request failed:", error);

        // Intenta mostrar una página de respaldo en caso de error de red
        return caches.match("/offline.html").then(function(offlineResponse) {
          return offlineResponse;
        });
      });
    }).catch(function(cacheError) {
      console.error("Cache retrieval failed:", cacheError);

      // Si no se puede recuperar nada de la caché, muestra una página de respaldo
      return caches.match("/offline.html").then(function(offlineResponse) {
        return offlineResponse;
      });
    })
  );
});
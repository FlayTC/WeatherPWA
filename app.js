let bip = null;

// Registramos el SW
let registracionSW;
navigator.serviceWorker.register("/sw.js").then(registracion => {
    registracionSW = registracion;
});

// Pedimos storage persistente
navigator.storage.persist(); 


window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); // Oculta el banner en los casos donde aparece
    bip = event;
    console.log("beforeinstallprompt se disparó correctamente");
});

// document.querySelector("#instalacion button").addEventListener("click", async (event) => {
//     if (bip) {
//         bip.prompt();
//         const { outcome } = await bip.userChoice;
//         // La variable bip solo se debe usar una vez.
//         bip = null;
//         // Actúa según la elección del usuario
//         if (outcome === 'accepted') {
//             console.log('El usuario aceptó el prompt de instalación.');
//         } else if (outcome === 'dismissed') {
//             console.log('El usuario rechazó el prompt de instalación');
//         }
//     } else {
//         alert("Se isntalo correctamente"); // Aquí se muestra el mensaje
//     }
// });

const showDataButton = document.getElementById('showDataButton');
const sunsData = document.getElementById('sunsData');

showDataButton.addEventListener('click', function() {
    if (sunsData.style.display === 'none' || sunsData.style.display === '') {
        sunsData.style.display = 'flex';
        showDataButton.textContent = 'Ocultar Datos';
    } else {
        sunsData.style.display = 'none';
        showDataButton.textContent = 'Mostrar Datos';
    }
});

// Verifica si la aplicación se está ejecutando en modo independiente
if (window.matchMedia('(display-mode: standalone)').matches) {
    // Ajusta el tamaño de la ventana a 800x600 píxeles
    window.resizeTo(900, 800);
}

// Esta variable almacenará el evento para su uso posterior.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que aparezca el diálogo de instalación predeterminado del navegador.
  e.preventDefault();
  // Guarda el evento porque lo necesitarás para desencadenarlo más tarde.
  deferredPrompt = e;
  // Muestra tu propio diálogo de instalación personalizado.
  showCustomInstallDialog();
});

// Función para mostrar el diálogo de instalación personalizado
function showCustomInstallDialog() {
  // Aquí puedes diseñar y mostrar tu propio diálogo de instalación personalizado.
  const installDialog = document.getElementById('custom-install-dialog');
  installDialog.style.display = 'block';

  // Agrega botones, texto y elementos de diseño personalizados a tu diálogo.
  // Puedes escuchar eventos en tus botones para manejar la instalación.
}

// Manejar la instalación cuando el usuario hace clic en un botón en el diálogo personalizado
document.getElementById('install-button').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó la instalación');
      }
      // Limpia la variable deferredPrompt
      deferredPrompt = null;
      // Cierra el diálogo personalizado
      document.getElementById('custom-install-dialog').style.display = 'none';
    });
  }
});

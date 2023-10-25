let bip = null;

// Registramos el SW
let registracionSW;
navigator.serviceWorker.register("/sw.js").then(registracion => {
    registracionSW = registracion;
});

window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); // Oculta el banner en los casos donde aparece
    bip = event;
    console.log("beforeinstallprompt se disparó correctamente");
});

document.querySelector("#instalacion button").addEventListener("click", async (event) => {
    if (bip) {
        bip.prompt();
        const { outcome } = await bip.userChoice;
        // La variable bip solo se debe usar una vez.
        bip = null;
        // Actúa según la elección del usuario
        if (outcome === 'accepted') {
            console.log('El usuario aceptó el prompt de instalación.');
        } else if (outcome === 'dismissed') {
            console.log('El usuario rechazó el prompt de instalación');
        }
    } else {
        alert("Se instalo correctamente"); // Aquí se muestra el mensaje
    }
});

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

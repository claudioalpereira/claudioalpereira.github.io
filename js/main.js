////////////////////////////////////////////////////////////////////
// New Version Available Msg
////////////////////////////////////////////////////////////////////
function showNewVersionMsg(registration) {
    registration.addEventListener('updatefound', () => {                                        
        if (navigator.serviceWorker.controller) {
            let newSWorker = registration.waiting || registration.installing;

            document.getElementById('notification').style = 'block';
            document.getElementById('reload').addEventListener('click', function(){
                newSWorker.postMessage({ action: 'skipWaiting' });
            });
        }
    });
 }

let refreshing;
   // The event listener that is fired when the service worker updates
   // Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

////////////////////////////////////////////////////////////////////
// Notification
////////////////////////////////////////////////////////////////////
async function showNotification() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Ola!', {
			body: 'Sou eu.',
			icon: 'img/hello-icon-128.png'
		});
		noti.onclick = () => alert('clicked');
	} else { alert("notification not permitted"); }
}


////////////////////////////////////////////////////////////////////
// Add to Home Screen
////////////////////////////////////////////////////////////////////
let deferredPrompt;
let btnAdd = document.getElementById('btnA2HS');

window.addEventListener('beforeinstallprompt', e => {
	e.preventDefault();
	deferredPrompt = e;
	btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
	deferredPrompt.prompt();
	deferredPrompt.userChoise.then((choiceResult) =>{
		if(choiseResult.outcome === 'accepted') {
			console.log('user accepted the A2HS prompt');
		} else {
            console.log("user didn't accepted the A2HS prompt");
        }
		deferredPrompt = null;
	});
});

window.addEventListener('appinstalled', (e) => {
	console.log('A2HS installed');
});

///////////////////////////////////////////////////////////////////
// Service Worker registration
///////////////////////////////////////////////////////////////////
window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then(showNewVersionMsg);    
    } 
    else { console.log('Service worker not supported. PWA not possible.'); }
}

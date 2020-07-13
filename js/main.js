window.onload = () => {
  'use strict';

  let newSWorker;

  // The click event on the notification
  document.getElementById('reload').addEventListener('click', function(){
    newSWorker.postMessage({ action: 'skipWaiting' });
  });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
			 .then(registration => {
                console.log('Service Worker registered! Scope is: ', registration.scope);

                registration.addEventListener('updatefound', () => {
                    console.log(registration);
                    
                    newSWorker = registration.waiting || registration.installing;
                    
                    if (navigator.serviceWorker.controller) {
                        let notification = document.getElementById('notification');
                        notification.style = 'block';
                    }
                });
			 });
  } else {
	  console.log('Service worker not supported. PWA not possible.');
  }
}


let refreshing;
   // The event listener that is fired when the service worker updates
   // Here we reload the page
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });


async function showNotification() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Ola!', {
			body: 'Sou eu.',
//			icon: 'mario.png'
		});
		noti.onclick = () => alert('clicked');
	} else { alert("notification not permitted"); }
}



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
		}
		deferredPrompt = null;
	});
});


window.addEventListener('appinstalled', (e) => {
	console.log('a2hs installed');
});
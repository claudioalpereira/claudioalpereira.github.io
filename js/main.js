window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
			 .then(registration => {
				 console.log('Service Worker registered! Scope is: ', registration.scope);
			 });
  } else {
	  console.log('Service worker not supported. PWA not possible.');
  }
}

async function showNotification() {
	const result = await Notification.requestPermission();
	if (result === 'granted') {
		const noti = new Notification('Hello!', {
			body: 'It’s me.',
//			icon: 'mario.png'
		});
		noti.onclick = () => alert('clicked');
	}
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
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
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

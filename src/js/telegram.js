document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.toString()) {
    sessionStorage.setItem('utm_params', '?' + urlParams.toString());
  }

  function base64urlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  const telegramButton = document.querySelector('.telegram-bot');

  if (telegramButton) {
    telegramButton.addEventListener('click', function (e) {
      e.preventDefault();

      const utmString = sessionStorage.getItem('utm_params') || '';

      if (!utmString) {
        window.open('https://t.me/Event_Shelest_bot', '_blank');
        return;
      }

      const encoded = base64urlEncode(utmString);

      const shortEncoded = encoded.slice(0, 64);

      const deepLink = `https://t.me/Event_Shelest_bot?start=${shortEncoded}`;

      window.open(deepLink, '_blank');
    });
  }
});

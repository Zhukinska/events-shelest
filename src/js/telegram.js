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

      let encoded = base64urlEncode(utmString);

      if (encoded.length > 64) {
        const params = new URLSearchParams(utmString.replace(/^\?/, ''));
        const limitedParams = new URLSearchParams();
        if (params.has('utm_source'))
          limitedParams.set('utm_source', params.get('utm_source'));
        if (params.has('utm_medium'))
          limitedParams.set('utm_medium', params.get('utm_medium'));
        utmString = '?' + limitedParams.toString();
        encoded = base64urlEncode(utmString);
      }

      const deepLink = `https://t.me/Event_Shelest_bot?start=${encoded}`;

      window.open(deepLink, '_blank');
    });
  }
});

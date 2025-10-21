document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Зберігаємо utm параметри в sessionStorage
  if (urlParams.toString()) {
    sessionStorage.setItem('utm_params', '?' + urlParams.toString());
  }

  // Функція кодування для Telegram
  function base64urlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  const telegramButton = document.querySelector('.telegram-bot');

  if (telegramButton) {
    telegramButton.addEventListener('click', function (e) {
      e.preventDefault();

      let utmString = sessionStorage.getItem('utm_params') || '';

      // Якщо немає utm — відкриваємо просто бота
      if (!utmString) {
        window.open('https://t.me/Event_Shelest_bot', '_blank');
        return;
      }

      let encoded = base64urlEncode(utmString);

      // Якщо рядок довший за 64 символи — залишаємо тільки utm_source і utm_medium
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
      console.log('Deep link:', deepLink);

      // Відкриваємо Telegram у новій вкладці
      window.open(deepLink, '_blank');
    });
  }
});

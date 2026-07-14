// document.addEventListener('DOMContentLoaded', function () {
//   const urlParams = new URLSearchParams(window.location.search);

//   if (urlParams.toString()) {
//     sessionStorage.setItem('utm_params', '?' + urlParams.toString());
//   }

//   function base64urlEncode(str) {
//     return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
//   }

//   const telegramButton = document.querySelector('.telegram-bot');

//   if (telegramButton) {
//     telegramButton.addEventListener('click', function (e) {
//       e.preventDefault();

//       let utmString = sessionStorage.getItem('utm_params') || '';

//       if (!utmString) {
//         window.open('https://telegram.me/Event_Shelest_bot', '_blank');
//         return;
//       }

//       let encoded = base64urlEncode(utmString);

//       if (encoded.length > 64) {
//         const params = new URLSearchParams(utmString.replace(/^\?/, ''));
//         const limitedParams = new URLSearchParams();

//         if (params.has('utm_source'))
//           limitedParams.set('utm_source', params.get('utm_source'));
//         if (params.has('utm_medium'))
//           limitedParams.set('utm_medium', params.get('utm_medium'));

//         utmString = '?' + limitedParams.toString();
//         encoded = base64urlEncode(utmString);
//       }

//       const deepLink = `https://telegram.me/Event_Shelest_bot?start=${encoded}`;
//       console.log('Deep link:', deepLink);

//       window.open(deepLink, '_blank');
//     });
//   }
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const urlParams = new URLSearchParams(window.location.search);

//   function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `${name}=${encodeURIComponent(
//       value
//     )}; expires=${date.toUTCString()}; path=/`;
//   }

//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2)
//       return decodeURIComponent(parts.pop().split(';').shift());
//   }

//   if (urlParams.toString()) {
//     const utmString = '?' + urlParams.toString();
//     const oldUtm = getCookie('utm_params');

//     if (utmString !== oldUtm) {
//       sessionStorage.setItem('utm_params', utmString);
//       setCookie('utm_params', utmString, 7);
//     }
//   }

//   function base64urlEncode(str) {
//     return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
//   }

//   function openTelegramWithUtm(e) {
//     e.preventDefault();

//     let utmString =
//       sessionStorage.getItem('utm_params') || getCookie('utm_params') || '';

//     if (!utmString) {
//       window.open('https://telegram.me/Event_Shelest_bot', '_blank');
//       return;
//     }

//     let encoded = base64urlEncode(utmString);

//     if (encoded.length > 64) {
//       const params = new URLSearchParams(utmString.replace(/^\?/, ''));
//       const limitedParams = new URLSearchParams();

//       if (params.has('utm_source'))
//         limitedParams.set('utm_source', params.get('utm_source'));
//       if (params.has('utm_medium'))
//         limitedParams.set('utm_medium', params.get('utm_medium'));

//       utmString = '?' + limitedParams.toString();
//       encoded = base64urlEncode(utmString);
//     }

//     const deepLink = `https://telegram.me/Event_Shelest_bot?start=${encoded}`;

//     window.open(deepLink, '_blank');
//   }

//   const telegramButtons = document.querySelectorAll(
//     'a[href*="telegram.me/Event_Shelest_bot"]'
//   );

//   telegramButtons.forEach(btn => {
//     btn.addEventListener('click', openTelegramWithUtm);
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${date.toUTCString()}; path=/`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return decodeURIComponent(parts.pop().split(';').shift());
  }

  if (urlParams.toString()) {
    const utmString = '?' + urlParams.toString();
    const oldUtm = getCookie('utm_params');

    if (utmString !== oldUtm) {
      setCookie('utm_params', utmString, 7);
    }
  }

  function base64urlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function openTelegramWithUtm(e) {
    e.preventDefault();

    let utmString = getCookie('utm_params') || '';

    if (!utmString) {
      window.open('https://telegram.me/Event_Shelest_bot', '_blank');
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

    const deepLink = `https://telegram.me/Event_Shelest_bot?start=${encoded}`;
    window.open(deepLink, '_blank');
  }

  const telegramButtons = document.querySelectorAll(
    'a[href*="telegram.me/Event_Shelest_bot"]'
  );

  telegramButtons.forEach(btn => {
    btn.addEventListener('click', openTelegramWithUtm);
  });
});

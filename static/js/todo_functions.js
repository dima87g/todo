'use strict';

export function showInfoWindow(message) {

    let infoWindow = document.getElementById("info_window");
    let infoWindowMessage = document.getElementById("info_window_message");

    removeChildren(infoWindowMessage);

    infoWindowMessage.appendChild(document.createTextNode(message));
    infoWindow.style.visibility = 'visible';

    setTimeout(function() {
        infoWindow.style.visibility = 'hidden';
    }, 3000)
}

export function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export function showCookiesAlertWindow() {
    let userLanguage = getCookie('lang');
    let cookiesAlertWindow = document.getElementById('cookies_alert_window');
    let cookiesAlertWindowText = document.getElementById('cookies_alert_window_text');
    let cookiesAlertWindowConfirmButton = document.getElementById('cookies_alert_confirm_button');

    if (userLanguage === 'en') {
        cookiesAlertWindowText.appendChild(document.createTextNode(
            'By continuing to use our site, you consent to the processing of' +
            ' cookies, which ensure the correct operation of the site.'));
    } else if (userLanguage === 'ru') {
        cookiesAlertWindowText.appendChild(document.createTextNode(
            'Продолжая использовать наш сайт, вы даете согласие на обработку' +
            '  файлов cookie, которые обеспечивают правильную работу сайта.'));
    }

    cookiesAlertWindowConfirmButton.onclick = function() {
        cookiesAlertWindow.style.opacity = '0';

        setTimeout(function() {
            cookiesAlertWindow.style.display = 'none';
        }, 500);
    }
    cookiesAlertWindow.style.display = 'block';
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function swap(arr, currentTaskIndex, taskToSwapIndex) {
    let buff = arr[currentTaskIndex];
    arr[currentTaskIndex] = arr[taskToSwapIndex];
    arr[taskToSwapIndex] = buff;
    return arr;
}

export function isInternetExplorer() {
    return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}


/**
 *
 * @param arr
 * @param object
 * @returns {number}
 */
export function findPosition(arr, object) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === object) {
            return i;
        }
    }
    return -1;
}


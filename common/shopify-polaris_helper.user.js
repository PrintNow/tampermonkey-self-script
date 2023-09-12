// ==UserScript==
// @name         Shopify Polaris 组件网站一键开启 Dark
// @namespace    https://nowtime.cc/
// @version      0.1
// @author       Shine
// @description  使用了 Shopify Polaris 组件网站一键开启 Dark
// @match        https://shopify-app.xxxxxxxxx.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=polaris.shopify.com
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    let isSet = false
    document.addEventListener('dblclick', handle);

    function setDarkMode(){
        let $ele = document.querySelectorAll(`body[p-color-scheme],div[p-color-scheme]`);
        $ele?.forEach($ele => $ele?.setAttribute("p-color-scheme", "dark"))
    }

    function handle() {
        if (isSet){
            console.log(`已经设置过了`)
            return
        }

        setDarkMode()
        isSet = true

        document.removeEventListener('dblclick', handle)
        console.log(`设置完成`)
    }
})();

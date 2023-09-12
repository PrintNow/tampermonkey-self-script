// ==UserScript==
// @name         阿里云 RAM - Double Click TOTP
// @namespace    https://nowtime.cc/
// @version      0.1
// @description  阿里云 RAM 账号登录，双击自动填充 TOTP 验证码
// @author       Shine
// @match        https://signin.aliyun.com/*.onaliyun.com/login.htm*
// @match        https://signin.aliyun.com/login.htm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliyun.com
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    // Load jsOTP library from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/otpauth@9.1.4/dist/otpauth.umd.min.js';
    document.head.appendChild(script);

    // Wait for jsOTP library to load
    script.onload = function () {
        // 监听双击事件
        document.addEventListener('dblclick', handle);
    };

    function handle() {
        initClearOTPSecret()
        checkHasOPTSecret() && autoFillOTP_Submit()
    }

    function checkHasOPTSecret() {
        if (!GM_getValue('OTPSecret')) {
            const OTPSecret = prompt('请输入 OTPSecret')

            GM_setValue('OTPSecret', OTPSecret)
        }

        return true
    }

    function autoFillOTP_Submit() {
        const OTPSecret = GM_getValue('OTPSecret')
        const targetElement = document.querySelector('span.sc-kzqdkY.hIdzdD');

        if (!targetElement || !OTPSecret) {
            console.log('Target element not found. Aborting.');
            return;
        }

        let totp = new OTPAuth.TOTP({
            // issuer: "ACME",
            // label: "AzureDiamond",
            // algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: OTPSecret,
        });

        let code = totp.generate();

        const inputElement = document.querySelector('span.next-input.next-medium > input');

        if (inputElement) {
            inputElement.focus();
            inputElement.value = code;

            const event = new Event("input", {bubbles: true})
            event.simulated = true

            inputElement?._valueTracker?.setValue(inputElement);

            inputElement.dispatchEvent(event);

            const submitButton = document.querySelector('button[type=submit]');
            if (submitButton) {
                submitButton.disabled = false
                submitButton.click();
            }
        }
    }

    function initClearOTPSecret() {
        const $clearOTPSecret = document.createElement('a')
        $clearOTPSecret.innerText = ` clearOTPSecret`
        $clearOTPSecret.style.color = `#0b6df9`
        $clearOTPSecret.style.cursor = `pointer`
        $clearOTPSecret.addEventListener('click', function () {
            GM_setValue('OTPSecret', null)

            console.log('initClearOTPSecret', GM_getValue('OTPSecret'))
            alert('删除成功！')
        })

        const $securityCode = document.querySelector(`label[for="securityCode"]`)

        if (!$securityCode.getAttribute('is-set')) {
            $securityCode.setAttribute('is-set', 'true')
            $securityCode.appendChild($clearOTPSecret)
        }
    }
})();

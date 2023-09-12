// ==UserScript==
// @name         Hyperf Wiki 工具
// @namespace    https://nowtime.cc
// @version      0.1
// @description  已有功能：Hyperf Doc. 重定向到中文文档
// @author       shine
// @match        https://hyperf.wiki/3.0/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hyperf.wiki
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 监听hash变化
    window.addEventListener("hashchange", function () {
        // 获取当前的hash值
        const currentHash = window.location.hash;

        // 检查是否以#/en/开头
        if (currentHash.startsWith("#/en/")) {
            // 替换为#/zh-cn/
            // 修改浏览器地址栏的hash
            window.location.hash = currentHash.replace("#/en/", "#/zh-cn/");
        }
    });
})();

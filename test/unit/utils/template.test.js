/**
 * @file test case for utils/template.js
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import {client, server} from '../../../lib/utils/template';
import test from 'ava';

test('it should generate normal client template html', async t => {
    let indexHtmlTmpl =
`<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <%= renderMeta() %>
        <%= renderManifest() %>
    </head>
    <body>
        <%= renderEntry() %>
    </body>
</html>`;

    // ignore spaces and newlines
    t.is(client(indexHtmlTmpl, '/'),
`<!DOCTYPE html>
<% if (renderMetaFlag) { %>
<% meta = meta.inject() %>
<html lang="zh_CN" data-vue-meta-server-rendered {{{ meta.htmlAttrs.text() }}}>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        {{{ meta.title.text() }}}
        {{{ meta.meta.text() }}}
        {{{ meta.link.text() }}}
        {{{ meta.style.text() }}}
        {{{ meta.script.text() }}}
        {{{ meta.noscript.text() }}}
        <!-- Add to home screen for Android and modern mobile browsers -->
        <link rel="manifest" href="{{ config.build.publicPath }}static/manifest.json?v={{ config.buildVersion }}">
        <meta name="theme-color" content="{{ config.manifest.theme_color }}">
        <!-- Add to home screen for Safari on iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="{{ config.manifest.short_name || config.manifest.name }}">
        <link rel="apple-touch-icon" href="{{ config.build.publicPath }}{{ config.manifest.icons && config.manifest.icons[0] && config.manifest.icons[0].src }}">
        <!-- Add to home screen for Windows -->
        <meta name="msapplication-TileImage" content="{{ config.build.publicPath }}{{ config.manifest.icons && config.manifest.icons[0] && config.manifest.icons[0].src }}">
        <meta name="msapplication-TileColor" content="{{ config.manifest.theme_color}}">

        {{{ renderResourceHints() }}}
        {{{ renderStyles() }}}

        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body {{{ meta.bodyAttrs.text() }}}>

        <!--vue-ssr-outlet-->

        {{{ renderScripts() }}}
        {{{ renderState() }}}

        <% if (isProd) { %>
        <script>
            window.onload = function () {
                var script = document.createElement('script');
                var firstScript = document.getElementsByTagName('script')[0];
                script.type = 'text/javascript';
                script.async = true;
                script.src = '{{ config.build.publicPath }}sw-register.js?v= Date.now();
                firstScript.parentNode.insertBefore(script, firstScript);
            };
        </script>
        <% } %>

    </body>
</html>`
    )
});

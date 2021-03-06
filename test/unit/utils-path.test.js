/**
 * @file test case for utils/router.js
 * @author panyuqi (pyqiverson@gmail.com)
 */

import {distLavasPath, assetsPath, resolveAliasPath} from '../../lib/utils/path';
import {join} from 'path';
import test from 'ava';

// distLavasPath()
test('it should concat path with lavas directory', t => {
    t.is('/root/lavas/newpath', distLavasPath('/root', 'newpath'));
});

// assetsPath()
test('it should generate a relative path based on config', t => {
    t.is('static/js/[name].[hash].js', assetsPath('js/[name].[hash].js'));
});

// resolveAliasPath()
test('it should resolve path with webpack alias', t => {
    let alias = {
        '@': '/root'
    };
    t.is('/root/components/a.vue', resolveAliasPath(alias, '@/components/a.vue'));
});

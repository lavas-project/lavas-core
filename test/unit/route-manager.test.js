/**
 * @file test case for RouteManager.js
 * @author panyuqi (pyqiverson@gmail.com)
 */

/* eslint-disable fecs-use-standard-promise */

import {join} from 'path';
import test from 'ava';
import LavasCore from '../../lib';
import {readFile} from 'fs-extra';

let core;

test.before('load config first', async t => {
    core = new LavasCore(join(__dirname, '../fixtures'));
    await core.init('production');
});

test('it should generate routes.js in .lavas directory', async t => {
    await core.routeManager.autoCompileRoutes();

    let content = await readFile(join(__dirname, '../fixtures/.lavas/routes.js'), 'utf8');

    t.true(content.indexOf('path: \'/detail/:id\'') > -1
        && content.indexOf('name: \'detail-id\'') > -1
        && content.indexOf('path: \'/\'') > -1
        && content.indexOf('name: \'index\'') > -1);
});

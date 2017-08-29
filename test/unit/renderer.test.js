/**
 * @file test case for Renderer.js
 * @author panyuqi (pyqiverson@gmail.com)
 */

/* eslint-disable fecs-use-standard-promise */

import {join} from 'path';
import glob from 'glob';
import test from 'ava';
import LavasCore from '../../lib';
import {readFile} from 'fs-extra';

let core;

test.before('load config first', async t => {
    core = new LavasCore(join(__dirname, '../fixtures'));
    await core.init('production');
});

test('it should copy all the files in static directory in production mode', async t => {
    let webpackConfig = core.config.webpack;
    let outputPath = webpackConfig.base.output.path;
    let {assetsDir, copyDir} = webpackConfig.shortcuts;

    let staticFiles = glob.sync(
        '**/*', {
            cwd: copyDir
        }
    );

    await core.build('production');

    let staticFilesAfterBuild = glob.sync(
        '**/*', {
            cwd: join(outputPath, assetsDir)
        }
    );

    t.true(staticFiles.every(file => staticFilesAfterBuild.indexOf(file) > -1));

});

test('it should split into 4 bundles in production mode', async t => {
    let webpackConfig = core.config.webpack;
    let outputPath = webpackConfig.base.output.path;
    let {assetsDir, copyDir} = webpackConfig.shortcuts;

    await core.build('production');

    let jsFiles = glob.sync(
        '**/*.js', {
            cwd: join(outputPath, assetsDir, 'js')
        }
    );

    let bundles = ['app', 'manifest', 'vendor', 'vue'];

    t.true(bundles.every(bundle => jsFiles.some(js => js.startsWith(bundle))));
});

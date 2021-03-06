/**
 * @file test case for utils/router.js
 * @author panyuqi (pyqiverson@gmail.com)
 */

import {generateRoutes, routes2Reg, matchUrl} from '../../lib/utils/router';
import {join} from 'path';
import test from 'ava';

// generateRoutes()
test('it should generate routes according to the structure of directory', async t => {
    let routes = await generateRoutes(join(__dirname, '../fixtures/pages'));

    t.true(routes.length === 5);

    t.deepEqual(routes[0], {
        path: '/404',
        component: 'pages/404.vue',
        name: '404'
    });

    t.deepEqual(routes[1], {
        path: '/500',
        component: 'pages/500.vue',
        name: '500'
    });

    t.deepEqual(routes[2], {
        path: '/detail/:id',
        component: 'pages/detail/_id.vue',
        name: 'detail-id'
    });

    t.deepEqual(routes[3], {
        path: '/',
        component: 'pages/index.vue',
        name: 'index'
    });

    // nested routes
    t.deepEqual(routes[4], {
        path: '/parent',
        component: 'pages/parent.vue',
        name: 'parent',
        children: [
            {
                component: "pages/parent/child1.vue",
                name: "parent-child1",
                path: "child1",
            },
            {
                component: "pages/parent/child2.vue",
                name: "parent-child2",
                path: "child2",
            }
        ]
    });
});

// routes2Reg()
test('it should convert routes pattern to regexp', t => {
    let regExp = /^.*/;
    let routes = '/detail/:id';

    // return origin RegExp directly
    t.is(routes2Reg(regExp), regExp);

    // turn
    let reg = routes2Reg(routes);
    t.true(reg.test('/detail/123'));
    t.false(reg.test('/xxxx/xxxx'));
});

// matchUrl()
test('it should check if a url matches a route pattern', t => {
    let url = '/detail/123?param1=1';

    // string case
    let routeInString = '/detail/:id';
    let wrongRouteInString = '/xxx/detail/:id';
    t.true(matchUrl(routeInString, url));
    t.false(matchUrl(wrongRouteInString, url));

    // function case
    let routeObj = {
        test: (url) => url.startsWith('/detail')
    }
    t.true(matchUrl(routeObj, url));

    // combined case, in an array
    t.true(matchUrl([routeInString, wrongRouteInString], url));
    t.true(matchUrl([wrongRouteInString, routeObj], url));
});

import LavasCore from './lib';
import Koa from 'koa';
import {join} from 'path';

let port = process.env.PORT || 3000;
let core = new LavasCore(join(__dirname, 'test/fixtures'));

let app = new Koa();
let server = app.listen(port, () => {
    console.log('server started at localhost:' + port);
});

async function start() {
    await core.init('development', true);
    await core.build();

    app.use(core.koaMiddleware());
}

start();

// catch promise error
process.on('unhandledRejection', (err, promise) => {
    console.log('in unhandledRejection');
    console.log(err);
    // cannot redirect without ctx!
});

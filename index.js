require('babel-core/register')({
    "presets": [
        [
            "env"
        ],
        "stage-2"
    ],
    "plugins": [
        "transform-runtime",
        "add-module-exports",
        "dynamic-import-node"
    ],
    "comments": false
});

require('./test');

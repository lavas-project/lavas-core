/**
 * @file route manager
 * @author panyuqi
 * @desc generate route.js, multi entries in .lavas directory
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin';

export {cssLoaders, styleLoaders, vueLoaders};

function vueLoaders (options = {}) {
    return {
        loaders: cssLoaders({
            sourceMap: options.cssSourceMap,
            minimize: options.cssMinimize,
            extract: options.cssExtract
        })
    };
}

function cssLoaders (options = {}) {

    let cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: options.minimize,
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        let loaders = [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        }

        return ['vue-style-loader', ...loaders];
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};

// Generate loaders for standalone style files (outside of .vue)
function styleLoaders (options) {
    let output = [];
    let loaders = cssLoaders(options);

    Object.keys(loaders).forEach(extension => {
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loaders[extension]
        });
    });

    return output;
};

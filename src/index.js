import process from 'process';

export const config = {
    context: process.cwd(),
    entry: {},
    output: {
        path: process.cwd(),
        filename: '[name].js',
    },
    module: {
        loaders: [],
    },
};

export const packback = {

    src(src) {
        config.context = src;
        return this;
    },

    dest(dest) {
        config.output.path = dest;
        return this;
    },

    script(name, path) {
        config.entry[name] = path;
        return this;
    },

    loader(test, loader, options) {
        config.module.loaders.push({ test, loader, ...options });
        return this;
    },

    export() {
        return config;
    },

};

packback.loader(/\.js/, 'babel', { exclude: /node_modules/ });

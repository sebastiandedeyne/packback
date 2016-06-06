import process from 'process';
import webpack from 'webpack';

/**************************
 **  Base configuration  **
 **************************/

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
    plugins: [],
};

/************************
 **  Public functions  **
 ************************/

/**
 * Configure the root directory of your application.
 * Should be an absolute path.
 *
 * @param {string} src
 */
export const src = src => {
    config.context = src;
};

/**
 * Configure the destination directory of your application.
 * Should be an absolute path.
 *
 * @param {string} dest
 */
export const dest = dest => {
    config.output.path = dest;
};

/**
 * Add an entry to the build.
 *
 * @param {string} name
 * @param {string|array} entry
 */
export const entry = (name, entry) => {
    config.entry[name] = entry;
};

/**
 * Alias for `entry`.
 *
 * @param {string} name
 * @param {string|array} script
 */
export const script = entry;

/**
 * Register a single loader.
 *
 * @param {regex} test
 * @param {string} loader
 * @param {object} options
 */
export const loader = (test, loader, options) => {
    config.module.loaders.push({ test, loader, ...options });
};

/**
 * Register an array of loaders.
 *
 * @param {regex} test
 * @param {array} loaders
 * @param {object} options
 */
export const loaders = (test, loaders, options) => {
    config.module.loaders.push({ test, loaders, ...options });
};

/**
 * Register a plugin.
 *
 * @param {object} plugin
 */
export const plugin = plugin => {
    config.plugins.push(plugin);
};

/**
 * Extract modules from chunks using the CommonsChunkPlugin.
 *
 * @param {string} name
 * @param {array} modules
 * @param {array} chunks
 */
export const extract = (name, modules, chunks) => {
    entry(name, modules);
    plugin(new webpack.optimize.CommonsChunkPlugin({
        name,
        chunks,
        filename: `${name}.js`,
    }));
};

/*****************
 **  Bootstrap  **
 *****************/

loader(/\.js/, 'babel', { exclude: /node_modules/ });

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: `${__dirname}/src/js`,
        filename: "build.js"
    },
    mode: "production" // 'development' or 'production'
}
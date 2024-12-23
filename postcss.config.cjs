const { default: plugin } = require("eslint-plugin-react");

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('tailwindcss-text-indent')
    ],
}
module.exports = {
    setupFiles: [
        require.resolve('./setup/mutationObserver'),
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!strudel-jest)'],
};

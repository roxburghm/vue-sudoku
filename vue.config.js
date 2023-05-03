const {gitDescribeSync} = require('git-describe');
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        themeColor: "#666",
        backgroundColor: "#ffffff",

        manifestOptions: {
            name: "Sudoku",
            display: "standalone",
            faviconSVG: null,
            iconPaths: {
                favicon32: 'images/icons/favicon-32x32.png',
                favicon16: 'images/icons/favicon-16x16.png',
                appleTouchIcon: 'images/icons/apple-touch-icon-152x152.png',
                maskIcon: 'images/icons/safari-pinned-tab.svg',
                msTileImage: 'images/icons/msapplication-icon-144x144.png',
            },
            icons: [
                {
                    "src": "images/icons/maskable_icon.png",
                    "sizes": "196x196",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "./images/icons/android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any msskable"
                },
                {
                    "src": "./images/icons/apple-touch-icon-60x60.png",
                    "sizes": "60x60",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/apple-touch-icon-76x76.png",
                    "sizes": "76x76",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/apple-touch-icon-120x120.png",
                    "sizes": "120x120",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/apple-touch-icon-152x152.png",
                    "sizes": "152x152",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/apple-touch-icon-180x180.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/apple-touch-icon.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/favicon-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/favicon-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/msapplication-icon-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png"
                },
                {
                    "src": "./images/icons/mstile-150x150.png",
                    "sizes": "150x150",
                    "type": "image/png"
                }
            ]
        }
    }
}

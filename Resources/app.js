var Smart = {
    ui: {},
    navGroup: undefined
};

Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();


//windows & ui
Ti.include(
	'windows/login.js',
	'windows/main.js',
	
	'windows/nieuweKoppeling.js',
	'windows/detail_link.js'
);
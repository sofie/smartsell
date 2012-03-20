var Ti;
Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();

Ti.include('smart/smart.js');

//windows & ui
Ti.include(
	'windows/login.js',
	'windows/main.js',
	
	'windows/nieuweKoppeling.js',
	'windows/getStuff.js'
);
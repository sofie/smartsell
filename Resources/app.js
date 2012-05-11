var Smart = {
    ui: {},
    navGroup: undefined
};
//Ti.App.localonline="local";
Ti.App.localonline="online";

//windows & ui
Ti.include(
	'windows/login.js',
	'windows/main.js',
	
	'windows/add_link.js',
	'windows/detail_link.js',
	'windows/add_product.js',
	
	//'styles/styles.js',
	'styles/styles_veggies.js',
	'config/config.js'
);
Smart.ui.createLoginWindow();
var Smart = {
    ui: {},
    navGroup: undefined
};
//Ti.App.localonline="online";
Ti.App.localonline="local";

//windows & ui
Ti.include(
	'windows/login.js',
	'windows/main.js',
	
	'windows/add_link_error.js',
	'windows/detail_link.js',
	'windows/detail_product.js',
	
	'styles/styles.js',
	'config/config.js'
);
Smart.ui.createLoginWindow();
var Smart = {
    ui: {},
    navGroup: undefined
};


//windows & ui
Ti.include(
	'windows/login.js',
	'windows/login_scan.js',
	'windows/main.js',
	
	'windows/add_link.js',
	'windows/detail_link.js',
	'windows/add_product.js',
	
	'styles/styles.js',
	'config/config.js'
);
Smart.ui.createLoginWindow();
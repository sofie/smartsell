var Smart = {
    ui: {},
    navGroup: undefined
};


//windows & ui
Ti.include(
	'windows/login.js',
	'windows/main.js',
	
	'windows/add_link.js',
	'windows/detail_link.js',
	
	'styles/styles.js',
	'config/config.js'
);
Smart.ui.createLoginWindow();
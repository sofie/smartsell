(function() {

	Smart.ui.createAddProductWindow = function() {
		var addProductWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			layout:'vertical'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Voeg product toe'
		}));
		addProductWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = backButton;

		var linkProduct1 = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Product 1'
		}));
		addProductWin.add(linkProduct1);


		var btnAddProduct = Titanium.UI.createButton(style.makenButton);
		addProductWin.add(btnAddProduct);


		btnAddProduct.addEventListener('click', function(e) {
			if(linkProduct1.value != '') {
				addProduct();
			} else {
				alert('Gelieve een barcode in te vullen.');
			}
		});
		
		function addProduct() {
			var createReq = Titanium.Network.createHTTPClient();
			createReq.open("POST", "http://localhost/smartsell/post_addproduct.php");

			var params = {
				productId : linkProduct1.value,
				linkId:Titanium.App.selectedIndex
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					if(response.add === true) {
						Titanium.API.info('Add product: ' + this.responseText);
						Ti.App.fireEvent('app:reloadDetail', {
							action : 'Reload detail'
						});
						Smart.navGroup.close(addProductWin, {
							animated : false
						});
					} else {
						alert('Product kan niet worden toegevoegd.');
					}
				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + JSON.parse(this.responseText));
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};
		
		return addProductWin;
	};
})();

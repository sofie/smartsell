(function() {

	Smart.ui.createNieuweKoppelingWindow = function() {
		var addKoppelingWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			layout:'vertical'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Nieuwe koppeling'
		}));
		addKoppelingWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addKoppelingWin, {
				animated : false
			});
		});
		addKoppelingWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		/*var linkNaam = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Naam koppeling',
		}));
		addKoppelingWin.add(linkNaam);
		*/

		var linkProduct1 = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Product 1'
		}));
		addKoppelingWin.add(linkProduct1);

		var linkProduct2 = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Product 2'
		}));
		addKoppelingWin.add(linkProduct2);

		var btnCreateLijstje = Titanium.UI.createButton(style.makenButton);
		addKoppelingWin.add(btnCreateLijstje);


		btnCreateLijstje.addEventListener('click', function(e) {
			if(linkProduct1.value != '') {
				addLink();
			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});
		
		function addLink() {
			var createReq = Titanium.Network.createHTTPClient();
			createReq.open("POST", "http://localhost/smartsell/post_addlink.php");

			var params = {
				//linkNaam : linkNaam.value,
				linkProduct1 : linkProduct1.value,
				linkProduct2 : linkProduct2.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					if(response.add === true) {
						Titanium.API.info('Add link: ' + this.responseText);
						Ti.App.fireEvent('app:reloadLinks', {
							action : 'Reload links'
						});
						Smart.navGroup.close(addKoppelingWin, {
							animated : false
						});
					} else {
						alert('Link bestaat al.');
					}
				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};
		
		return addKoppelingWin;
	};
})();

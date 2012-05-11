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

		var linkProduct1 = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Product barcode'
		}));
		addKoppelingWin.add(linkProduct1);


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
			if(Ti.App.localonline==="local"){
				createReq.open("POST", "http://localhost/smartsell/post_addlink.php");
			}else{
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addlink.php");
			}
			

			var params = {
				linkProduct1 : linkProduct1.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Ti.API.info("Add link: "+this.responseText);
					
					if(response.bestaatAl===true){
						alert('Link bestaat al.');
					}else{
						if(response.add === true) {
							Ti.App.fireEvent('app:reloadLinks', {
								action : 'Reload links'
							});
							Smart.navGroup.close(addKoppelingWin, {
								animated : false
							});
							Titanium.App.prodId = linkProduct1.value;
							Titanium.App.linkId=response.linkId;
							Titanium.App.linkNaam=response.linkNaam;
							
							Smart.navGroup.open(Smart.ui.createDetailProductWindow(), {
								animated : false
							});
						} else {
							alert('Link kan niet toegevoegd worden.');
						}
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

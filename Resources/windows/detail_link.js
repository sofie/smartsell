(function() {

	Smart.ui.createDetailWindow = function() {
		//
		// Main window
		//
		var detailWin = Titanium.UI.createWindow(commonStyle.window);
		
		var lblAddTitle = Titanium.UI.createLabel({
			text : Titanium.App.selectedNaam,
			color : '#fff',
			font : FontTitle
		});
		detailWin.setTitleControl(lblAddTitle);
		
		
		
		//Backbutton
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;

		getLinks();
		function getLinks() {

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartsell/get_itemdetail.php");
			
			var params = {
				linkId : Titanium.App.selectedIndex
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem === false) {
						Titanium.API.info(this.responseText);
						var lblNoLink = Titanium.UI.createLabel({
							text : 'Er is iets misgegaan. Link niet gevonden in databank.',
							top : 30,
							left : 30,
							right : 30,
							width : 'auto',
							height : 'auto',
							color : '#D64027'
						});
						detailWin.add(lblNoLink);

					} else {

						var linkNaam = detail.linkNaam;
						var linkProd1 = detail.linkProd1;

						var name = Titanium.UI.createLabel({
							text : linkNaam,
							left : 30,
							top : 20,
							width : 'auto',
							height : 25,
							textAlign : 'left',
							color : '#474240',
							font:FontNormal
						});
						detailWin.add(name);
						
						var prod1 = Titanium.UI.createLabel({
							text : linkProd1,
							left : 30,
							top : 20,
							width : 'auto',
							height : 25,
							textAlign : 'left',
							color : '#474240',
							font:FontNormal
						});

						detailWin.add(prod1);

					}

				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}

		return detailWin;
	};
})();

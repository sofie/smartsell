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
			Titanium.API.info(Titanium.App.selectedIndex);
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
						
							var pTitel = detail.pMerk + ' ' + detail.pTitel;
							var pFoto = detail.pFoto;
							var pBeschrijving = detail.pBeschrijving;
							var pPrijs = detail.pPrijs;

							Titanium.API.info(this.responseText);
							var bgView = Titanium.UI.createView({
								left : 20,
								right : 20,
								top : 20,
								backgroundColor : '#FCFAFA',
								height : 200,
								layout : 'vertical'
							});

							var cropView = Titanium.UI.createView({
								width : 100,
								height : 100,
								borderColor : '#B6AFA9',
								backgroundColor : '#fff'
							});

							var baseImg = Titanium.UI.createImageView({
								image : pFoto
							});
							cropView.add(baseImg);

							var croppedImage = cropView.toImage();

							var imageView = Titanium.UI.createImageView({
								image : croppedImage,
								width : 100,
								height : 100,
								left : 20,
								top : 10
							});

							var titel = Titanium.UI.createLabel({
								text : pTitel,
								left : 20,
								top : 10,
								width : 'auto',
								height : 25,
								textAlign : 'left',
								color : '#474240',
								font : FontBig
							});

							var beschrijving = Titanium.UI.createLabel({
								text : pBeschrijving,
								left : 130,
								right : 20,
								top : -110,
								height : 80,
								textAlign : 'left',
								color : '#474240',
								font : FontNormal
							});
							var prijs = Titanium.UI.createLabel({
								text : '€ ' + pPrijs,
								right : 20,
								top : 20,
								height : 30,
								textAlign : 'right',
								color : '#474240',
								font : FontBig
							});
							bgView.add(titel);
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);

							detailWin.add(bgView);
						
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

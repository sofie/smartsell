(function() {
	var updateTimeout = 15000;
	var i = 0;
	var navWindow;   	
   	
//
    //
   /*var tabGroup = Titanium.UI.createTabGroup();  
   	//nieuw
	var main    = Titanium.UI.createWindow();
	//nieuw
	var mainTab = Titanium.UI.createTab();*/
	//
	

	var win = Titanium.UI.createWindow({  
	    title:'Inloggen',  
	    barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			},
	    tabBarHidden:true,  
	    //url:'main_windows/login.js'  
	    
	});  
	
	/*var loginTab = Titanium.UI.createTab({  
	    title:"Login",  
	    window:win //login  
	}); */ 
	
	 // 
	/*tabGroup.addTab(loginTab);  
	tabGroup.open();*/
	//
	
	//Eerste scherm
	navWindow = Ti.UI.createWindow();
	Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
		window : win
	});
	navWindow.add(Smart.navGroup);

	navWindow.open({
		transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});

   	
   	//
	  
   	
   	//var win = Titanium.UI.currentWindow;  
      
      //label
 	   var labelPersoneelskaart = Titanium.UI.createLabel({
    	color:'#888',
		text:'Scan de barcode van uw personeelskaart om in te loggen.',
		left: 10,
		top:-350,
		font:{
			fontSize:15,
			fontFamily:'Bree Serif'
			},
		textAlign:'left',
		width:'280'
    	
    })
    
    win.add(labelPersoneelskaart);
    
    //foto personeelskaart
    var afbPersoneelskaart = Titanium.UI.createImageView({
    	image:"/img/personeelskaart.png",
    	left:35,
    	top: 70,
    	width:247,
    	height:181
    	
    	
    })
    
    win.add(afbPersoneelskaart); 
    
    
    //label
    var labelPersoneelsnummer = Titanium.UI.createLabel({
    	color:'#888',
		text:'Inloggen via scannen lukt niet? Log hier in.',
		left: 10,
		top:180,
		font:{
			fontSize:15,
			fontFamily:'Bree Serif'
			},
		textAlign:'left',
		width:'300'
    	
    })
    
    win.add(labelPersoneelsnummer);
    
    
    //inputveld
    var personeelNummer = Titanium.UI.createTextField({  
        color : '#888',  
        top:320,  
        left:10,  
        width:300,  
        height:40,  
        //width : widthTxtField,
		height : 40,
		hintText : 'Personeelsnummer',
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		opacity : 0.65,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS  
    });  
    win.add(personeelNummer);  
      
    //loginbutton
    var loginBtn = Titanium.UI.createButton({
    	backgroundImage : '/img/btn_inloggen.png',  
        title:'Inloggen',  
        top:370,
        right:10,  
        width:90,  
        height:35,  
        borderRadius:1,  
        font:{
        	fontFamily:'Bree Serif',
        	fontWeight:'bold',
        	fontSize:14}  
    });  
    win.add(loginBtn);  
    
    
    
    
    
    
	//request
	var loginReq = Titanium.Network.createHTTPClient();  
  
  
    //json response
    loginReq.onload = function()  
    {  
        var json = this.responseText;  
        var response = JSON.parse(json);  
        if (response.logged == true)  
        {  
           alert("Welcome " + response.personeelNummer + ".");  
            /*personeelNummer.blur();   
	        Ti.App.fireEvent('grantEntrance', {  
           	 	personeelNummer:response.personeelNummer  
        	}); 	 
       	 	win.close();*/
        }  
        else  
        {  
            alert(response.message);  
        }  
    };  
  
  
  	//verbinding met phpfile en database
	loginBtn.addEventListener('click',function(e)  
	{  
	    if (personeelNummer.value != '')  
	    {  
	        loginReq.open("POST","http://localhost/AuthSmartsell/post_auth.php");  //aanpassen!!!
	        var params = {  
	            personeelNummer: personeelNummer.value,   
	        };  
	        loginReq.send(params);  
	    }  
	    else  
	    {  
	        alert("Gelieve uw personeelskaart te scannen of uw personeelsnummer in te geven.");  
	    }  
	});
	
	
	
	//Login ok?: doorsturen naar koppelingspagina

    Ti.App.addEventListener('grantEntrance', function(event)  
    {  
         //main.tabBarHidden   = true;  
         //main.title      = 'Welkom ' + event.personeelNummer;  
         //main.url        = 'windows/main.js';
         //main.personeelNummer      = event.personeelNummer;  
         //mainTab.window      = main;  
       
          /*tabGroup.addTab(mainTab);  
          tabGroup.removeTab(loginTab);*/ 
    });  
  
	
	
	
	

//
})();
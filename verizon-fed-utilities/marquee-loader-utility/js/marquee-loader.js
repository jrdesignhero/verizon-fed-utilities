//require Library
(function () {
  var utilityUI = {
    ui_html: '<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400"><link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"><link rel="stylesheet" href="css/style.css"><div id="marquee_loader_ui"><div id="marquee_loader_navi"> <div class="mq_loader_logo_container"> <img src="https://www.fedscoop.com/government-of-the-future/assets/images/vz-white.png"/> </div><h2 id="marquee-loader-title">FEDLab <span id="utility-name" style="font-weight:100">| Marquee Loader</span></h2> <div id="marquee-loader-power-btn-container"><i id="marquee-loader-power-btn" class="fa fa-power-off fa-2x" aria-hidden="true"></i></div></div><div id="marquee_form_container"> <div class="marquee-loader-tab" id="marquee-loader-tab-1"> <div class="marquee_ui_col col_1"> <label for="marquee_1_input">CK Name 1</label> <input class="marquee_grabber_input" id="marquee_1_input" type="text" name="marquee_1_input"/> <label for="marquee_2_input">CK Name 2</label> <input class="marquee_grabber_input" id="marquee_2_input" type="text" name="marquee_2_input"/> <label for="marquee_3_input">CK Name 3</label> <input class="marquee_grabber_input" id="marquee_3_input" type="text" name="marquee_3_input"/> </div><div class="marquee_ui_col col_2"> <label for="marquee_4_input">CK Name 4</label> <input class="marquee_grabber_input" id="marquee_4_input" type="text" name="marquee_4_input"/> <label for="marquee_5_input">CK Name 5</label> <input class="marquee_grabber_input" id="marquee_5_input" type="text" name="marquee_5_input"/> <label for="marquee_6_input">CK Name 6</label> <input class="marquee_grabber_input" id="marquee_6_input" type="text" name="marquee_6_input"/> </div><div class="marquee_ui_col col_1a"> <label for="marquee_7_input">CK Name 7</label> <input class="marquee_grabber_input" id="marquee_7_input" type="text" name="marquee_7_input"/> <label for="marquee_8_input">CK Name 8</label> <input class="marquee_grabber_input" id="marquee_8_input" type="text" name="marquee_8_input"/> <label for="marquee_9_input">CK Name 9</label> <input class="marquee_grabber_input" id="marquee_9_input" type="text" name="marquee_9_input"/> </div><div class="marquee_ui_col col_3"> <div id="maquee-loader-controls-container"> <div id="marquee_loaded_number"> 0 </div><h3 class="off" id="marquee_loader_keys_found">Keys Found</h3> <div id="update_marquee">Load Content Keys</div></div></div></div><div class="marquee-loader-tab" id="marquee-loader-tab-2"> <div class="marquee_ui_col col_1_3"> <label for="marquee_loader_html">Marquee HTML</label> <textarea class="marquee_grabber_input" id="marquee_loader_html" type="text" name="marquee_loader_html"></textarea> </div><div class="marquee_ui_col col_3"> <div id="maquee-loader-controls-container_html"> <h4 class="panel-inst-head">Panel Insturction</h4> <p class="panel-inst">Please seperate each content key html with a semicolon. This step is required so the loader knows where to break the content.</p><div id="update_marquee_html">Insert Keys</div></div></div></div><div class="marquee-loader-tab" id="marquee-loader-tab-3"> <label>Activity Log</label> <div class="log-view"> session activity... </div></div><div class="marquee-loader-tab" id="marquee-loader-tab-4"> <h3 class="help-title">Marquee Loader - Database Lookup</h3> <p class="help-detail">To use the database lookup up to 9 content key ids and click load content keys. Each key content found in the database will load inside of the hero image container. Use the navigation menu on the right to close the view but keep the Marquee Loader running. Pressing the power button will release all the keys and turn off the loader utility</p><h3 class="help-title">Marquee Loader - HTML Upload</h3> <p class="help-detail">Here you can upload the HTML content directly to the hero container. Paste html in the container and seperate each key using [end_marquee] tag. Click Insert Keys and your content will be uploaded directly to the page</p><h3 class="help-title">Marquee Loader - Logs</h3> <p class="help-detail">You can see a list of all the marquees requested and the result of each request for the session.</p></div><ul id="marquee-loader-settings-nav"> <li id="setting-navi-1" data-np="marquee-loader-tab-1" class="setting-navi active"><i class="fa fa-database" aria-hidden="true"></i></li><li id="setting-navi-2" data-np="marquee-loader-tab-2" class="setting-navi"><i class="fa fa-code" aria-hidden="true"></i></li><li id="setting-navi-3" data-np="marquee-loader-tab-3" class="setting-navi"><i class="fa fa-server" aria-hidden="true"></i></li><li id="setting-navi-4" data-np="marquee-loader-tab-4" class="setting-navi"><i class="fa fa-question" aria-hidden="true"></i></li><li id="setting-navi-5"><i class="fa fa-angle-double-up" aria-hidden="true"></i></li></ul> </div></div><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script><script src="js/marquee-loader.js"></script>',
    insertUI: function () {
      document.getElementById('fed_utility_container_marquee_loader').innerHTML=utilityUI.ui_html;
    },
    init: function () {
      this.insertUI();
    }
  };
  utilityUI.init();
})();

var MarqueeLoader = {
	config: {
	    formContainerId: 'marquee_form_container',
	    marqueeInputClassName: 'marquee_grabber_input',
	    marqueeClassName: 'hero-wrapper',
	    endpoint: 'http://www.jrdesignhero.com/apps/vzw-playground/includes/get-content-keys.php',
	    hpMarqueeScript: 'http://somescript.js'
	},
	cache: {
    ui: {
      updateButton: {
        element: document.getElementById('update_marquee'),
        hideMe: function () {
          this.element.style.display="none";
        },
        showMe: function () {
          this.element.style.display="block";
        }
      },
      uploadHtmlButton: {
        element: document.getElementById('update_marquee_html'),
        hideMe: function () {
          this.element.style.display="none";
        },
        showMe: function () {
          this.element.style.display="block";
        }
      },
      keyCounter: {
        keysFound: 0,
        element: document.getElementById('marquee_loaded_number'),
        renderUI: function (v) {
          this.element.innerHTML = v;
        },
        resetCounter: function () {
          this.keysFound = 0;
          this.renderUI(this.keysFound);
        },
        incrementCounter: function () {
          this.keysFound++;
          this.renderUI(this.keysFound);
        }
      },
      powerButton: {
        element: document.getElementById('marquee-loader-power-btn'),
        state:0,
        turnOn: function () {
          this.element.className = "fa fa-power-off fa-2x on";
          this.state = 1;
        },
        turnOff: function () {
          this.element.className = "fa fa-power-off fa-2x off";
          this.state = 0;
        }
      }
    },
		validCk: {
			collection: [],
			resetCollection: function () {
				return this.collection.length = 0;
			},
			buildCollection: function (ckInputClassName) {
				this.resetCollection();
			    var ckCollection = document.getElementsByClassName(ckInputClassName);
			    for (var i = 0; i<ckCollection.length; i++) {
			      if(this.validateInputVal(ckCollection[i].value)) {
			        this.collection.push(ckCollection[i].value);
			      }
			    }
        return this.collection.length
			},
			trimInputVal: function (inputValue) {
			    return String(inputValue).trim();
			},
			validateInputVal: function (inputValue) {
				var cleanInput = this.trimInputVal(inputValue);
				if (cleanInput == '') {
				  return false
				}
				return true
			}
		},
		ckContentCollection: {
			collection: [],
			getCkContent: function (ckIdCollection) {
        if (ckIdCollection.length > 0) {
				  this.clearCollection();
          MarqueeLoader.cache.ui.keyCounter.resetCounter();
			    for (var i=0; i<ckIdCollection.length; i++) {
			      $.ajax(MarqueeLoader.config.endpoint,{
			        method: 'POST',
			        data: {ckid: ckIdCollection[i]},
			        async: false,
			        jsonp: true,
			        success: function (data) {
                if (data.result == "success") {
                  MarqueeLoader.cache.ui.keyCounter.incrementCounter();
                }
                if (data.result != 0) {
                  if (data.result != 'failed') {
                    var out = '<div class="hero-slide">';
                    out += String(data.content_key).replace(/'/g, "&39;");
                    out += '</div>';
                  } else {
                    var out = '<div class="hero-slide-container background_FF lifestyle half" style="background:#FDE4E1;" data-temp=""><div class="hero-slide-wrapper"><h2 style="color:#B10009;font-size:26px;padding:20px 20px 0px 20px;margin-bottom:5px;text-align:center;">Content Key Not Found</h2><p style="color:#B10009;font-size:16px;padding:0px 20px 20px 20px;margin-top:0px;text-align:center;">ck_value_goes_here</p></div></div>';                
                  }
                } else {
                  var out = '<div class="hero-slide">there was a service error contact FED admin</div>';
                }
                MarqueeLoader.cache.ckContentCollection.collection.push(out);
			        }
			      });
			    }
          return this.collection;
        }
        MarqueeLoader.cache.ui.updateButton.showMe();
        return false;
			},
			clearCollection: function () {
				return this.collection.length=0
			}
		}, /*end ckContentCollection*/
		hero: {
			getHeroContainer: function (className) {
				var h = document.getElementsByClassName(className);
				return h[0];
			},
			publishString: function (contentArray) {
				this.getHeroContainer(MarqueeLoader.config.marqueeClassName).innerHTML = contentArray.join('');
        $(window).trigger('resize');
        MarqueeLoader.cache.ui.updateButton.showMe();
			}
		}
	},
	bindUIActions: function () {
	    //ui actions
      //update ck button
	    MarqueeLoader.cache.ui.updateButton.element.onclick=function () {
        MarqueeLoader.cache.ui.updateButton.hideMe();
	      if (MarqueeLoader.cache.validCk.buildCollection (MarqueeLoader.config.marqueeInputClassName)) {
          MarqueeLoader.cache.hero.publishString (MarqueeLoader.cache.ckContentCollection.getCkContent(MarqueeLoader.cache.validCk.collection)); 
        } else {
          alert('please enter at least 1 ck');
          MarqueeLoader.cache.ui.updateButton.showMe();
        }
	    };
      //setting Navigation 
      $('.setting-navi').on('click', function () {
        $('.setting-navi').removeClass('active');
        $('.marquee-loader-tab').hide();
        $(this).addClass('active');
        $('#'+$(this).attr('data-np')).show();
      });
      $('#setting-navi-5').on('click', function () {
        $('#'+MarqueeLoader.config.formContainerId).slideUp();
      });
      //power button
      MarqueeLoader.cache.ui.powerButton.element.onclick=function () {
        if (MarqueeLoader.cache.ui.powerButton.state && ($('#'+MarqueeLoader.config.formContainerId).is(':visible')) ) {
          MarqueeLoader.cache.ui.powerButton.turnOff();
        } else {
          MarqueeLoader.cache.ui.powerButton.turnOn();
        }
        $('#'+MarqueeLoader.config.formContainerId).slideToggle();
      };

	},
	init: function () {
		this.bindUIActions();
	}
};

//logic here
(function() {
  MarqueeLoader.init();  
})()
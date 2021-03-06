//require Library
/*requires jquery library:<script src=https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>*/
var helpers = {
    showLoadMessage: function (type) {
	    if (type=='success') {
	       $('#success-load-message').show(0).delay('2500').hide(0);
	    } else {
	       $('#failed-load-message').show(0).delay('2500').hide(0);
	    }
    }
};
var logger = (function() {
  var settings = {
    logView: document.getElementById('log-view-1'),
    setLogView: function(idOfLogView) {
      this.logView = document.getElementById(idOfLogView);
    }
  };
  var logs = {
    all_logs: '',
    prepLogMessage: function(message) {
      return '<p class="logMessage">' + message + '</p>';
    },
    update_logs: function(logMessage) {
      logs.all_logs += logs.prepLogMessage(logMessage);
    },
    get_logs: function() {
      return logs.all_logs;
    },
    print_logs: function() {
      settings.logView.innerHTML = logs.all_logs;
    },
    delete_logs: function() {
      logs.all_logs = '';
    },
    copy_logs: function() {}
  };

  return {
    api: {
      updateLogs: logs.update_logs,
      printLogs: logs.print_logs,
      clearLogs: logs.delete_logs,
      copyLogs: logs.copy_logs,
      setLogView: settings.setLogView
    }
  }
})();

var marqueeInserter = (function() {
  var marqueeString = {
      currentString: '',
      clearString: function() {
        marqueeString.currentString = '';
      },
      buildString: function() {
        var inputString = document.getElementById('marquee_loader_html');
        
        //log request
        logger.api.updateLogs('# Marquee Inserter Utility initialized...');
        logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - User input marquee html content using [marquee] tags ');
        
        marqueeString.currentString = inputString.value.trim().match(/\[marquee\][\s\S]*?\[\/marquee\]?/gi);
        if (marqueeString.currentString) {
          //log match
          logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Marquee tags found [marquee][/marquee]: '+'Pass');
          var temp = [];
          for (var i = 0; i<marqueeString.currentString.length; i++) {
            if (i==0) {
              temp.push('<div class="hero-slide hero-visible hero-active-slide">'+marqueeString.currentString[i].replace(/\[marquee\]|\[\/marquee\]/g, '')+'</div>');
            } else {
              temp.push('<div class="hero-slide">'+marqueeString.currentString[i].replace(/\[marquee\]|\[\/marquee\]/g, '')+'</div>');
            }
          }
          marqueeString.currentString = temp;
          //log          
          logger.api.printLogs(); 
          return marqueeString.currentString;
        }
        logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Marquee tags found [marquee][/marquee]: '+'Fail');
        logger.api.printLogs();
      },
      getString: function() {
        if (marqueeString.currentString !== null) {
          logger.api.printLogs();
          console.log(marqueeString.currentString.join(''));
          return marqueeString.currentString.join('');
        } else {
          //log
          logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Marquee Loader Output [ Error ]: Please enter html content between [marquee][/marquee] tags for each key<br /><br />');
          logger.api.printLogs();
          alert('Please enter html content between [marquee][/marquee] tags for each key');
          return false
        }
      },
      insertString: function() {
        var marqueeHeroContainer = document.getElementsByClassName('hero-wrapper')[0];
        marqueeString.buildString();
        if ( marqueeString.getString() ) {
          helpers.showLoadMessage('success');
          mySwiper.removeAllSlides();
          marqueeHeroContainer.innerHTML = marqueeString.getString();
          
	  setTimeout(function () {
   	  mySwiper.update();
          mySwiper.init();
	  
          //add tool tips
	  TOOLTIPS.init();
	  $('[class*="tooltip-link"]').on('mouseover keyup mouseout blur', function(event) {
		TOOLTIPS.eventToolTip(event);
	  });
	  
	  }, 1000);
  
          //log request
          logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - User generated HTML content keys inject into DOM<br /><br />');
        } else {
          helpers.showLoadMessage(false);
        }
        logger.api.printLogs();
      }
    }
    //bind Ui actions
  var bindUIActions = function() {
    var b = document.getElementById('update_marquee_html');
    b.onclick = function() {
      marqueeString.insertString();
    }
  };
  bindUIActions();
})();

var MarqueeLoader = {
  config: {
    formContainerId: 'marquee_form_container',
    marqueeInputClassName: 'marquee_grabber_input',
    marqueeClassName: 'hero-wrapper',
    endpoint: '//testman.verizonwireless.com/vzw/desktop/test/cqContentDisplayTest.jsp',
    hpMarqueeScript: 'http://somescript.js'
  },
  cache: {
    ui: {
      updateButton: {
        element: document.getElementById('update_marquee'),
        hideMe: function() {
          this.element.style.display = "none";
        },
        showMe: function() {
          this.element.style.display = "block";
        }
      },
      uploadHtmlButton: {
        element: document.getElementById('update_marquee_html'),
        hideMe: function() {
          this.element.style.display = "none";
        },
        showMe: function() {
          this.element.style.display = "block";
        }
      },
      keyCounter: {
        keysFound: 0,
        element: document.getElementById('marquee_loaded_number'),
        renderUI: function(v) {
          this.element.innerHTML = v;
        },
        resetCounter: function() {
          this.keysFound = 0;
          this.renderUI(this.keysFound);
        },
        incrementCounter: function() {
          this.keysFound++;
          this.renderUI(this.keysFound);
        }
      },
      powerButton: {
        element: document.getElementById('marquee-loader-power-btn'),
        state: 0,
        turnOn: function() {
          this.element.className = "fa fa-power-off fa-2x on";
          this.state = 1;
        },
        turnOff: function() {
          this.element.className = "fa fa-power-off fa-2x off";
          this.state = 0;
        }
      }
    },
    validCk: {
      collection: [],
      resetCollection: function() {
        return this.collection.length = 0;
      },
      buildCollection: function(ckInputClassName) {
        this.resetCollection();
        var ckCollection = document.getElementsByClassName(ckInputClassName);
        for (var i = 0; i < ckCollection.length; i++) {
          if (this.validateInputVal(ckCollection[i].value)) {
            this.collection.push(ckCollection[i].value);
          }
        }
        return this.collection.length
      },
      trimInputVal: function(inputValue) {
        return String(inputValue).trim();
      },
      validateInputVal: function(inputValue) {
        var cleanInput = this.trimInputVal(inputValue);
        if (cleanInput == '') {
          return false
        }
        return true
      }
    },
    ckContentCollection: {
      collection: [],
      getCkContent: function(ckIdCollection) {
        var cksFound = 0;
	      var ckclk = [];
        var regExDesktop = /-desktop$/i;
        var regExMobile = /-mobile$/i;

        if (ckIdCollection.length > 0) {
          this.clearCollection();
          MarqueeLoader.cache.ui.keyCounter.resetCounter();
          
          logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Marquee loader utility initalized...');
          
          for (var i = 0; i < ckIdCollection.length; i++) {

            //check that the string entered for ck has -desktop or -mobile for the service
            logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Content Key requested: ' + ckIdCollection[i]);
	    /*
	    // Removed as this is now Desktop Only Tool
	    if (!regExDesktop.test(ckIdCollection[i]) && !regExMobile.test(ckIdCollection[i])) {
              logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - [Missing Device Identifier] - request for '+ckIdCollection[i]+' missing -DESKTOP or -MOBILE');
              alert('Our service requires a device identifier (-DESKTOP or -MOBILE) be appended to the end of the CK name when loading content keys. You entered: ' + String(ckIdCollection[i]).toUpperCase() + ' as a ck name without a device identifier. As a result the lookup for this key has failed. Please reload this key using the value: ' + String(ckIdCollection[i]).toUpperCase() +'-DESKTOP for desktop or '+String(ckIdCollection[i]).toUpperCase() +'-MOBILE for mobile.');
            } 
	    */

            $.ajax(MarqueeLoader.config.endpoint, {
              method: 'GET',
              data: {
                contentKey: String(ckIdCollection[i]).toUpperCase()+'-DESKTOP'
              },
              dataType:'html',
              async: false,
              success: function(data) {
                var temp = data.replace(/<p>htmlBody: /, '');

                if (temp.length) {
                  MarqueeLoader.cache.ui.keyCounter.incrementCounter();
                  
                  var out = '<div class="hero-slide">';
                  out += String(temp).replace(/'/g, "&39;");
                  out += '</div>';
                  cksFound++; 
                  logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Content Key Found:'+' [Pass] | ['+ckIdCollection[i]+']');
		} else {
		  logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - Content Key Found:'+' [Fail] | ['+ckIdCollection[i]+']');
                  out = '<div class="hero-slide background_FF lifestyle" style="background:#FDE4E1;" data-temp=""><div class="hero-slide-wrapper"><h2 style="color:#B10009;font-size:26px;padding:20px 20px 0px 20px;margin-bottom:5px;text-align:center;">Content Key Not Found</h2><p style="color:#B10009;font-size:16px;padding:0px 20px 20px 20px;margin-top:0px;text-align:center;">'+ckIdCollection[i]+'</p></div></div>';
                }
		ckclk.push(out);
                logger.api.updateLogs(Date()+' ['+ new Date().getTime() +'] - '+ckIdCollection[i]+' added to home page marquee');
                MarqueeLoader.cache.ckContentCollection.collection.push(out);
              }
            });
          }
	  mySwiper.removeAllSlides();
	  mySwiper.appendSlide(ckclk);

	  setTimeout(function () {
   	  mySwiper.update();
          mySwiper.init();
	  
	  //add tool tips
	  TOOLTIPS.init();
	  $('[class*="tooltip-link"]').on('mouseover keyup mouseout blur', function(event) {
		TOOLTIPS.eventToolTip(event);
	  });
	  
	  }, 1000);		
		
          logger.api.printLogs();
          if (cksFound) {
             helpers.showLoadMessage('success');
          } else {
             helpers.showLoadMessage(false);
          }
          return this.collection;
        }
        MarqueeLoader.cache.ui.updateButton.showMe();
        logger.api.printLogs();
        return false;
      },
      clearCollection: function() {
        return this.collection.length = 0
      }
    },
    /*end ckContentCollection*/
    hero: {
      getHeroContainer: function(className) {
        var h = document.getElementsByClassName(className);
        return h[0];
      },
      publishString: function(contentArray) {
        this.getHeroContainer(MarqueeLoader.config.marqueeClassName).innerHTML = contentArray.join('');
        $(window).trigger('resize');
        MarqueeLoader.cache.ui.updateButton.showMe();
      }
    }
  },
  bindUIActions: function() {
    //ui actions
    //update ck button
    MarqueeLoader.cache.ui.updateButton.element.onclick = function() {
      MarqueeLoader.cache.ui.updateButton.hideMe();
      if (MarqueeLoader.cache.validCk.buildCollection(MarqueeLoader.config.marqueeInputClassName)) {
        MarqueeLoader.cache.hero.publishString(MarqueeLoader.cache.ckContentCollection.getCkContent(MarqueeLoader.cache.validCk.collection));
      } else {
        alert('please enter at least 1 ck');
        MarqueeLoader.cache.ui.updateButton.showMe();
      }
    };
    //setting Navigation 
    $('.setting-navi').on('click', function() {
      $('.setting-navi').removeClass('active');
      $('.marquee-loader-tab').hide();
      $(this).addClass('active');
      $('#' + $(this).attr('data-np')).show();
    });
    $('#setting-navi-5').on('click', function() {
      $('#' + MarqueeLoader.config.formContainerId).hide();
    });
    //power button
    MarqueeLoader.cache.ui.powerButton.element.onclick = function() {
      if (MarqueeLoader.cache.ui.powerButton.state && ($('#' + MarqueeLoader.config.formContainerId).is(':visible'))) {
        MarqueeLoader.cache.ui.powerButton.turnOff();
      } else {
        MarqueeLoader.cache.ui.powerButton.turnOn();
      }
      $('#' + MarqueeLoader.config.formContainerId).toggle();
    };
  
    //remaining
    var clear_btn_1 = document.getElementById('clear_keys_1');
    var clear_btn_2 = document.getElementById('clear_keys_2');
    
    clear_btn_1.onclick = function () {
      document.getElementsByClassName('hero-wrapper')[0].innerHTML = '';
      document.getElementById('marquee_loader_html').value ='';
      return false
    }
    clear_btn_2.onclick = function () {
      document.getElementsByClassName('hero-wrapper')[0].innerHTML = '';
      return false
    }    
  },
  init: function() {
    this.bindUIActions();
  }
};

//logic here
(function() {
  MarqueeLoader.init();
})()

// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
  swipePanel: 'left'
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

//to get the swiper
var mySwiper = myApp.swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationHide: false,
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
});

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
  // Do something here for "about" page

});
myApp.onPageInit('personal-information', function (page) {
  // Do something here for "personal information" page

});
myApp.onPageInit('settings', function (page) {
  // Do something here for "settings" page

});
myApp.onPageInit('help', function (page) {
  // Do something here for "help" page
});

// // Option 2. Using one 'pageInit' event handler for all pages:
// $$(document).on('pageInit', function (e) {
//   // Get page data from event data
//   var page = e.detail.page;
//
//   if (page.name === 'about') {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
//   }
// });

// // Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//   // Following code will be executed for page with data-page attribute equal to "about"
//   myApp.alert('Here comes About page');
// });
//获取登录的json
myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
      var formData = myApp.formToJSON('#login-form');
      alert(JSON.stringify(formData));
  });
});
//获取注册的json
myApp.onPageInit('register-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.regi-button').on('click', function () {
      var formData = myApp.formToJSON('#register-form');
      alert(JSON.stringify(formData));
      });
  });

  //settings page
myApp.onPageInit('settings',function(page){
  var pageContainer=$$(page.container);
  pageContainer.find('#picker-map').on('click',function() {
    var pickerMap = myApp.picker({
      input: '#picker-map',
      cols: [
          {
              textAlign: 'center',
              values: ['百度地图', '高德地图', '谷歌地图']
          }
      ]
  });
  pickerMap.open();
  })
})

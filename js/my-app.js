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
      $.ajax({
        url: "regist.php",
        data: {"method": "ajaxLogin", "formData": formData},
        type: "POST",
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {
          if(result) {
              window.location.href = 'home.html';
          } else {
            alert("账号或密码错误");
          }
        }
      });
  });
});
//获取注册的json
myApp.onPageInit('register-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.regi-button').on('click', function () {
      var formData = myApp.formToJSON('#register-form');
      if(validateLoginname(formData.name) && 
         validateMobile(formData.phone) && 
         validateBirthDay(formData.date) && 
         validatePassword(formData.password) &&
         (formData.password == formData.repassword)) {
        $.ajax({
          url: "regist.php",
          data: {"method": "ajaxRegist", "formData": formData},
          type: "POST",
          dataType: "json",
          async: false,
          cache: false,
          success: function (result) {
            if(result) {
              alert("注册成功");
              window.location.href = 'home.html';
            } else if (!result) {
              alert("用户名已注册");
            } else {
              alert("注册失败");
            }
          }
        });
      }
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
  });
});


// 语音识别
$$('#speaker').on('click', function() {
  var t = (new Date()).getTime();
  $$('iframe')[2].src = "http://boscdn.bpc.baidu.com/mms-res/efe-voice-playground/index4.html?t=" + t;
  // $$('#speaker-frame').src = "http://boscdn.bpc.baidu.com/mms-res/efe-voice-playground/index4.html?t=" + t;
});



















// 验证登录名
function validateLoginname (username) {
  if(!username) {
    alert("用户名不能为空！");
    return false;
  }

  if(username.length < 3 || username.length > 10) {
    alert("用户名长度必须在3~10之间");
    return false;
  }

  if(!/^[a-zA-Z]{1}[a-zA-Z0-9_]{3,15}$/.test(username)) {
    alert("用户名只能是字母、数字和下划线");
    return false;
  }

  return true;
}

// 验证手机号
function validateMobile (phone) {
   if(!phone) {
      alert("手机号不能为空！");
      return false;
   }

   if(phone.length != 11) {
      alert("手机号位数不对！");
      return false;
   }

   return true;
}


// 验证生日
function validateBirthDay (birthday) {
  if(!birthday) {
    alert("生日不能为空！");
    return false;
  }

  return true;
}

// 验证密码
function validatePassword (password) {
  if(!password) {
    alert("密码不能为空！");
    return false;
  }

  if(password.length < 6) {
    alert("密码长度必须大于6位！");
    return false;
  }

  return true;
}
//charts page
$$('.char-detail').on('click',function(){
    window.location.href = 'chardetails.html';
})


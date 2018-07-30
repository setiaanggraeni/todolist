function statusChangeCallback(response) {
  // console.log('statusChangeCallback');
  // console.log(" response statusChangeCallback =======>",response);
  if (response.status === 'connected') {
    localStorage.setItem("tokenFB", response.authResponse.accessToken) // set token
    checkAccountRegistered();
  } else {
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    // checkAccountRegistered();
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '230984424196739',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    // statusChangeCallback(response);
  });

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkAccountRegistered() {
  // console.log('---- check account', localStorage.getItem('tokenFB') )
  axios.get('http://35.198.242.177/users/login/fb', {
    headers: {
      token: localStorage.getItem('tokenFB') 
    }
  })
  .then(dataFb => {
    // console.log('tesstt masuk====>>> ', dataFb.data);
    localStorage.setItem("token", dataFb.data) // token jwt, for user check
    // console.log("dataFb.data.tokenFb -->>>", dataFb.data.tokenFb);
    window.location='user.html'
    
  })
  .catch(err => {
    console.log('test error',err);
  })
  
}

function fbLogout(){
  FB.logout(function(response){
    statusChangeCallback(response)
    localStorage.clear()
  })
}

const fbAsyncInit = async() => {
  FB.init({
    appId: '3402313643181496',
    cookie: true,
    xfbml: true,
    version: 'v8.0'
  });

  FB.AppEvents.logPageView();

};

const getLoginStatus = (res) => {
  console.log(res);
}

module.exports = getLoginStatus;

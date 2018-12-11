const promise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('file-system');

//Function setting up which website I am requesting the data from
const options = {
  uri: `https://www.jamieoliver.com/`,
  transform: function (body) {
    return cheerio.load(body);
  }
  // headers: {
  //   Cookie: 'CookieControl={"necessaryCookies":["CookieControl","JSESSIONID","PHPSESSID","blaize_session","blaize_tracking_id","jo_user_login3"],"optionalCookies":{"performance":"accepted","functionality":"accepted","targetting":"accepted"},"initialState":{"type":"notify","action":"accepted"},"statement":{"shown":true,"updated":"04/09/2018"},"consentDate":1544028771895,"consentExpiry":365,"interactedWith":true,"user":"BCCFBD17-D782-4280-B83A-EA1E1AA8C12E"}'
  // }
};

//Function making the request for data
promise(options)
  .then($ => {
    
    const homePage = $('body').html();

    //Function creating new HTML file and adding scraped data
    fs.appendFile('index.html', homePage, function (err) {
      if (err) throw err;

      console.log('file created');
    });

  })
  .catch((err) => {
    console.log(err);
  });

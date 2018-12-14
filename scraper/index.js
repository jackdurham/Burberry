const promise = require('request-promise');
const cheerio = require('cheerio');
const fs      = require('file-system');

//Function setting up which website I am requesting the data from
const options = {
  uri: `www.jamieoliver.com/`,
  transform: function (body) {
    return cheerio.load(body);
  }
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


        //FOR USE WITH COOKIES

// const promise = require('request-promise').defaults({jar: true});
// const cheerio = require('cheerio');
// const fs      = require('file-system');
// var tough     = require('tough-cookie');
//
// //Creating a cookie
// let cookie = new tough.Cookie({
//     key: "some_key",
//     value: "some_value",
//     domain: 'https://www.soccerstats.com/latest.asp?league=portugal',
//     httpOnly: true,
//     maxAge: 31536000
// });
//
// //Putting cookie in a jar for multiple requests
// var cookiejar = promise.jar();
// cookiejar.setCookie(cookie, 'https://www.soccerstats.com/latest.asp?league=portugal');
//
// //Function setting up which website I am requesting the data from
// const options = {
//   uri: `https://www.soccerstats.com/latest.asp?league=portugal`,
//   jar: cookiejar, //Remove for use without cookies
//   transform: function (body) {
//     return cheerio.load(body);
//   }
// };
//
// //Function making the request for data
// promise(options)
//   .then($ => {
//
//     const homePage = $('body').html();
//
//     //Function creating new HTML file and adding scraped data
//     fs.appendFile('index.html', homePage, function (err) {
//       if (err) throw err;
//
//       console.log('file created');
//     });
//
//   })
//   .catch((err) => {
//     console.log(err);
//   });

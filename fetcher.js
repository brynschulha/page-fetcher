const request = require('request');
const fs = require('fs');

const pageFetcher = function (commandLineArgs) {
  request(commandLineArgs[0], (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (response.statusCode !== 200) {
      console.log("Status code was not 200. Unable to download contents.")
    }
    // console.log('body:', body); // Print the HTML for the Google homepage.
    fs.writeFile(commandLineArgs[1], body, (err) => {
      if (err) throw err;
      let stats = fs.statSync(commandLineArgs[1]);
      let fileSizeInBytes = stats["size"];
      console.log("Downloaded and saved " + fileSizeInBytes + " bytes to " + commandLineArgs[1]);
    });
  })
};


pageFetcher(process.argv.slice(2));

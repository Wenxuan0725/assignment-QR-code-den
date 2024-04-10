/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
//step 1: getting user input and outputting it as a URL

inquirer
  .prompt([{ //this is a question
    message: "Please enter your link to generate a QR code:",
    name: "URL",
  }])

  //step 2: generating a QR code image for our URL
  .then((answers) => { 
    console.log(answers.URL)
    const url = answers.URL 
    var qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    //step 3: saving our user input
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => { 
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
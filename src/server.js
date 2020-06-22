const os = require('os');
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  return res.send("You've hit " + os.hostname());
});

app.get('/fortune', (req, res) => {
  exec("fortune", (err, stdout, stderr) => {
    var response = os.hostname() + " responded: \n\n";
    if(err) {
      return res.send("Sorry, but 'fortune' is not currently available.");
    }
    return res.send(response + stdout);
  })
});

app.get('/save', (req, res) => {
  exec("fortune > /fortunes/fortune.txt", (err, stdout, stderr) => {
    var response = os.hostname() + " responded: \n\n";
    if(err) {
      return res.send("Either the filepath or the command does not exist.");
    }
    var file = "\n\nFile created by: " + os.hostname();
    fs.appendFileSync('/fortunes/fortune.txt', file);
    return res.send(response + "File saved under '/fortunes'.");
  })
});

app.get('/file', (req, res) => {
  exec("cat /fortunes/fortune.txt", (err, stdout, stderr) => {
    var response = os.hostname() + " responded: \n\n";
    if(err) {
      return res.send("The file does not exist.");
    }
    return res.send(response + stdout);
  })
});

app.listen(8080, () => {
  console.log("Server started.");
  
});
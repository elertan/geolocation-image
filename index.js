const jimp = require("jimp");
const axios = require("axios");
const express = require('express');
const app = express();
const port = 80;
const fs = require("fs");

jimp.read(__dirname + "/image.jpg").then((image) => {
    jimp.loadFont(jimp.FONT_SANS_64_WHITE).then(font => {
        app.get('/', (req, res) => {
            const ip = "89.99.76.69" //;req.ip;

            axios.get(`http://ip-api.com/json/${ip}`).then(response => {
                const data = response.data;
                let caption = "U are hidden :o";
                if (data.status !== "fail") {
                    caption = `${data.city}, ${data.country}`;
                }
        
                const filename = `${ip}.jpg`;

                image.print(font, 100, 230, caption).writeAsync(filename).then(() => {
                    res.sendFile(__dirname + "/" + filename);
                    setTimeout(() => {
                        fs.unlink(__dirname + "/" + filename);
                    }, 10000);
                });
            });
        });
        
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    });
});
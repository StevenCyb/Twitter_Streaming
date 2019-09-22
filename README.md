# Twitter-Streem
This is a simple Twitter stream application based on NodeJS. The following figure shows the UI.
Via the input field (`What do you want to track?`) you can flexibly add new tags and remove them by clicking on the cross.
On the left side the live tweets are shown and on the right side a ranking of the most frequently used Hashtags.
In the future I will also add a sentiment analysis and topic extraction.
![Overview](/media/overview.png)
## How To Use It
Just download the repository and install the dependencies with `npm install`.
You also need to enter your Twitter credentials in the `config.cfg` file.
Afterwards the application can be started with `node app.js` and called via the URL `http://localhost:3000/`.
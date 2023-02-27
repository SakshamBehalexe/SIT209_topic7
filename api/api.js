const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saksham4801be21:54Z6B1uXtkvfKYhp@cluster0.m9erqgc.mongodb.net/mydb' , {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(`${__dirname}/public/generated-docs`));



const Device = require('./models/device'); 

const port = 5003;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});
app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
      return err
      ? res.send(err)
      : res.send(devices);
    });
  });
  /**
  * @api {post} /api/devices AddDevice Adds a new device and sensor data
  * @apiGroup Device
  * @apiParam {String} name The name of the device.
  * @apiParam {String} user The name of the user who owns the device.
  * @apiParam {Array} sensorData The array of sensor data for the device.
  * @apiSuccessExample {text} Success-Response:
  * successfully added device and data
  * @apiErrorExample {json} Error-Response:
  *  {
  *    "Device already exists"
  *  }
  */

app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
      name,
      user,
      sensorData
    });
    newDevice.save(err => {
      return err
        ? res.send(err)
        : res.send('successfully added device and data');
    });
  });
/**
 * @api {listen} / Listen to a port
 * @apiGroup Server
 * @apiParam {Number} port The port to listen to
 * @apiSuccessExample {string} Success-Response:
 *    "listening on port 5003"
 */


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

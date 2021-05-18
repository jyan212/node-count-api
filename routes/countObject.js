const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const ODModel = require('../model.js');
const od = new ODModel('https://counting-object-api.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json');

router.get('/', (req, res) => {
    res.send("API WORKING...")
})
router.post('/post', async (req, res) => {
    console.log(" HELLO ");
    try {
        const model = await od.getModel();
        /*
            Loading Image
        */
        // Local Image
        // const imgBuffer = fs.readFileSync('./test/test.png');
        // Requested Image, thru post api
        const imgBuffer = Buffer.from(req.body.base64, 'base64');
        const img = tf.node.decodeImage(imgBuffer);
        /*
            Preprocessing Image
        */
        const resized = tf.image.resizeBilinear(img, [640, 640]);
        const casted = resized.cast('int32');
        const expanded = casted.expandDims(0);
        const obj = await model.executeAsync(expanded);
        console.log(obj);
        /*
            Retrieving Predicted Boxes and Classes.
        */
        const boxes = await obj[0].array();
        const classes = await obj[5].array();
        const scores = await obj[6].array();

        console.log(boxes);
        const resJson = {
            boxes: boxes,
            classes: classes,
            scores: scores,
        }
        /*
            Deallocate Memories
        */
        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        res.json(resJson);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
const { model } = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');

class ODModel {
    constructor(url){
        this.modelUrl = url;
        this.model = this.loadODModel(url);
        this.isReady = false;
    }

    loadODModel = async () => {
        const modelTf = await tf.loadGraphModel(this.modelUrl);
        console.log("model ready and loaded....");
        this.isReady = true;
        return modelTf;
    }

    getModel = () => {
        return this.model;
    }

}

module.exports = ODModel;
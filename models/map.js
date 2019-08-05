
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema( {

    name: {
        type:       String,
        default:    '',
        required:   true,
    },

    url: {
        type:       String,
        default:    '',
        required:   true,
    },

    banner: {
        type:       String,
        default:    '',
    },

    date: {
        type:       String,
        default:    new Date()
    },

    author: {
        type:       String,
        default:    ''
    },

    version: {
        type:       String,
        default:    "1.0.0"
    }

})

module.exports = Maps = mongoose.model('maps', MapSchema);
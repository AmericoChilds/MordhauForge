const MapSchema = require('./models/map');

module.exports = {

    getMaps: async (req, res, next ) => {
        
        const maps = await MapSchema.find();

        return maps;
    },

    /*
    addMap: async (req, res, next ) => {
        const newMap = new MapSchema({
            name: "BezerkerArena",
            author: "Gamer",
            banner: "https://i.imgur.com/c0RctvP.jpg",
            url:    "https://i.imgur.com/c0RctvP.jpg"
        })
        await newMap.save();
    }
    */
}
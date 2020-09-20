const mongoose = require('mongoose');
Release_Dates = mongoose.model('release_date_model');
Games = mongoose.model('games_model');
Platforms = mongoose.model('platform_model');
Genres = mongoose.model('genres_model');

//DATES
exports.releases = function(req, res) {
    let query = {};

    if(req.query.from != null && req.query.to != null) {
        query["date"] = {
            $gte: req.query.from,
            $lt: req.query.to
        };
    }
    if(req.query.recentDates == true) {
        let now = new Date(Date.now());
        let nowSeconds = tools.dateToSeconds(now);
        let time = tools.dateToSeconds(now.setDate(now.getDate() - 7));
        query["dateAdded"] = {
            $gte: time,
            $lte: nowSeconds
        };
    }
    if(req.query.category != null) {
        query["category"] = { 
            $in: req.query.category
        };
    }
    if(req.query.platform != null) {
        query["platform"] = { 
            $in: req.query.platform
        };
    }
    if(req.query.region != null) {
        query["region"] = { 
            $in: req.query.region
        };
    }

    Release_Dates.find(query)
    .populate("game", "name")
    .populate("platform", "name")
    .sort(req.query.sort != null ? req.query.sort : "date")
    .exec(function(err, dates) {
        if(err || dates == null) {
            res.send("Error");
        } else {
            res.json(dates);
        }
    }); 
};



//GAMES
exports.getGames = function(req, res) {
    let query = {};

    if(req.query.minrating != null && req.query.maxrating != null) {
        query["aggregated_rating"] = {
            $gte: req.query.minrating,
            $lte: req.query.maxrating
        };
    }
    if(req.query.category != null) {
        query["category"] = { 
            $in: req.query.category
        };
    }
    if(req.query.genres != null) {
        query["genres"] = { 
            $in: req.query.genres
        };
    }
    if(req.query.name != null) {
        query["name"] = { 
            $regex: req.query.name,
            $options: "i"
        };
    }
    if(req.query.platforms != null) {
        query["platforms"] = { 
            $in: req.query.platforms
        };
    }
    if(req.query.mintobeat != null && req.query.maxtobeat != null) {
        query["time_to_beat"] = {
            $gte: req.query.minrating,
            $lte: req.query.maxrating
        };
    }
    
    Games.find(query)
    .populate("release_dates")
    .populate("platforms", "name")
    .sort(req.query.sort != null ? req.query.sort : "name")
    .exec(function(err, games) {
        if(err || games == null) {
            res.send("Error");
        } else {
            res.json(games);
        }
    }); 
};
exports.getGame = function(req, res) {
    Games.findById(req.params.id)
    .populate("release_dates")
    .populate("platforms", "name")
    .exec(function(err, game) {
        if(err || game == null) {
            res.send("Error");
        } else {
            res.json(game);
        }
    }); 
};

//OTHER
exports.getPlatforms = function(req, res) {
    Platforms.find({id: {$in: req.query.platforms}})
    .exec(function(err, platforms) {
        if(err || platforms == null) {
            res.send("Error");
        } else {
            res.json(platforms);
        }
    }); 
};
exports.getGenres = function(req, res) {
    Genres.find({id: {$in: req.query.genres}})
    .exec(function(err, genres) {
        if(err || genres == null) {
            res.send("Error");
        } else {
            res.json(genres);
        }
    }); 
};
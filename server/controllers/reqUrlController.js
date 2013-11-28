var url = require('url');

var controller = {
    readQuery: function(req) {
        var queryObj = url.parse(req.url, true).query
        return queryObj
    },
    readPath: function(req) {
        var pathname = url.parse(req.url).pathname
        return pathname
    }

}

exports.readQuery = controller.readQuery;
exports.readPath = controller.readPath;
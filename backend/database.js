let sqlite3 = require('sqlite3').verbose();
module.exports = function(dbUrl) {
	return new sqlite3.Database(dbUrl);
};
const path = require('path');
module.exports = {
	client: 'sqlite3',
	connection: {
		filename: './cj-expenses.sqlite',
	},
	useNullAsDefault: true,
	migrations: {
		directory: path.join(__dirname, '/migrations'),
	},
	seeds: {
		directory: path.join(__dirname, '/seeds'),
	},
};

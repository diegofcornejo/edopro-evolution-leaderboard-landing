module.exports = {
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": process.env.POSTGRES_USER,
	"password": process.env.POSTGRES_PASSWORD,
	"database": process.env.POSTGRES_DB,
	"synchronize": false,
	"logging": false,
	"entities": [
		"./libs/db/postgres/entities/**/*.js"
	]
}
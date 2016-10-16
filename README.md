# crawl-result
Craw Result Data

# Requirement
* Postgresql
* Nodejs v4 or above

# How to run?

## Install node modules
	
	npm i

## Config database
Change file	`src/config/postgres/index.js`
	
```javascript
const dbConfig = {
	host: '<host>',
	user: '<your user connect to postgres>',
	password: '<your password to connect to postgres>',
	database: 'xs_db'
}
```

Before run must be insert default data into database:

	npm run migrate

## Crawl result from 10/16/2002 - current
	
	npm run manual

## Run schedule crawl

	npm run start

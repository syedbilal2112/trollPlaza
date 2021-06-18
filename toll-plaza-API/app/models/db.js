
'use strict';

const mongoose = require('mongoose');
const Config = require('../../utils/constant');

async function dbInit() {
    try {
        let db = mongoose.connection;
        mongoose.connect(`mongodb://${Config.mongodb.host}:${Config.mongodb.port}/${Config.mongodb.db}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        var flag = 0
        var timer;
        timer = setInterval(() => {
            if (flag == 0) {
                console.log("connecting to database")
                mongoose.connect(`mongodb://${Config.mongodb.host}:${Config.mongodb.port}/${Config.mongodb.db}`, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                });
            }
        }, 6000);
        db.on('open', async function () {
            flag = 1;
            console.log('Database is connected...');
        });

        db.on('error', function (err) {
            console.log(err);
            console.log('Database connection error ...');
        });
    } catch (err) {
        console.log(err);
    }
}

exports.dbInit = dbInit;
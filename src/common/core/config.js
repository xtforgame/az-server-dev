/* eslint-disable import/no-dynamic-require */
const envName = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
const config = require(`../configs/${envName}`);
module.exports = config;

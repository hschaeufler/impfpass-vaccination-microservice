const env = require('dotenv');
env.config({ path: process.env.KAKFA_CONFIG_PATH || '../conf/memcached.env' });


const MEMCACHED_CONFIG = {
    updateInterval: process.env.MEMCACHED_UPDATEINTERVAL || 10,
    hostname : process.env.MEMCACHED_HOSTNAME || "my-memcached-service",
    port: process.env.MEMCACHED_PORT  || 11211,
    lifetimes : {
        lifetimeVaccination : process.env.MEMCACHED_LIFTIME_VACCINATION || 100,
        lifetimeVacLIST : process.env.MEMCACHED_LIFETIME_VACLIST || 10,
    }
}

module.exports = MEMCACHED_CONFIG;
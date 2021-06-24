const os = require('os')
const dns = require('dns').promises
const MemcachePlus = require('memcache-plus');
const MEMCACHED_CONFIG = require("../config/memcachedconfig");
//Base Copied from Prof. Dr.-Ing. habil. Dennis Pfisterer

//Connect to the memcached instances
let memcached = null
let memcachedServers = []

const LIFETIMES = MEMCACHED_CONFIG.lifetimes;

async function getMemcachedServersFromDns() {
    try {
        // Query all IP addresses for this hostname
        let queryResult = await dns.lookup(MEMCACHED_CONFIG.hostname, { all: true })

        // Create IP:Port mappings
        let servers = queryResult.map(el => el.address + ":" + MEMCACHED_CONFIG.port)

        // Check if the list of servers has changed
        // and only create a new object if the server list has changed
        if (memcachedServers.sort().toString() !== servers.sort().toString()) {
            console.log("Updated memcached server list to ", servers)
            memcachedServers = servers

            //Disconnect an existing client
            if (memcached)
                await memcached.disconnect()

            memcached = new MemcachePlus(memcachedServers);
        }
    } catch (e) {
        console.log("Unable to get memcache servers", e)
    }
}

//Initially try to connect to the memcached servers, then each 5s update the list
getMemcachedServersFromDns()
setInterval(() => getMemcachedServersFromDns(), MEMCACHED_CONFIG.updateInterval)

//Get data from cache if a cache exists yet
async function getFromCache(key) {
    if (!memcached) {
        console.log(`No memcached instance available, memcachedServers = ${memcachedServers}`)
        return null;
    }
    const cacheValue = await memcached.get(key);
    if(cacheValue){
        console.debug(`Cache hit for key ${key}`);
    }
    return cacheValue
}

async function store(key, value, lifetime) {
    if (!memcached) {
        console.log(`No memcached instance available, memcachedServers = ${memcachedServers}`)
        return null;
    }
    return await memcached.set(key, value, lifetime);
}

async function addToCache(key, value, lifetime) {
    if (!memcached) {
        console.log(`No memcached instance available, memcachedServers = ${memcachedServers}`)
        return null;
    }
    return await memcached.add(key, value, lifetime);
}


module.exports = {getFromCache, store, addToCache, LIFETIMES}
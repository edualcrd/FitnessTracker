import dns from 'dns';
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    dns.resolveSrv('_mongodb._tcp.fittracker.henznli.mongodb.net', (err, addresses) => {
        console.log('Error:', err);
        console.log('Addresses:', addresses);
    });
} catch (e) {
    console.log(e);
}

export const oauthKickConfig = {
    config: {
        clientId: '01K66C6X67PYPWG9PGBKCWV17K',
        clientSecret: 'f4f9d96778b5df79ebb3befe0851e249c66a257d855f264435ac7d52136d0a33', //not used for public clients
        authorizePath: 'https://id.kick.com/oauth/authorize',
        tokenPath: 'http://localhost:4200/token/kick',
        scope: 'events:subscribe',
        pkce: true
    },
}

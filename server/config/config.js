module.exports = {
    url: process.env.URL || process.env.OPENSHIFT_NODEJS_IP + ':' + process.env.OPENSHIFT_NODEJS_PORT || 'http://localhost:8080',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    database: process.env.OPENSHIFT_MONGODB_DB_URL + '/' + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost:27017/our-wedding-heroes',
    secret: process.env.SECRET || 'ilovetheideaofmywedding',
    siteTitle: process.env.SITE_TITLE || 'Our Wedding',
    paypalMeUsername: process.env.PAYPAL_ME_USERNAME,
    mail: {
        from: process.env.EMAIL_FROM,
        signature: process.env.EMAIL_SIGNATURE,
        options: {
            service: process.env.EMAIL_SERVICE, // https://www.npmjs.com/package/nodemailer#using-well-known-services
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        },
    },
};

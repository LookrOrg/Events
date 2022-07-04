const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require('../EventsCredentialFirebase.json');
initializeApp({
    credential: cert(serviceAccount),
   storageBucket: 'lookr-cf307.appspot.com'
});

const bucket = getStorage().bucket();

module.exports = bucket;
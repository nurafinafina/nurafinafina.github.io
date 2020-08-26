var webPush = require('web-push');
 
const vapidKeys = {
      "publicKey":"BGT8RM38Z555b8-NZSyfQOaZK-ydz9toT9jQ-9k1gjL_XSVJize7J7v1H8qPTPgO4h2C98g7ZjvZokp8nbCpq9E",
      "privateKey":"Q70_PJHStjmW77l5RbYIiNKyP9Ga311V2usgq9VV_GY"
   };
 
 
webPush.setVapidDetails(
   'mailto:finanurafina96@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cL1-zrk_O8g:APA91bFCVcNZDCU1-ICBTYEDrEJqrfJ9hH3AwS5ZlNqMDp4Ap4D1sYmqk-seqPrIvKyqt-CfG2Ij1fJfrbs1Ps18PEZWiEmaDa979A-7RUDqCDTuP1zGPdo9E3xkFQcsB2IUV0BZT314",
   "keys": {
       "p256dh": "BMkyVn4D15Ip5DKU4Hb4m1QynUComw4CiFYISvIoa6cFeej0Gb6KFSh2R39QM3fMQfHCGTIREGhTBfGUHJoSiFU=",
       "auth": "Owdccz1pAtrwo/a7cKoUFQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: 'AIzaSyA0Wsr619Kjf5CV7xQ5DjDlNgJcIo1Hl0g',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
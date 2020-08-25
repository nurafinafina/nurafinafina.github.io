var webPush = require('web-push');
 
const vapidKeys = {
      "publicKey":"BGT8RM38Z555b8-NZSyfQOaZK-ydz9toT9jQ-9k1gjL_XSVJize7J7v1H8qPTPgO4h2C98g7ZjvZokp8nbCpq9E",
      "privateKey":"Q70_PJHStjmW77l5RbYIiNKyP9Ga311V2usgq9VV_GY"
   },
 
 
webPush.setVapidDetails(
   'mailto:finanurafina96@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d9o0JRhOyxY:APA91bEm3LitKgfNcOxZWx8cJ1qPChJc7hap4nICHMYgrPEQjWkNgt01pywWDxmT_Jwqd3ko_zzGQcsRpSA4GdSfY-LG0ZqgikFSHd946ej_ba7k6qLDneO5HRR1H1osA9s1V63NSc6v",
   "keys": {
       "p256dh": "BG9mpRVbnB5RqOYXypiGbUCI7VwXG/szdKupiT2f0SoBooMMCxK/ZD0vU+C5V+hq81I8U2k98TX3gvDaNI+uK9U=",
       "auth": "1M5W7R+t76E4RndFFtnXwg=="
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
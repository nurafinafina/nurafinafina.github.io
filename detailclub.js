import api from '/js/api.js';
import db from '/js/db.js';

document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get("id"));
    let isFav = false
    let storeNameTeam = 'fav_team'
    db.getTeamByID(storeNameTeam, id).then(()=> {
        
        document.getElementById("favoriteteam").innerHTML = "favorite"
        db.getSavedDataFavByID("team")
        isFav = true
    }).catch(() => {
        document.getElementById("favoriteteam").innerHTML = "favorite_border"
        api.getDetailTeam(id)
        isFav = false
    })

    let btnFav = document.getElementById("favoriteteam");

    btnFav.onclick = () => {
        console.log("Tombol fav diklik");
        if(isFav) {
            db.getTeamDeleteFav(id, storeNameTeam);
            isFav = false
        } else {
            let item = api.getDetailTeam();
            item.then((team) => {
                db.addTeamFav(storeNameTeam, team);
            });
            isFav = true
        };
    };
});

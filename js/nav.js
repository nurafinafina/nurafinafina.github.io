import page from '/js/page.js';

let pages = window.location.hash.substr(1);
if (pages === "") pages = "home";
page.loadPage(pages);

const loadNav = () => {
    const elms = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elms);
    fetch('./nav.html')
      .then(response => {
          if (response.status == 200) {
              return Promise.resolve(response);
          } else{
              console.log('Error: '+ response.statusText)
              return Promise.reject(new Error(response.statusText));
          }
      })
      .then(response => response.text())
      .then(response => {
            let doc = document.querySelectorAll(".topnav, .sidenav")
              doc.forEach(elms => {
                  elms.innerHTML = response;
              })

              const reg = document.querySelectorAll(".sidenav a, .topnav a")
              reg.forEach(elms => {
                  elms.addEventListener("click", event => {
                      const sidenav = document.querySelector(".sidenav");
                      M.Sidenav.getInstance(sidenav).close();
                      pages = event.target.getAttribute("href").substr(1);
                      page.loadPage(pages);
                      console.log(page);
                  });
              });
          })
    .catch(error => {
        console.log('error : '+ error);
    })
}   

export default {
    loadNav
};
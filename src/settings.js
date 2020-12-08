const closeBtn = document.getElementById('settings-close-btn');
const confirmBtn = document.getElementById('settings-confirm-btn');

closeBtn.addEventListener('click', () => {
    let window = require('electron').remote.getCurrentWindow();
    window.close();
});

confirmBtn.addEventListener('click', () => {

});
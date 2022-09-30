function saveOptions(e) {
    browser.storage.sync.set({
      colour: document.querySelector("#colour").value
    });
    e.preventDefault();
  }
  
  function restoreOptions() {
    try{
        // console.info(browser.storage.managed);
        // var storageItem = browser.storage.managed.get('colour');
        // storageItem.then((res) => {
        //     console.info(res);
        //     document.querySelector("#managed-colour").innerText = res.colour;
        // }).catch(err => console.error(err));
        
        var gettingItem = browser.storage.sync.get('colour');
        gettingItem.then((res) => {
            document.querySelector("#colour").value = res.colour || 'Firefox red';
        }).catch(err => console.error(err));
    } catch(ex) {
        console.error(ex);
    }
  }
  
document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
//   console.log('helle1');
"use strict";
const openLabelledId = "open-labelled";
if (typeof browser === "undefined") {
  var browser = chrome;
}

browser.menus.create({
  id: openLabelledId,
  title: "Alt-Text",
  contexts: ["image"]
});
browser.menus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab.id, {
    name: "getClickedEl",
    targetElementId: info.targetElementId
  },
    { frameId: info.frameId }, data => {
      // console.log(`${data.value}`);
      // elt.value = data.value;
    });
  // popupParameters = {
  //   tabId: tab.id,
  //   frameId: info.frameId,
  //   targetElementId: info.targetElementId,
  // };
  // console.log('onClicked');
  // // console.log(info.linkText);
  // console.log(info);
  // let targetElementId = info.targetElementId;
  // console.log(targetElementId);
  // let elem = browser.menus.getTargetElement(targetElementId);
  // console.log(elem);

  // let huii = browser.tabs.executeScript(tab.id, {
  //   frameId: info.frameId,
  //   code: `browser.menus.getTargetElement(${info.targetElementId});`,
  // });
  // console.log(huii);
  // if (info.menuItemId === openLabelledId) {
  //   browser.tabs.update(tab.id, {
  //     url: info.linkUrl
  //   });
  // }
});

function updateMenuItem() { //linkHostname, alt) {
  browser.menus.update(openLabelledId, {
    title: `Show alt text`,
    visible: true
  });
  browser.menus.refresh();
}
function updateMenuItem2() { //linkHostname, alt) {
  browser.menus.update(openLabelledId, {
    visible: true
  });

  // let removing = browser.menus.remove(openLabelledId);
  // removing.then(() => console.log('removed'), () => console.log('errrrr'));
  browser.menus.refresh();
}
browser.menus.onShown.addListener(info => {
  // console.log('onShown');
  if (info.mediaType != 'image') {
    return;
  }
  var gettingItem = browser.storage.sync.get('colour');
  gettingItem.then((res) => {
    const matchTest = document.URL.match('jw.org');
    // console.log(matchTest);
    if (matchTest != null) {
      updateMenuItem();
    } else {
      updateMenuItem2();
    }
  }).catch(err => console.error(err));
  // console.log(info.linkUrl);
  // let linkElement = document.createElement("a");
  // linkElement.href = info.linkUrl;
  // updateMenuItem(); //linkElement.hostname, info.alt);
});
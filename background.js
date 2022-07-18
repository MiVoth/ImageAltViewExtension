"use strict";
const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Alt-Text",
  contexts: ["image"]
});
var popupParameters;

browser.menus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab.id, { name: "getClickedEl", targetElementId: info.targetElementId },
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
browser.runtime.onMessage.addListener(async (msg) => {
  if (msg === "getPopupParameters") {
    return popupParameters;
  }
});

function updateMenuItem(linkHostname, alt) {
  browser.menus.update(openLabelledId, {
    title: `Show alt text`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  console.log('onShown');
  if (info.mediaType != 'image') {
    return;
  }
  console.log(info);
  let linkElement = document.createElement("a");
  linkElement.href = info.linkUrl;
  updateMenuItem(linkElement.hostname, info.alt);
});
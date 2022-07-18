"use strict";
const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Alt-Text",
  contexts: ["image"]
});
var popupParameters;

browser.menus.onClicked.addListener((info, tab) => {
  popupParameters = {
    tabId: tab.id,
    frameId: info.frameId,
    targetElementId: info.targetElementId,
  };
  // console.log('onClicked');
  // console.log(info.linkText);
  // console.log(info);
  let targetElementId = info.targetElementId;
  console.log(targetElementId);
  let elem = browser.menus.getTargetElement(targetElementId);
  console.log(elem);
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
  // console.log('updateMenuItem');
  browser.menus.update(openLabelledId, {
    title: `Open (${linkHostname}, ${alt})`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  console.log('onShown');
  console.log(info);
  // if (!info.linkUrl) {
  //   return;
  // }
  let linkElement = document.createElement("a");
  linkElement.href = info.linkUrl;
  updateMenuItem(linkElement.hostname, info.alt);
});
/*
Just draw a border round the document.body.
*/
// document.body.style.border = "5px solid red";
// console.log('hier_');
// document.querySelectorAll('img[alt]').forEach(
//     img => {
//         img.addEventListener('mouseover', e => {
//             console.log(img.alt);
//         })
//     }
// )

browser.runtime.onConnect.addListener(port => {
    if (port.name !== "portFromPopup") return;
    let targetElements;
  
    port.onMessage.addListener(msg => {
      if (msg.action === "getElementDescriptions") {
        let elem = browser.menus.getTargetElement(msg.targetElementId);
        setTargetElement(elem);
      } 
    });
    port.onDisconnect.addListener(() => {
      // Clean up when the port is disconnected (e.g. popup was closed).
      removeHighlights();
    });
  
    function setTargetElement(elem) {
      targetElements = [];
      while (elem) {
        targetElements.unshift(elem);
        elem = elem.parentElement;
      }
  
      // Reply with some description of the elements, so that the available
      // elements can be shown in the popup's UI.
      let descriptions = targetElements.map(elem => {
        // For example, take the first 100 characters of the HTML element.
        return elem.cloneNode().outerHTML.slice(0, 100);
      });
      port.postMessage({
        action: "elementDescriptions",
        descriptions,
      });
    }
  });
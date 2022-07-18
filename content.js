
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.name == "getClickedEl") {
    // console.log('bin da');
    // console.log(request);
    // console.log(sender);
    let targ = browser.menus.getTargetElement(request.targetElementId);
    // console.log(targ);
    sendResponse({ value: targ.alt });
    const elm = document.createElement('div');
    elm.style['position'] = 'absolute';
    elm.style['offsetTop'] = targ.offsetTop;
    elm.style['offsetLeft'] = targ.offsetTop;
    elm.style['width'] = `${targ.width}px`;
    elm.style['background-color'] = 'white';
    elm.style['border'] = 'black solid thin';
    elm.style['padding'] = '.5rem 0.75rem';
    const text = document.createElement('span');
    text.innerHTML = `${targ.alt}`;

    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = '&#10006;';
    link.style['padding'] = '0.25rem 0.75rem';
    link.style['border'] = 'black solid thin';
    link.style['float'] = 'right';
    link.onclick = e => {
      e.preventDefault();
      elm.remove();
    }
    elm.appendChild(link);
    elm.appendChild(text);

    targ.parentElement.insertBefore(elm, targ);

    // targ.parentElement.appendChild(elm);
  }
});


// browser.runtime.onConnect.addListener(port => {
//   if (port.name !== "portFromPopup") return;
//   let targetElements;

//   port.onMessage.addListener(msg => {
//     if (msg.action === "getElementDescriptions") {
//       let elem = browser.menus.getTargetElement(msg.targetElementId);
//       setTargetElement(elem);
//     }
//   });
//   port.onDisconnect.addListener(() => {
//     // Clean up when the port is disconnected (e.g. popup was closed).
//     removeHighlights();
//   });

//   function setTargetElement(elem) {
//     targetElements = [];
//     while (elem) {
//       targetElements.unshift(elem);
//       elem = elem.parentElement;
//     }

//     // Reply with some description of the elements, so that the available
//     // elements can be shown in the popup's UI.
//     let descriptions = targetElements.map(elem => {
//       // For example, take the first 100 characters of the HTML element.
//       return elem.cloneNode().outerHTML.slice(0, 100);
//     });
//     port.postMessage({
//       action: "elementDescriptions",
//       descriptions,
//     });
//   }
// });
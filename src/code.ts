// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

const findInstance = () => {
  const searchResultNodes = figma.currentPage.findAll((n) => {
    if (n.name == "ListItem") return true;
  });
  console.log(searchResultNodes);
  const componentNode = searchResultNodes[0];
  if (componentNode.type == "COMPONENT") {
    const instance = componentNode.createInstance();
    figma.currentPage.appendChild(instance);
    return instance.children.filter((n) => n.type == "TEXT")[0];
  }
};

const instance = findInstance();

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "create-rectangles") {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === "search") {
    // const nodes: SceneNode[] = [];
    const searchResultNodes = figma.currentPage.findAll((n) => {
      if (n.type === "TEXT") return n.characters.includes(msg.query);
    });
    console.log("Search", searchResultNodes, msg.query);
    // figma.currentPage.selection = searchResultNodes;
    figma.viewport.scrollAndZoomIntoView(searchResultNodes);
  }

  if (msg.type === "type") {
    // const nodes: SceneNode[] = [];

    console.log(instance);
    if (instance.type === "TEXT") {
      figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
        instance.characters = msg.query;
      });
    }
    // figma.currentPage.selection = searchResultNodes;
    // figma.viewport.scrollAndZoomIntoView(searchResultNodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import Item from "../bricks/item.js";

//@@viewOn:constants

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const { data: systemData } = useSystemData();
    const {
      uuAppBusinessModelUri,
      uuAppApplicationModelUri,
      uuAppBusinessRequestsUri,
      uuAppUserGuideUri,
      uuAppWebKitUri,
    } = systemData?.relatedObjectsMap || {};
    const products = [];
    if (uuAppBusinessModelUri) products.push({ baseUri: uuAppBusinessModelUri });
    if (uuAppApplicationModelUri) products.push({ baseUri: uuAppApplicationModelUri });
    if (uuAppBusinessRequestsUri) products.push({ baseUri: uuAppBusinessRequestsUri });
    if (uuAppUserGuideUri) products.push({ baseUri: uuAppUserGuideUri });
    if (uuAppWebKitUri) products.push({ baseUri: uuAppWebKitUri });

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    const [route, setRoute] = useRoute();

    console.log(props);

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        {/* <div>
          <Uu5Elements.Button icon="uugds-delete" colorScheme="red">
            Delete
          </Uu5Elements.Button>
          <Uu5Elements.Button icon="uugdsstencil-uiaction-archive" colorScheme="blue">
            Archive
          </Uu5Elements.Button>
          <Uu5Elements.Button icon="uugds-plus-circle" colorScheme="green">
            Invite
          </Uu5Elements.Button>
        </div>

        <h1>
          {ShoppingListDetailMap.name || "Shopping List with the given ID does not exist"}{" "}
          <Uu5Elements.Button icon="uugds-pencil" colorScheme="cyan"></Uu5Elements.Button>{" "}
        </h1>
        <h2>Vlastník: {ShoppingListDetailMap.ownerName}</h2>
        <h2>Členové: {ShoppingListDetailMap.membersList}</h2>

        <div>
          <Uu5Elements.ListItem colorScheme="cyan">
            <strong>Seznam</strong>
          </Uu5Elements.ListItem>

          {itemList.map((item) => (
            <Uu5Elements.ListItem>
              <Item key={item} id={item} name={ItemsMap[item]} setItemList={setItemList} />
            </Uu5Elements.ListItem>
          ))}
        </div> */}
        <h1>{route.params.id}</h1>
        {route.params.name}
        {route.params.ownerId}
        {route.params.ownerName}
        {route.params.membersList}
        {route.params.itemList}
      </div>
    );
  },
  //@@viewOff:render
});

ShoppingListDetail = withRoute(ShoppingListDetail);

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports

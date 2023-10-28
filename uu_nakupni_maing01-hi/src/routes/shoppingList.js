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

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
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
    const ownerName = identity.name;

    const ShoppingListDetailMap = {
      name: "Můj nákupní seznam #1",
      owner: ownerName,
      membersList: [],
      itemList: ["i1", "i2", "i3", "i4"],
    };

    const ItemsMap = {
      i1: "špagety",
      i2: "sýr",
      i3: "kečup",
      i4: "máslo",
      i5: "mléko",
      i6: "vejce",
    };

    const [route, setRoute] = useRoute();
    // const shoppingListId = route.params.id;
    const [itemList, setItemList] = useState(ShoppingListDetailMap?.itemList || []);
    // const shoppingListIds = Object.keys(ShoppingListDetailMap);

    console.log(route); // Log the route parameters

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

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <div>
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
        <h2>Vlastník: {ShoppingListDetailMap.owner}</h2>
        <h2>Členové: {ShoppingListDetailMap.membersList}</h2>

        {itemList.map((item) => (
          <Item key={item} id={item} name={ItemsMap[item]} setItemList={setItemList} />
        ))}
      </div>
    );
  },
  //@@viewOff:render
});

ShoppingList = withRoute(ShoppingList);

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports

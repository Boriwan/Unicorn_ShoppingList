//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import Item from "../bricks/item.js";
import ShoppingListTile from "../bricks/shopping-list-tile.js";

//@@viewOn:constants

let ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingLists",
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

    const ShoppingListsMap = [
      {
        id: Utils.String.generateId(),
        name: "Můj nákupní seznam #1",
        ownerId: "822-5205-4105-0000",
        ownerName: "Bouris Boček",
        membersList: ["Karel Novák", "Jan Novotný"],
        itemList: ["i1", "i2", "i3", "i4"],
      },
      {
        id: Utils.String.generateId(),
        name: "Můj nákupní seznam #2",
        ownerId: "822-5205-4105-0000",
        ownerName: "Bouris Boček",
        membersList: [],
        itemList: ["i1", "i2", "i3", "i4"],
      },
    ];

    const ItemsMap = {
      i1: "špagety",
      i2: "sýr",
      i3: "kečup",
      i4: "máslo",
      i5: "mléko",
      i6: "vejce",
    };

    // const shoppingListId = route.params.id;
    const [itemList, setItemList] = useState(ShoppingListsMap?.itemList || []);
    // const shoppingListIds = Object.keys(ShoppingListDetailMap);

    const [shoppingList, setShoppingList] = useState(ShoppingListsMap);

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
      <Uu5Elements.Block header="Moje nákupní seznamy" headerType="title">
        {shoppingList.map((item) => (
          <Uu5Elements.Block>
            <ShoppingListTile key={item.id} {...item} />
          </Uu5Elements.Block>
        ))}
      </Uu5Elements.Block>
    );
  },
  //@@viewOff:render
});

ShoppingLists = withRoute(ShoppingLists);

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports

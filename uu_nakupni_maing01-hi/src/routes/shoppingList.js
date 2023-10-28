//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";

import { useState } from "uu5g05";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

// Own components
import Item from "../bricks/item.js";
import ButtonGroup from "../bricks/button-group.js";
import ListInfo from "../bricks/list-info.js";

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
      i1: "Špagety",
      i2: "Sýr",
      i3: "Kečup",
      i4: "Máslo",
      i5: "Mléko",
      i6: "Vejce",
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
        <ButtonGroup />

        <ListInfo
          name={ShoppingListDetailMap.name}
          owner={ShoppingListDetailMap.owner}
          membersList={ShoppingListDetailMap.membersList}
        />

        <div>
          <Uu5Elements.ListItem
            actionList={[{ icon: "uugds-plus", children: "Přidat", primary: true, colorScheme: "light-green" }]}
            colorScheme="cyan"
          >
            <div>
              <Uu5Elements.Button icon="uugds-filter" colorScheme="dark-blue" />
              <strong> Seznam věcí</strong>
            </div>
          </Uu5Elements.ListItem>

          {itemList.map((item) => (
            <Uu5Elements.ListItem>
              <Item key={item} id={item} name={ItemsMap[item]} setItemList={setItemList} />
  
            </Uu5Elements.ListItem>
          ))}
        </div>
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

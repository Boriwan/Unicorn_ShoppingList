//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useElementSize, useRoute, useScreenSize } from "uu5g05";

import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";

import Config from "./config/config.js";
import Item from "../bricks/item.js";
import RouteBar from "../core/route-bar.js";
import ButtonGroup from "../bricks/button-group.js";
import shoppingListData from "../data/shoppingLists.json";

//@@viewOn:constants

const Css = {
  detail: () =>
    Config.Css.css({
      padding: "1em",
    }),
  detailOrder: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }),
};

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

    const itemListParam = route.params.itemList;
    const itemListArray = itemListParam ? itemListParam.split(",") : [];

    const [itemList, setItemList] = useState(itemListArray);




    console.log(itemList);
    const [newItem, setNewItem] = useState("");

    const handleInputChange = (event) => {
      setNewItem(event.target.value);
    };

    const addItem = () => {
      if (typeof newItem === "string" && newItem.trim() !== "") {
        const trimmedItem = newItem.trim();
        const updatedItemList = [...itemList, trimmedItem];
        setItemList(updatedItemList);

        const updatedShoppingListData = shoppingListData.map((list) => {
          if (list.id === route.params.id) {
            const updatedItemList = [...list.itemList, trimmedItem];
            return { ...list, itemList: updatedItemList };
          }
          return list;
        });

        localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));

        setNewItem("");
      }
    };

    const handleItemDelete = (itemName) => {
      const updatedItemList = itemList.filter((item) => item !== itemName);
      setItemList(updatedItemList);

      const updatedShoppingListData = shoppingListData.map((list) => {
        if (list.id === route.params.id) {
          const updatedItemList = list.itemList.filter((item) => item !== itemName);
          return { ...list, itemList: updatedItemList };
        }
        return list;
      });

      localStorage.setItem("shoppingListData", JSON.stringify(updatedShoppingListData));
    };

    const items = itemList.map((item) => (
      <Uu5Elements.ListItem key={item}>
        <Item name={item} setItemList={setItemList} onItemDelete={handleItemDelete} />
      </Uu5Elements.ListItem>
    ));

    console.log(route.params.membersList);
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.detail());
    return (
      <div>
        <RouteBar />
        <div {...attrs}>
          <div className={Css.detailOrder()}>
            <div>
              <h1>
                {route.params.name || "Shopping List with the given ID does not exist"}{" "}
                <Uu5Elements.Button icon="uugds-pencil" colorScheme="cyan"></Uu5Elements.Button>{" "}
              </h1>
              <h2>Vlastník: {route.params.ownerName}</h2>
              <h2>Členové: {route.params.membersList}</h2>
            </div>
            <ButtonGroup />
          </div>

          <div>
            <Uu5Elements.ListItem header="Seznam" headerType="title" colorScheme="cyan">
              <strong>Seznam</strong>
            </Uu5Elements.ListItem>
            {items}
            <Uu5Elements.ListItem>
              <Uu5Elements.Input placeholder="Zadejte další předmět" value={newItem} onChange={handleInputChange} />
              <Uu5Elements.Button iconRight="uugds-plus" colorScheme="green" onClick={addItem}>
                Přidat
              </Uu5Elements.Button>
            </Uu5Elements.ListItem>
          </div>
        </div>
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

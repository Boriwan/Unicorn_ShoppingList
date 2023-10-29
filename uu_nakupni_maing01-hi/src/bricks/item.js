//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { left, children } = props;
    //@@viewOff:private
    const { icon, value: propValue = false, colorScheme, onClick, significance } = props;
    const [value, setValue] = useState(propValue);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button
          icon="mdi-close"
          colorScheme="negative"
          onClick={() =>
            props.setItemList((currentList) => {
              const index = currentList.indexOf(props.id);
              if (index !== -1) {
                // Check if the item exists in the list before removing it
                const updatedList = [...currentList]; // Create a copy of the list
                updatedList.splice(index, 1); // Remove the item
                return updatedList; // Return the updated list
              }
              return currentList; // Item not found, return the original list
            })
          }
        ></Uu5Elements.Button>
        {props.name}
        <Uu5Forms.Checkbox.Input
          {...props}
          colorScheme={colorScheme || (value ? "primary" : undefined)}
          significance={significance === "highlighted" && value ? significance : "common"}
          icon={value ? icon : undefined}
          onClick={(e) => {
            typeof onClick === "function" && onClick(e);
            setValue((v) => !v);
          }}
        />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports

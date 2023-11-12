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
const Css = {
  check: () =>
    Config.Css.css({
      marginTop: 32,
      marginLeft: 20,
    }),
  deleteButton: () =>
    Config.Css.css({
      marginRight: 20,
    }),
};
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
    const handleDelete = () => {
      // Call the parent component's onItemDelete function
      props.onItemDelete(props.name);
    };
    //@@viewOff:private

    //@@viewOn:interface

    let checked = false;

    const renderButton = props.isArchived === "false" && (
      <Uu5Elements.Button  className={Css.deleteButton()} icon="mdi-close" colorScheme="negative" onClick={handleDelete}></Uu5Elements.Button>
    );
    const renderCheckBox = props.isArchived === "false" && (
      <Uu5Forms.Checkbox.Input icon={checked ? "uugds-check" : undefined} className={Css.check()} disabled={!props.id} />
    );

    //@@viewOn:render
    return (
      <div>
        {renderButton}
        {props.name}
        {renderCheckBox}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports

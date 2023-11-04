//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  button: () =>
    Config.Css.css({
      margin: "1rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ButtonGroup = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ButtonGroup",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.button());

    return (
      <div {...attrs}>
        <Uu5Elements.Button className={Css.button()} disabled iconRight="uugds-delete" colorScheme="red">
          Smazat
        </Uu5Elements.Button>
        <Uu5Elements.Button
          className={Css.button()}
          disabled
          iconRight="uugdsstencil-uiaction-archive"
          colorScheme="blue"
        >
          Archivovat
        </Uu5Elements.Button>
        <Uu5Elements.Button className={Css.button()} iconRight="uugds-plus-circle" colorScheme="green">
          Pozvat člena
        </Uu5Elements.Button>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ButtonGroup };
export default ButtonGroup;
//@@viewOff:exports

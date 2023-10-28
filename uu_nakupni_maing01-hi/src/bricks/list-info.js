//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import { useState } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListInfo",
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

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <h1>
          {props.name || "Shopping List with the given ID does not exist"}{" "}
          <Uu5Elements.Button icon="uugds-pencil" colorScheme="cyan"></Uu5Elements.Button>{" "}
        </h1>
        <h2>Vlastník: {props.owner}</h2>
        <h2>Členové: {props.membersList}</h2>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListInfo };
export default ListInfo;
//@@viewOff:exports

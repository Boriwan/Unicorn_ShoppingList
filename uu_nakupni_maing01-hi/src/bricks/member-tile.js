//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const MemberTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
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

    const removeMember = () => {
      props.onRemoveMember(props.id);
    };

    return (
      <div>
        <Uu5Elements.Button
          icon="mdi-close"
          colorScheme="red"
          onClick={removeMember} 
        ></Uu5Elements.Button>
        {props.name}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberTile };
export default MemberTile;
//@@viewOff:exports

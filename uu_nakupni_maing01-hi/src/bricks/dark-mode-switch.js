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

const DarkModeSwitch = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DarkModeSwitch",
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

    const [value, setValue] = useState(props.value ?? false);

    return (
      <div {...attrs}>
        <Uu5Elements.Toggle value={value} onChange={(e) => setValue(e.data.value)} {...props} />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DarkModeSwitch };
export default DarkModeSwitch;
//@@viewOff:exports

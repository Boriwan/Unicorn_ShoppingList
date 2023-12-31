//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import ShoppingLists from "./shoppingLists.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { mode } = props;

    // useEffect(() => {
    //   // Update background color based on mode
    //   const backgroundColor = mode === "light" ? "white" : "black";
    //   document.body.style.backgroundColor = backgroundColor;

    //   return () => {
    //     // Clean up the side effect when the component unmounts
    //     document.body.style.backgroundColor = "";
    //   };
    // }, );
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <>
        <RouteBar />
        <div {...attrs}>
          <ShoppingLists />
        </div>
      </>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports

import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },

  listShoppingLists(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("listShoppingLists", baseUri);
    return Calls.call("get", commandUri, dtoIn);
  },

  getShoppingList(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("getShoppingList", baseUri);
    return Calls.call("get", commandUri, dtoIn);
  },

  createShoppingList(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("createShoppingList", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  updateShoppingList(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("updateShoppingList", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  addItem(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("addItem", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  removeItem(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("removeItem", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  addMember(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("addMember", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  removeMember(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("removeMember", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  archiveShoppingList(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("archiveShoppingList", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteShoppingList(dtoIn, baseUri) {
    const commandUri = Calls.getCommandUri("deleteShoppingList", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },
};

export default Calls;

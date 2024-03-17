import EventEmitter from "events";

export type SidebarType = {
  open: boolean;
};
export default class SidebarEmmiter extends EventEmitter {
  constructor() {
    super();
  }

  sidebarEvent(open: boolean) {
    this.emit("sidebar-event", open);
  }
}

import EventEmitter from "events";

export type SidebarType = {
  open: boolean;
  exist: boolean;
};
export default class SidebarEmmiter extends EventEmitter {
  constructor() {
    super();
  }

  sidebarEvent(open: boolean) {
    this.emit("sidebar-event", open);
  }

  sidebarExist(exist: boolean) {
    this.emit("sidebar-exist", exist);
  }
}

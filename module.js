import { EventEmitter } from "events";

export class Logger extends EventEmitter {
  logz(msg) {
    console.log(msg);
    this.emit("msgLogged", { id: 1, name: "REX" });
  }
}

import compose from "compose-function";
import { withRouter } from "./with-router";
import { withYmaps } from "./with-ymaps";
import { withStore } from "./with-store";

export const withProviders = compose(withRouter, withYmaps, withStore);

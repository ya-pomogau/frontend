import compose from "compose-function";
import { withRouter } from "./with-router";
import { withYmaps } from "./with-ymaps";

export const withProviders = compose(withRouter, withYmaps);

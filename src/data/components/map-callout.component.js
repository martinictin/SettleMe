import React from "react";

import { CompactRestaurantInfo } from "./compact-product-info.component";

export const MapCallout = ({ product }) => (
  <CompactRestaurantInfo isMap product={product} />
);

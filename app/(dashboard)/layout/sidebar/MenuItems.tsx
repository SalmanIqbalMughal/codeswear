import {
  IconBoxMultiple, IconShoppingCart, IconCircleDot, IconHome, IconEye, IconInfoCircle, IconCirclePlus, IconLayout, IconLayoutGrid, IconUpload, IconPhoto, IconPoint, IconStar, IconTable, IconUser
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/admin",
  },
  {
    id: uniqueId(),
    title: "Add Products",
    icon: IconCirclePlus,
    href: "/admin/add",
  },
  {
    id: uniqueId(),
    title: "View Products",
    icon: IconEye,
    href: "/admin/allproducts",
  },
  {
    id: uniqueId(),
    title: "Image Uploader",
    icon: IconUpload,
    href: "/admin/imageuploader",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconShoppingCart,
    href: "/admin/allorders",
  },
  // {
  //   id: uniqueId(),
  //   title: "Images",
  //   icon: IconPhoto,
  //   href: "/ui-components/images",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Pagination",
  //   icon: IconUser,
  //   href: "/ui-components/pagination",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Tables",
  //   icon: IconLayoutGrid,
  //   href: "/ui-components/table",
  // },
];

export default Menuitems;

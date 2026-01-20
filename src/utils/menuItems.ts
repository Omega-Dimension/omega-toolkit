export interface MenuItems {
    label : string;
    path? : string;
    children? : MenuItems[];

}

export const sidebarMenuItems : MenuItems[] = [
    {
        label : "Home",
        path : "/"
    }
];
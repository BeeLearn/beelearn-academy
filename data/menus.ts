type Menu = {
  icon: string;
  name: string;
  path: string;
};

export const homeMenus: Menu[] = [
  {
    icon: "i-mdi:bell",
    name: "Notifications",
    path: "/notifications",
  },
  {
    icon: "i-mdi:heart",
    name: "Favorites",
    path: "/favorites",
  },
  {
    icon: "i-mdi:medal",
    name: "LeaderBoard",
    path: "/leaderboard",
  },
];

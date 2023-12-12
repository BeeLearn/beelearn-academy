type CourseTab = {
  name: "categories" | "new-in" | "in-progress" | "completed",
  icon: string,
  activeIcon: string,
}

export default [
  {
    name: "categories",
    icon: "i-material-symbols:category-outline",
    activeIcon: "i-material-symbols:category",
    isDefault: true,
  },
  {
    name: "new-in",
    icon: "i-material-symbols:fiber-new-outline",
    activeIcon: "i-material-symbols:fiber-new",
  },
  {
    name: "in-progress",
    icon: "i-tabler:progress-bolt",
    activeIcon: "i-tabler:progress-bolt",
  },
  {
    name: "completed",
    icon: "i-mdi:check-circle-outline",
    activeIcon: "i-mdi:check-circle",
  },
] as CourseTab[];

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const SidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const { t } = useTranslation();
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: `/${role}/${item.path}`,
        icon: item.icon,
        label: (
          <NavLink className="font-500 text-16" to={`/${role}/${item.path}`}>
            {t(item.name)}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: <p className="font-500 text-16">{t(item.name as string)}</p>,
        icon: item?.icon,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              icon: child?.icon,
              label: (
                <NavLink className="font-500" to={`/${role}/${child.path}`}>
                  {t(child.name)}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

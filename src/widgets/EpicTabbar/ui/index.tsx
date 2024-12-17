import { Icon28BugOutline, Icon28LifebuoyOutline, Icon28Users3Outline } from "@vkontakte/icons";
import { useActiveVkuiLocation, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { AppRoutes } from '@app/router';

export const EpicTabbar = () => {

  const router = useRouteNavigator();

  const { view: activeView } = useActiveVkuiLocation();

  return(
    <Tabbar mode="vertical">

      <TabbarItem 
        label="Диагностика"
        onClick={() => router.push(AppRoutes.default.homepage)}
        selected={activeView === "default"}
      >
        <Icon28BugOutline aria-label="diagnostic" />
      </TabbarItem>

      <TabbarItem
        label="Сообщества"
        onClick={() => router.push(AppRoutes.groups.default)}
        selected={activeView === "groups"}
      >
        <Icon28Users3Outline aria-label="groups" />
      </TabbarItem>

      <TabbarItem
        label="Помощь"
        onClick={() => router.push(AppRoutes.help.default)}
        selected={activeView === "help"}
      >
        <Icon28LifebuoyOutline aria-label="help" />
      </TabbarItem>

    </Tabbar>
  );
}
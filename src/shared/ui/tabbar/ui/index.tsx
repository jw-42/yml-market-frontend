import { Icon28HomeOutline, Icon28LifebuoyOutline, Icon28Users3Outline } from '@vkontakte/icons';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Tabbar as VKUITabbar, TabbarItem as VKUITabbarItem } from '@vkontakte/vkui';

import { VIEW } from '@app/router/model';
import { AppRoutes } from '@app/router';

export const Tabbar = () => {

  const router = useRouteNavigator();

  const { view: activeView = VIEW.DEFAULT } = useActiveVkuiLocation();

  return(
    <VKUITabbar mode="vertical">
      <VKUITabbarItem
        text="Главная"
        selected={activeView === VIEW.DEFAULT}
        onClick={() => router.push(AppRoutes.default.homepage)}
      >
        <Icon28HomeOutline/>
      </VKUITabbarItem>

      <VKUITabbarItem
        text="Сообщества"
        selected={activeView === VIEW.GROUPS}
        onClick={() => router.push(AppRoutes.groups.default)}
      >
        <Icon28Users3Outline/>
      </VKUITabbarItem>

      <VKUITabbarItem
        text="Помощь"
        selected={activeView === VIEW.HELP}
        onClick={() => router.push(AppRoutes.help.default)}
      >
        <Icon28LifebuoyOutline/>
      </VKUITabbarItem>
    </VKUITabbar>
  );
}
import {
  RoutesConfig,
  createHashRouter,
  createView,
  createPanel,
  createModal
} from '@vkontakte/vk-mini-apps-router';

import { VIEW, MODALS, DEFAULT_VIEW } from '@app/router/model';
import { GROUPS_VIEW, HELP_VIEW } from './model/panels';

export const AppRoutes = RoutesConfig.create([
  createView(VIEW.DEFAULT, [
    createPanel(DEFAULT_VIEW.HOMEPAGE, "/"),
    createPanel(DEFAULT_VIEW.DETAIL, "/detail", [
      createModal(MODALS.DETAIL, "/detail/:type", ["type"] as const)
    ])
  ]),
  createView(VIEW.GROUPS, [
    createPanel(GROUPS_VIEW.DEFAULT, "/groups")
  ]),
  createView(VIEW.HELP, [
    createPanel(HELP_VIEW.DEFAULT, "/help")
  ])
]);

export const AppRouter = createHashRouter(AppRoutes.getRoutes());
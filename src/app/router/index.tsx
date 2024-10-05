import {
  RoutesConfig,
  createHashRouter,
  createView,
  createPanel,
  createModal
} from '@vkontakte/vk-mini-apps-router';

import { VIEW, MODALS, DEFAULT_VIEW } from '@app/router/model';

export const AppRoutes = RoutesConfig.create([
  createView(VIEW.DEFAULT, [
    createPanel(DEFAULT_VIEW.HOMEPAGE, "/"),
    createPanel(DEFAULT_VIEW.DETAIL, "/detail", [
      createModal(MODALS.DETAIL, "/detail/:section", ["section"] as const)
    ])
  ]),
]);

export const AppRouter = createHashRouter(AppRoutes.getRoutes());
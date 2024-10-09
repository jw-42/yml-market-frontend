import { View, SplitLayout, SplitCol, Epic, ModalRoot } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView, usePopout, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { VIEW, DEFAULT_VIEW, GROUPS_VIEW, HELP_VIEW, MODALS } from '@app/router/model';

import { Homepage } from '@pages/homepage';
import { Detail } from '@pages/detail';
import { Communities } from '@pages/communities';
import { Help } from '@pages/help';
import { Aside } from '@pages/aside';
import { ModalsPage } from '@pages/modals';

export const App = () => {

  const popout = usePopout();
  const router = useRouteNavigator();

  const {
    view: activeView = VIEW.DEFAULT,
    modal: activeModal
  } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView || "default");

  const Modals = (
    <ModalRoot activeModal={activeModal} onClose={() => router.hideModal()}>
      <ModalsPage.DetailModal id={MODALS.DETAIL} />
    </ModalRoot>
  )

  return (
    <SplitLayout popout={popout} modal={Modals}>
      <SplitCol autoSpaced style={{ marginLeft: 0 }}>
        <Epic activeStory={activeView || VIEW.DEFAULT}>
          <View id={VIEW.DEFAULT} activePanel={activePanel || DEFAULT_VIEW.HOMEPAGE}>
            <Homepage id={DEFAULT_VIEW.HOMEPAGE} />
            <Detail id={DEFAULT_VIEW.DETAIL} />
          </View>

          <View id={VIEW.GROUPS} activePanel={activePanel || GROUPS_VIEW.DEFAULT}>
            <Communities id={GROUPS_VIEW.DEFAULT} />
          </View>

          <View id={VIEW.HELP} activePanel={activePanel || HELP_VIEW.DEFAULT}>
            <Help id={HELP_VIEW.DEFAULT} />
          </View>
        </Epic>
      </SplitCol>

      <SplitCol fixed width={345} maxWidth={345}>
        <Aside/>
      </SplitCol>
    </SplitLayout>
  );
};

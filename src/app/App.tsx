import { View, SplitLayout, SplitCol, Epic, Panel, Group, SimpleCell } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView, usePopout } from '@vkontakte/vk-mini-apps-router';

import { VIEW, DEFAULT_VIEW, GROUPS_VIEW, HELP_VIEW } from '@app/router/model';

import { Homepage } from '@pages/homepage';
import { Detail } from '@pages/detail';
import { Communities } from '@pages/communities';
import { Help } from '@pages/help';

export const App = () => {

  const popout = usePopout();

  const {view: activeView = VIEW.DEFAULT } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView || "default");

  return (
    <SplitLayout popout={popout}>
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
        <Panel>
          <Group>
            <SimpleCell onClick={() => {}}>SimpleCell</SimpleCell>
            <SimpleCell onClick={() => {}}>SimpleCell</SimpleCell>
            <SimpleCell onClick={() => {}}>SimpleCell</SimpleCell>
          </Group>
        </Panel>
      </SplitCol>
    </SplitLayout>
  );
};

import { View, SplitLayout, SplitCol, Epic } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
import { useEffect } from 'react';

import { VIEW, DEFAULT_VIEW, GROUPS_VIEW, HELP_VIEW } from '@app/router/model';
import { Tabbar } from '@shared/ui/tabbar';

import { Homepage } from '@pages/homepage';
import { Communities } from '@pages/communities';
import { Help } from '@pages/help';

export const App = () => {
  const {view: activeView = VIEW.DEFAULT } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView || "default");

  useEffect(() => {
    console.log(`${activeView} (${VIEW.DEFAULT}), ${activePanel} (${DEFAULT_VIEW.HOMEPAGE})`);
  }, [ activeView, activePanel ]);

  return (
    <SplitLayout>
      <SplitCol>
        <Epic activeStory={activeView || VIEW.DEFAULT} tabbar={<Tabbar/>}>
          <View id={VIEW.DEFAULT} activePanel={activePanel || DEFAULT_VIEW.HOMEPAGE}>
            <Homepage id={DEFAULT_VIEW.HOMEPAGE} />
          </View>

          <View id={VIEW.GROUPS} activePanel={activePanel || GROUPS_VIEW.DEFAULT}>
            <Communities id={GROUPS_VIEW.DEFAULT} />
          </View>

          <View id={VIEW.HELP} activePanel={activePanel || HELP_VIEW.DEFAULT}>
            <Help id={HELP_VIEW.DEFAULT} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

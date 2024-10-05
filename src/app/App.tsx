import { View, SplitLayout, SplitCol, Epic } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';

import { VIEW, DEFAULT_VIEW } from '@app/router/model';
import { Homepage } from '@pages/homepage';
import { useEffect } from 'react';

export const App = () => {
  const {view: activeView = VIEW.DEFAULT } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView || "default");

  useEffect(() => {
    console.log(`${activeView} (${VIEW.DEFAULT}), ${activePanel} (${DEFAULT_VIEW.HOMEPAGE})`);
  }, [ activeView, activePanel ]);

  return (
    <SplitLayout>
      <SplitCol>
        <Epic activeStory={activeView || VIEW.DEFAULT}>
          <View id={VIEW.DEFAULT} activePanel={activePanel || DEFAULT_VIEW.HOMEPAGE}>
            <Homepage id={DEFAULT_VIEW.HOMEPAGE} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

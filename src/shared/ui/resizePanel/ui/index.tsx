import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { AppRoutes } from '@app/router';
import { IResizePanel } from '../model';
import { useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';

export const ResizePanel = (props: IResizePanel) => {

  const contentRef = useRef<HTMLDivElement>(null);

  const routeNavigator = useRouteNavigator();

  const onChangeContent = () => {
    const elem = contentRef.current;

    if (elem) {
      const panelHeight = elem?.clientHeight;

      bridge.supportsAsync("VKWebAppResizeWindow")
        .then((res) => {
          if (res) {
            bridge.send("VKWebAppResizeWindow", {
              width: 911,
              height: panelHeight + 50 < 630 ? 630 : panelHeight + 50 > 4050 ? 4050 : panelHeight + 50
            })
          }
        })
    }
  }

  useEffect(() => {
    setTimeout(() => onChangeContent(), 100);
  }, [ props.children ]);

  return(
    <Panel id={props.id} nav={props.nav}>
      <PanelHeader
        fixed={true}
        before={props.before ?? <PanelHeaderBack onClick={() => routeNavigator.push(AppRoutes.default.homepage)} />}
      >
        {props.header || props.id || props.nav}
      </PanelHeader>

      <div ref={contentRef}>
        {props.children}
      </div>
    </Panel>
  );
}
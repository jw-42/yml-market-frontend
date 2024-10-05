import { Group, NavIdProps, Panel, PanelHeader, Spacing, Separator } from '@vkontakte/vkui';

import { Uploader } from '@widgets/Uploader';
import { BaseInfo } from '@widgets/BaseInfo';

export const Homepage = (props: NavIdProps) => {
  return(
    <Panel {...props}>
      <PanelHeader>Диагностика</PanelHeader>

      <Group>
        <BaseInfo/>

        <Spacing>
          <Separator/>
        </Spacing>

        <Uploader/>
      </Group>
    </Panel>
  );
};
import { CustomPlaceholder } from '@shared/ui/customPlaceholder';
import { Group, NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui';

export const Help = (props: NavIdProps) => {
  return(
    <Panel {...props}>
      <PanelHeader>Помощь</PanelHeader>

      <Group>
        <CustomPlaceholder type='develop' />
      </Group>
    </Panel>
  );
}
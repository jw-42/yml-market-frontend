import { CustomPlaceholder } from '@shared/ui/customPlaceholder';
import { Group, NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui';

export const Communities = (props: NavIdProps) => {
  return(
    <Panel {...props}>
      <PanelHeader>Сообщества</PanelHeader>

      <Group>
        <CustomPlaceholder type='develop' />
      </Group>
    </Panel>
  );
}
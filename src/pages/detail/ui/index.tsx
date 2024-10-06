import { CustomPlaceholder } from '@shared/ui/customPlaceholder';
import { Group, NavIdProps, Panel, PanelHeader, Placeholder } from '@vkontakte/vkui';

export const Detail = (props: NavIdProps) => {
  return(
    <Panel {...props}>
      <PanelHeader>Проверка</PanelHeader>

      <Group>
        <CustomPlaceholder type='develop' />
      </Group>
    </Panel>
  );
}
import { Group, NavIdProps } from '@vkontakte/vkui';

import { ResizePanel } from '@shared/ui/resizePanel';
import { GroupsList } from '@widgets/groupsList';

export const Communities = (props: NavIdProps) => {
  return(
    <ResizePanel {...props} before={false} header='Сообщества'>
      <Group>
        <GroupsList/>
      </Group>
    </ResizePanel>
  );
}
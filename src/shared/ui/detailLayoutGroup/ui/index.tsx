import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';
import { ReactElement } from 'react';

export const DetailLayoutGroup = (props: { children: ReactElement|string }) => {
  return(
    <div style={{ display: 'flex', flexDirection: 'row', gap: baseTheme.sizeButtonGroupGapSmall.regular.value }}>
      {props.children}
    </div>
  );
}
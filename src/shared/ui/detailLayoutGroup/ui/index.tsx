import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';
import { ReactNode } from 'react';

export const DetailLayoutGroup = (props: { children: ReactNode|string }) => {
  return(
    <div style={{ display: 'flex', flexDirection: 'row', gap: baseTheme.sizeButtonGroupGapSmall.regular.value }}>
      {props.children}
    </div>
  );
}
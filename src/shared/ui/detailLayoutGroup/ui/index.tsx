import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailLayoutGroup = (props: any) => {
  return(
    <div style={{ display: 'flex', flexDirection: 'row', gap: baseTheme.sizeButtonGroupGapSmall.regular.value }}>
      {props.children}
    </div>
  );
}
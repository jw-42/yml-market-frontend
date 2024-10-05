import { Icon56DocumentOutline } from "@vkontakte/icons";
import { FormLayoutGroup, FormItem, Input, File, DropZone, Placeholder, Spacing, Footnote } from "@vkontakte/vkui";

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const Uploader = () => {
  return(
    <FormLayoutGroup>
      <FormItem top="Ссылка на YML-фид">
        <Input
          placeholder="https://example.shop/products.xml"
        />
      </FormItem>

      <DropZone.Grid>
        <DropZone onDragOver={() => {}} onDrop={() => {}}>
          {() => (
            <Placeholder
              icon={<Icon56DocumentOutline/>}
              action={
                <>
                  <File
                    mode="secondary"
                  />

                  <Spacing/>

                  <Footnote style={{ color: baseTheme.colorTextSecondary.normal.value }}>
                    или перетащите сюда
                  </Footnote>
                </>
              }
            />
          )}
        </DropZone>
      </DropZone.Grid>
    </FormLayoutGroup>
  );
}
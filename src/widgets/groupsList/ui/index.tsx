import { Avatar, Button, ButtonGroup, Placeholder, Separator, SimpleCell, Spacing } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { GroupsListSkeleton } from './skeleton';
import bridge from '@vkontakte/vk-bridge';
import { Icon20DownloadOutline } from '@vkontakte/icons';

interface IGroup {
  id: number,
  name: string,
  screen_name: string,
  photo_50: string
}

export const GroupsList = () => {

  const [isFetching, setFetching] = useState<boolean>(true);
  const [list, setList] = useState<IGroup[]|undefined>(undefined);
  const [canView, setCanView] = useState<boolean|undefined>(false);

  const handleGetGroups = () => {
    bridge.send("VKWebAppGetAuthToken", { app_id: 51755627, scope: "groups" })
      .then(({access_token}) => {
        setCanView(true);

        bridge.send("VKWebAppCallAPIMethod", {
          method: "groups.get",
          params: {
            filter: "admin,editor",
            access_token,
            extended: 1,
            v: "5.199"
          }
        })
          .then(({response}) => {
            setFetching(false);
            setList(response?.items)
          })
          .catch((error) => {
            console.error(error);
            setFetching(false);
          })
      })
      .catch((error) => {
        console.error(error);
        setFetching(false);
        setCanView(false);
      })
  }

  useEffect(() => {
    bridge.send("VKWebAppCheckAllowedScopes", { scopes: "groups" })
      .then(({result}) => {
        if (result[0].allowed) {
          handleGetGroups();
        } else {
          setFetching(false);
          setCanView(false);
        }
      })
  }, []);

  return(
    <>
      {(isFetching) ? (
        <>
          <GroupsListSkeleton/>

          <Spacing>
            <Separator/>
          </Spacing>

          <GroupsListSkeleton/>

          <Spacing>
            <Separator/>
          </Spacing>

          <GroupsListSkeleton/>
        </>
      ) : (
        (list && list?.length > 0) ? (
          list?.map((club, index) => (
            <div key={index}>
              {(index > 0) && (
                <Spacing size={16}>
                  <Separator/>
                </Spacing>
              )}

              <SimpleCell
                subtitle={`@${club.screen_name}`}
                before={<Avatar size={50} src={club.photo_50} />}
                after={
                  <ButtonGroup gap={'s'}>
                    <Button
                      target={'_blank'}
                      href={`https://vk.com/${club.screen_name}?act=market_group_items`}
                    >
                      Открыть
                    </Button>

                    <Button
                      target={'_blank'}
                      mode={'secondary'}
                      aria-label='download'
                      href={`https://vk.com/market-${club.id}?format=yml`}
                      before={<Icon20DownloadOutline width={16} height={16} />}
                    />
                  </ButtonGroup>
                }
              >
                {club?.name}
              </SimpleCell>
            </div>
          ))
        ) : (
          (canView === false) ? (
            <Placeholder
              action={
                <Button
                  onClick={() => {}}
                >
                  Разрешить
                </Button>
              }
            >
              Сервису необходим доступ к списку ваших сообществ.
            </Placeholder>
          ) : (
            <Placeholder>
              Здесь будет список администрируемых вами сообществ.
            </Placeholder>
          )
        )
      )}
    </>
  );
}
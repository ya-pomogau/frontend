import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import { Filter } from 'features/filter';
import { UserInfo } from 'entities/user';

import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

export function RequestsNotprocessedPage() {
  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuForAuthorized />
        </>
      }
      content={
        <ContentLayout
          heading={
            <SmartHeader
              icon={<Icon color="blue" icon="BlockIcon" size="54" />}
              text="Подтверждение / Блокировка"
              filter={<Filter items={{ userCategories: true }} />}
            />
          }
        >
          <PageSubMenuForAdmins />
        </ContentLayout>
      }
    />
  );
}

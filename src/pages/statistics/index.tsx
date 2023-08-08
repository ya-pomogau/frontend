import { SideMenuForAuthorized } from 'widgets/side-menu';
import { UserInfo } from 'entities/user';
import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

export function StatisticsPage() {
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
              filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
              filterText="Фильтр"
              onClick={() => 1}
              settingIcon={<Icon color="blue" icon="StatisticIcon" size="54" />}
              settingText="Статистика"
            />
          }
        >
          <div> Statistics </div>
        </ContentLayout>
      }
    />
  );
}

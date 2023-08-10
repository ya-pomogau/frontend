import { SideMenuForAuthorized } from 'widgets/side-menu';
import { UserInfo } from 'entities/user';
import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';
import { BalanceSettings } from 'widgets/balance-settings';

export function BidsPage() {
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
              onClick={() => 1}
              settingIcon={<Icon color="blue" icon="SettingsIcon" size="46" />}
              settingText="Настройка балов"
            />
          }
        >
          <div>
            <BalanceSettings />
          </div>
        </ContentLayout>
      }
    />
  );
}

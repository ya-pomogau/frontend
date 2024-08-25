import { Icon, SmartHeader } from 'shared/ui';
import { BalanceSettings } from 'widgets';

export function BidsPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="46" />}
        text="Настройка баллов"
      />
      <div>
        <BalanceSettings />
      </div>
    </>
  );
}

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { BalanceSettings } from 'widgets/balance-settings';

export function BidsPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="46" />}
        text="Настройка балов"
      />
      <div>
        <BalanceSettings />
      </div>
    </>
  );
}

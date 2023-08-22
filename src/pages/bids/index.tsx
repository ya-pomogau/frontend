import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { BalanceSettings } from 'widgets/balance-settings';

export function BidsPage() {
  return (
    <>
      <SmartHeader
        onClick={() => 1}
        settingIcon={<Icon color="blue" icon="SettingsIcon" size="46" />}
        settingText="Настройка балов"
      />
      <div>
        <BalanceSettings />
      </div>
    </>
  );
}

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

export function StatisticsPage() {
  return (
    <>
      <SmartHeader
        filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
        filterText="Фильтр"
        onClick={() => 1}
        settingIcon={<Icon color="blue" icon="StatisticIcon" size="54" />}
        settingText="Статистика"
      />
      <div> Statistics </div>
    </>
  );
}

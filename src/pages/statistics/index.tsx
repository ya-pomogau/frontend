import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

export function StatisticsPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="StatisticIcon" size="54" />}
        text="Статистика"
      />
      <div> Statistics </div>
    </>
  );
}

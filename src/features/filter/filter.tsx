import { useForm, Controller } from 'react-hook-form';
import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { FilterProps, IFilterValues } from 'features/filter/types';
import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { TimeBlock } from './ui/time-block';
import { CategoriesBlock } from './ui/categories-block';
import styles from './styles.module.css';
import { FilterItemsIds } from './consts';

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  const defaultValues: IFilterValues = {
    categories: [],
    searchRadius: '',
    sortBy: '',
    date: '',
    time: [],
    userCategories: [FilterItemsIds.ALL],
  };

  const { control, handleSubmit, reset, watch } = useForm<IFilterValues>({
    defaultValues,
  });

  const onSubmit = (data: IFilterValues) => {
    if (setFilteres) {
      setFilteres(data);
    }
  };

  if (notFoundFilter) {
    return null;
  }

  const formValues = watch();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FilterWrapper
          filterMenu={
            <>
              {items?.sort && (
                <Controller
                  name="sortBy"
                  control={control}
                  render={({ field }) => (
                    <SortByBlock
                      filter={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {items?.categories && (
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <CategoriesBlock
                      selectedServies={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {items?.userCategories && (
                <Controller
                  name="userCategories"
                  control={control}
                  render={({ field }) => (
                    <UserCategoriesBlock
                      filter={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {items?.radius && (
                <Controller
                  name="searchRadius"
                  control={control}
                  render={({ field }) => (
                    <RadiusBlock
                      filter={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              <div className={styles.dateBlock}>
                {items?.time && (
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <TimeBlock
                        filterTime={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                )}
                {items?.date && (
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <CalenderBlock
                        filterDate={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                )}
              </div>
            </>
          }
          filterValues={formValues}
          onReset={() => reset(defaultValues)}
          setFilteres={setFilteres}
        />
      </form>
    </div>
  );
};

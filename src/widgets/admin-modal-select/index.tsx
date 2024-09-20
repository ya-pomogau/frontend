import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetAllAdminsQuery } from "services/admin-api";
import { Accordion, Button } from "shared/ui";
import { LightPopup } from 'shared/ui/light-popup';
import styles from './styles.module.css';
import { User } from "entities/user/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  admins?: User[];
}

interface IFormInput {
  selectAdmin: string;
}

interface IConflictAdminList {
  value: string, label: string
}

// Сейчас нельзя повторно выбрать админа или его поменять, код, который закомментирован дает доступ к смене админа, но запрещает повторный выбор
// Для того чтобы менять стили поля выбранного админа, нужно будет внести изменения в компонент Accordion, изменения сейчас закомментированы

export const AdminSelectModal = ({isOpen, onClose, admins}: Props) => {
  //const [isSelected, setIsSelected] = useState(false); // Если внести правки в Accordion, переменная будет оттдавать информацию о том что поле выбранно и активировать disabled
  const [selectedAdmin, setSelectedAdmin] = useState<string>(''); // Храним админа который был выбран после сабмита, временное решение
  const adminList: Array<IConflictAdminList> = []; // Список всех доступных админов для вывода в селект
  let dataAdmins

  admins? dataAdmins = admins : dataAdmins = useGetAllAdminsQuery('').data; // Временно, чтобы нормально открывалось в сторибуке
  if(dataAdmins) {
    dataAdmins.forEach(el => adminList.push({value: el.name, label: el.name}));
   }

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      selectAdmin: ''// Админ которого выбрали сейчас в селекте
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if(selectedAdmin === data.selectAdmin) {
      //setIsSelected(true);
      console.log(`Этот администратор уже выбран ${selectedAdmin}`)
    }

    if(selectedAdmin !== data.selectAdmin) {
      //setIsSelected(true);
      setSelectedAdmin(data.selectAdmin);
      console.log(`Выбран администратор для решения конфликта ${data.selectAdmin}`);
    }
  };

  const disabledButton = !watch('selectAdmin') || !!selectedAdmin;
  //const disabledButton = !watch('selectAdmin') || selectedAdmin === watch('selectAdmin');


  return ( <LightPopup
    extClassName={styles.modal}
    hasCloseButton
    isPopupOpen={isOpen}
    onClickExit={onClose}
  >
          <form
        className={styles.form}
        id="adminSelectForm"
        name="adminSelectForm"
        onSubmit={handleSubmit(onSubmit)}
      >
            <div className={styles.wrapper}>
              <Controller
                name="selectAdmin"
                control={control}
                render={({ field: { onChange, } }) => (
                  <Accordion
                    //isSelected = {isSelected}
                    extraClasses={{extraClassListContainer: styles.scroll}}
                    name="conflict_admin"
                    arrayOptions={adminList}
                    onChange={onChange}
                    placeholder={String(
                      adminList.find((n) => n.value === selectedAdmin)?.label? `Выбран администратор: ${selectedAdmin}` :
                        'Выберите администратора'
                    )}
                  />
                )}
              />
              {/* <span className={styles.error}>{`${(watch('selectAdmin') === selectedAdmin) && (selectedAdmin !== '')? 'Этот администратор уже выбран' : ''}`}</span>  Можно выводить сообщение об ошибке повторного выбора*/}
            </div>
          <Button buttonType={'primary'} label={String(selectedAdmin? 'Администратор выбран' : 'Подтвердите выбор')} actionType={'submit'} disabled={disabledButton}/>
          {/* <Button buttonType={'primary'} label={String((watch('selectAdmin') === selectedAdmin) && (selectedAdmin !== '')? 'Этот администратор уже выбран' : 'Подтвердите выбор')} actionType={'submit'} disabled={disabledButton}/> */}
  </form>

  </LightPopup>)
}

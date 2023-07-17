import { Link } from 'react-router-dom';

export function ProfilePage() {
  return (
    <div>
      <h1>ProfilePage template</h1>
      <ul>
        <li>
          <Link to="volunteer">Шаблон страницы волонтера</Link>
        </li>
        <li>
          <Link to="recipient">Шаблон страницы реципиента</Link>
        </li>
        <li>
          <Link to="admin">Шаблон страницы администратора</Link>
        </li>
        <li>
          <Link to="master">Шаблон страницы главного администратора</Link>
        </li>
      </ul>
    </div>
  );
}

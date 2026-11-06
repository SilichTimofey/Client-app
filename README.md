# ТрансЛогистик (лабораторные РКП)

Фронтенд транспортной компании: вход сотрудников, учёт заказов доставки (таблица + карточки).

## Стек

- React + Vite
- Redux (классический) + react-redux
- React Router DOM
- Material UI

## Запуск

```bash
npm install
npm run dev
```

## Тестовые аккаунты

| Логин   | Пароль | Роль            |
|---------|--------|-----------------|
| admin   | admin  | Администратор   |
| manager | 12345  | Менеджер склада |
| courier | pass   | Курьер          |

## Структура

```
src/
  redux/
    Actions/     — константы и action creators
    Data/        — accounts, orders, OrderData
    reducers/    — user, entities, rootReducer
    store/       — createStore + appStore (add/remove/subscribe)
  views/
    components/  — LoginForm, OrderCard, OrderForm, OrderTable
    containers/  — LoginPage, OrdersPage (subscribe к store)
```

Доступ к данным — как в vscode-react-sample: `appStore.addOrder` / `removeOrder` / `subscribe`,
внутри по-прежнему классический Redux (`dispatch` + reducers).

## Валидация

- HTML5: `required`, `min`/`max`, `minLength`, `pattern`
- Formik: проверка полей, подсветка ошибок
- Бизнес-правила заказа: города из списка, вес 0.1–50 кг, ФИО по шаблону, города «откуда» ≠ «куда»
- Константы правил подгружаются из `services/validationApi.js` (имитация сервиса)
- Сообщения об ошибках — в диалоговом окне (MUI Dialog)

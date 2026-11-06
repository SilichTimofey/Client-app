// Начальный список заказов доставки
const orders = [
  {
    id: 1,
    trackNumber: 'TRK-1001',
    fromCity: 'Москва',
    toCity: 'Казань',
    recipient: 'Петров А.С.',
    weight: 2.5,
    status: 'В пути',
  },
  {
    id: 2,
    trackNumber: 'TRK-1002',
    fromCity: 'Санкт-Петербург',
    toCity: 'Москва',
    recipient: 'Сидорова М.И.',
    weight: 1.2,
    status: 'На складе',
  },
  {
    id: 3,
    trackNumber: 'TRK-1003',
    fromCity: 'Новосибирск',
    toCity: 'Екатеринбург',
    recipient: 'Козлов Д.В.',
    weight: 5.0,
    status: 'Доставлен',
  },
];

export default orders;

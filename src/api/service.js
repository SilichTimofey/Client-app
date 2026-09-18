export const fetchWaybills = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1000124', sender: 'Москва', receiver: 'Минск', status: 'В пути', price: '450 ₽' },
        { id: '1000125', sender: 'Казань', receiver: 'Санкт-Петербург', status: 'Доставлен', price: '320 ₽' }
      ]);
    }, 800);
  });
};
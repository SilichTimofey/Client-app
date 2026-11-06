// «Сервис» с константами для валидации (имитация запроса)
export function fetchValidationRules() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cities: [
          'Москва',
          'Санкт-Петербург',
          'Казань',
          'Новосибирск',
          'Екатеринбург',
          'Нижний Новгород',
        ],
        minWeight: 0.1,
        maxWeight: 50,
        statuses: ['На складе', 'В пути', 'Доставлен'],
        recipientPattern: /^[А-Яа-яЁёA-Za-z.\-\s]{3,}$/,
      });
    }, 400);
  });
}

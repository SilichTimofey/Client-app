import { useState, useEffect } from 'react';
import WaybillAPI from '../api/service';

function Dashboard() {
  const [waybills, setWaybills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcData, setCalcData] = useState({ cityFrom: '', cityTo: '', size: '', weight: '' });
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setWaybills(WaybillAPI.all());
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreateWaybill = () => {
    WaybillAPI.add({
      sender: 'Неизвестно',
      receiver: 'Неизвестно',
      status: 'Создан',
      price: 'Рассчитывается...'
    });
    setWaybills([...WaybillAPI.all()]);
  };

  const handleDeleteWaybill = (id) => {
    WaybillAPI.delete(id);
    setWaybills([...WaybillAPI.all()]);
  };

  const handleCalculateSubmit = (e) => {
    e.preventDefault();
    setCalculatedPrice(Math.floor(Math.random() * 1000) + 300);
  };

  return (
    <div>
      <header>
        <h1>Мои накладные</h1>
        <div>
          <button onClick={() => setIsCalcOpen(true)}>
            Рассчитать стоимость
          </button>
          <button onClick={handleCreateWaybill}>
            + Создать накладную
          </button>
        </div>
      </header>

      <main>
        {isLoading ? (
          <div>Загрузка данных...</div>
        ) : (
          <div>
            {waybills.length === 0 ? (
              <p>Список накладных пуст</p>
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Номер</th>
                      <th>Маршрут</th>
                      <th>Статус</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waybills.map((waybill) => (
                      <tr key={waybill.id}>
                        <td><strong>№ {waybill.id}</strong></td>
                        <td>{waybill.sender} → {waybill.receiver}</td>
                        <td><span>{waybill.status}</span></td>
                        <td>
                          <div>
                            <button>Редактировать</button>
                            <button onClick={() => handleDeleteWaybill(waybill.id)}>
                              Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {isCalcOpen && (
        <div>
          <div>
            <h2>Калькулятор стоимости</h2>
            <form onSubmit={handleCalculateSubmit}>
              <input 
                type="text" 
                placeholder="Город отправки" 
                value={calcData.cityFrom}
                onChange={e => setCalcData({...calcData, cityFrom: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder="Город назначения" 
                value={calcData.cityTo}
                onChange={e => setCalcData({...calcData, cityTo: e.target.value})}
                required
              />
              <select 
                value={calcData.size}
                onChange={e => setCalcData({...calcData, size: e.target.value})}
                required
              >
                <option value="">Выберите размер</option>
                <option value="XS">XS (Коробка 15x15x15)</option>
                <option value="S">S (Коробка 20x20x20)</option>
                <option value="M">M (Коробка 30x30x30)</option>
                <option value="L">L (Коробка 40x40x40)</option>
                <option value="XL">XL (Коробка 50x50x50)</option>
              </select>
              <input 
                type="number" 
                placeholder="Вес (кг)" 
                value={calcData.weight}
                onChange={e => setCalcData({...calcData, weight: e.target.value})}
                required
              />
              <div>
                <button type="submit">Рассчитать</button>
                <button type="button" onClick={() => {
                  setIsCalcOpen(false);
                  setCalculatedPrice(null);
                }}>Закрыть</button>
              </div>
            </form>
            {calculatedPrice && (
              <div>
                <p>Примерная стоимость: <strong>{calculatedPrice} ₽</strong></p>
                <button onClick={() => {
                  handleCreateWaybill();
                  setIsCalcOpen(false);
                  setCalculatedPrice(null);
                }}>
                  Создать заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

import { useState, useEffect } from 'react';
import { fetchWaybills } from './api/service';
import './App.css';

function App() {
  const [waybills, setWaybills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcData, setCalcData] = useState({ cityFrom: '', cityTo: '', size: '', weight: '' });
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  useEffect(() => {
    fetchWaybills().then((data) => {
      setWaybills(data);
      setIsLoading(false);
    });
  }, []);

  const handleCreateWaybill = () => {
    const newWaybill = {
      id: Date.now().toString().slice(-7),
      sender: 'Неизвестно',
      receiver: 'Неизвестно',
      status: 'Создан',
      price: 'Рассчитывается...'
    };
    setWaybills([newWaybill, ...waybills]);
  };

  const handleDeleteWaybill = (id) => {
    setWaybills(waybills.filter(waybill => waybill.id !== id));
  };

  const handleCalculateSubmit = (e) => {
    e.preventDefault();
    setCalculatedPrice(Math.floor(Math.random() * 1000) + 300);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Мои накладные</h1>
        <div className="header-actions">
          <button className="btn btn-calc" onClick={() => setIsCalcOpen(true)}>
            Рассчитать стоимость
          </button>
          <button className="btn btn-create" onClick={handleCreateWaybill}>
            + Создать накладную
          </button>
        </div>
      </header>

      <main>
        {isLoading ? (
          <div className="loader">Загрузка данных...</div>
        ) : (
          <div className="waybill-list">
            {waybills.length === 0 ? (
              <p className="empty-state">Список накладных пуст</p>
            ) : (
              waybills.map((waybill) => (
                <div key={waybill.id} className="waybill-card">
                  <div className="waybill-info">
                    <span className="waybill-id">№ {waybill.id}</span>
                    <span className="waybill-route">{waybill.sender} → {waybill.receiver}</span>
                    <span className="waybill-status">{waybill.status}</span>
                  </div>
                  <div className="waybill-actions">
                    <button className="btn btn-disabled">Редактировать</button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDeleteWaybill(waybill.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {isCalcOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              <div className="modal-actions">
                <button type="submit" className="btn btn-calc">Рассчитать</button>
                <button type="button" className="btn btn-disabled" onClick={() => {
                  setIsCalcOpen(false);
                  setCalculatedPrice(null);
                }}>Закрыть</button>
              </div>
            </form>
            {calculatedPrice && (
              <div className="calc-result">
                <p>Примерная стоимость: <strong>{calculatedPrice} ₽</strong></p>
                <button className="btn btn-create" onClick={() => {
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

export default App;
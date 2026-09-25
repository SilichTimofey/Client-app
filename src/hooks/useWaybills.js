import { useState, useEffect } from 'react';

export const useWaybills = () => {
  const [waybills, setWaybills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaybills([
        { id: "1000124", sender: "Москва", receiver: "Минск", status: "В пути", price: "450 ₽" },
        { id: "1000125", sender: "Казань", receiver: "Санкт-Петербург", status: "Доставлен", price: "320 ₽" },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const get = (id) => {
    return waybills.find((w) => w.id === id);
  };

  const remove = (id) => {
    setWaybills((prev) => prev.filter((w) => w.id !== id));
    return true;
  };

  const add = (waybill) => {
    let newWaybill = { ...waybill };
    if (!newWaybill.id) {
      newWaybill.id = String(
        Number(
          waybills.reduce((prev, current) => {
            return Number(prev.id) > Number(current.id) ? prev : current;
          }, { id: 0 }).id
        ) + 1
      );
    }
    setWaybills((prev) => [newWaybill, ...prev]);
    return newWaybill;
  };

  const update = (waybill) => {
    setWaybills((prev) =>
      prev.map((w) => (w.id === waybill.id ? waybill : w))
    );
    return waybill;
  };

  return { waybills, isLoading, get, remove, add, update };
};
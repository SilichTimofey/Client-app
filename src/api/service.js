const WaybillAPI = {
  waybills: [
    { id: '1000124', sender: 'Москва', receiver: 'Минск', status: 'В пути', price: '450 ₽' },
    { id: '1000125', sender: 'Казань', receiver: 'Санкт-Петербург', status: 'Доставлен', price: '320 ₽' }
  ],
  all: function () {
    return this.waybills;
  },
  get: function (id) {
    const isWaybill = (w) => w.id === id;
    return this.waybills.find(isWaybill);
  },
  delete: function (id) {
    const isNotDelWaybill = (w) => w.id !== id;
    this.waybills = this.waybills.filter(isNotDelWaybill);
    return true;
  },
  add: function (waybill) {
    if (!waybill.id) {
      const maxId = this.waybills.reduce((max, current) => {
        return Number(max) > Number(current.id) ? max : current.id;
      }, 0);
      waybill = {
        ...waybill,
        id: String(Number(maxId) + 1),
      };
    }
    this.waybills = [...this.waybills, waybill];
    return waybill;
  },
  update: function (waybill) {
    const index = this.waybills.findIndex((w) => w.id === waybill.id);
    if (index !== -1) {
      this.waybills[index] = waybill;
    }
    return waybill;
  },
};

export default WaybillAPI;
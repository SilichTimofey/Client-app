// Модель заказа (как TodoData в vscode-react-sample)
class OrderData {
  constructor(fromCity, toCity, recipient, weight, status = 'На складе') {
    this.id = Date.now();
    this.trackNumber = `TRK-${String(this.id).slice(-4)}`;
    this.fromCity = fromCity;
    this.toCity = toCity;
    this.recipient = recipient;
    this.weight = Number(weight);
    this.status = status;
    this.timestamp = new Date().toLocaleDateString();
  }
}

export default OrderData;

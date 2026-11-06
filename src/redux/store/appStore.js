import store from './store';
import { login, logout } from '../Actions/userActions';
import { addOrder, deleteOrder } from '../Actions/entitiesActions';
import OrderData from '../Data/OrderData';

// Обёртка над Redux в стиле TodosStore из vscode-react-sample:
// add / remove / getAll / subscribe
class AppStore {
  addOrder(fromCity, toCity, recipient, weight, status) {
    const order = new OrderData(fromCity, toCity, recipient, weight, status);
    store.dispatch(addOrder(order));
    return order.id;
  }

  removeOrder(order) {
    store.dispatch(deleteOrder(order.id));
  }

  login(user) {
    store.dispatch(login(user));
  }

  logout() {
    store.dispatch(logout());
  }

  getOrders() {
    return store.getState().entities;
  }

  getUser() {
    return store.getState().user;
  }

  // subscriber получает актуальные orders и user (как action в примере)
  subscribe(subscriber) {
    return store.subscribe(() => {
      subscriber({
        orders: this.getOrders(),
        user: this.getUser(),
      });
    });
  }
}

export default new AppStore();

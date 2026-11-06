import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from '@mui/material';
import OrderCard from '../components/OrderCard';
import OrderForm from '../components/OrderForm';
import OrderTable from '../components/OrderTable';
import appStore from '../../redux/store/appStore';

// Как Todos: локальный state + subscribe на store
function OrdersPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(appStore.getUser());
  const [orders, setOrders] = useState(appStore.getOrders());

  useEffect(() => {
    const unsubscribe = appStore.subscribe((data) => {
      setOrders(data.orders);
      setUser(data.user);
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    appStore.logout();
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ТрансЛогистик — заказы
          </Typography>
          <Typography sx={{ mr: 2 }}>{user.name}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, mb: 4 }}>
        <OrderForm />

        <Typography variant="h6" gutterBottom>
          Таблица заказов
        </Typography>
        <OrderTable orders={orders} />

        <Typography variant="h6" gutterBottom>
          Карточки заказов
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid key={order.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default OrdersPage;

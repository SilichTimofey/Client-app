import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import appStore from '../../redux/store/appStore';

function OrderCard({ order }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">{order.trackNumber}</Typography>
        <Typography color="text.secondary">
          {order.fromCity} → {order.toCity}
        </Typography>
        <Typography variant="body2">Получатель: {order.recipient}</Typography>
        <Typography variant="body2">Вес: {order.weight} кг</Typography>
        <Typography variant="body2">Статус: {order.status}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={() => appStore.removeOrder(order)}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}

export default OrderCard;

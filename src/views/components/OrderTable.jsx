import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TableContainer,
} from '@mui/material';
import appStore from '../../redux/store/appStore';

function OrderTable({ orders }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Трек-номер</TableCell>
            <TableCell>Откуда</TableCell>
            <TableCell>Куда</TableCell>
            <TableCell>Получатель</TableCell>
            <TableCell>Вес</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell width={120}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.trackNumber}</TableCell>
              <TableCell>{order.fromCity}</TableCell>
              <TableCell>{order.toCity}</TableCell>
              <TableCell>{order.recipient}</TableCell>
              <TableCell>{order.weight} кг</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="error"
                  onClick={() => appStore.removeOrder(order)}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;

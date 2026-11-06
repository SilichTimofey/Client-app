import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import appStore from '../../redux/store/appStore';
import { fetchValidationRules } from '../../services/validationApi';

const emptyValues = {
  fromCity: '',
  toCity: '',
  recipient: '',
  weight: '',
  status: 'На складе',
};

function OrderForm() {
  const [rules, setRules] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogErrors, setDialogErrors] = useState([]);

  useEffect(() => {
    fetchValidationRules().then(setRules);
  }, []);

  const formik = useFormik({
    initialValues: emptyValues,
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!rules) return errors;

      if (!values.fromCity) {
        errors.fromCity = 'Укажите город отправления';
      } else if (!rules.cities.includes(values.fromCity)) {
        errors.fromCity = `Город должен быть из списка: ${rules.cities.join(', ')}`;
      }

      if (!values.toCity) {
        errors.toCity = 'Укажите город назначения';
      } else if (!rules.cities.includes(values.toCity)) {
        errors.toCity = `Город должен быть из списка: ${rules.cities.join(', ')}`;
      } else if (values.fromCity && values.fromCity === values.toCity) {
        errors.toCity = 'Город назначения не должен совпадать с городом отправления';
      }

      if (!values.recipient) {
        errors.recipient = 'Укажите получателя';
      } else if (!rules.recipientPattern.test(values.recipient.trim())) {
        errors.recipient = 'ФИО: только буквы, минимум 3 символа';
      }

      const weight = Number(values.weight);
      if (values.weight === '' || Number.isNaN(weight)) {
        errors.weight = 'Укажите вес';
      } else if (weight < rules.minWeight || weight > rules.maxWeight) {
        errors.weight = `Вес должен быть от ${rules.minWeight} до ${rules.maxWeight} кг`;
      }

      if (!rules.statuses.includes(values.status)) {
        errors.status = 'Недопустимый статус';
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      appStore.addOrder(
        values.fromCity,
        values.toCity,
        values.recipient.trim(),
        values.weight,
        values.status
      );
      resetForm();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      const messages = Object.values(errors);
      if (messages.length > 0) {
        formik.setTouched({
          fromCity: true,
          toCity: true,
          recipient: true,
          weight: true,
          status: true,
        });
        setDialogErrors(messages);
        setDialogOpen(true);
        return;
      }
      formik.handleSubmit();
    });
  };

  if (!rules) {
    return (
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Загрузка правил валидации...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Новый заказ
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Города и лимиты веса загружаются с сервиса. Вес: {rules.minWeight}–{rules.maxWeight} кг.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            select
            name="fromCity"
            label="Откуда"
            value={formik.values.fromCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fromCity && Boolean(formik.errors.fromCity)}
            helperText={formik.touched.fromCity && formik.errors.fromCity}
            required
            size="small"
            sx={{ minWidth: 160 }}
          >
            {rules.cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="toCity"
            label="Куда"
            value={formik.values.toCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.toCity && Boolean(formik.errors.toCity)}
            helperText={formik.touched.toCity && formik.errors.toCity}
            required
            size="small"
            sx={{ minWidth: 160 }}
          >
            {rules.cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="recipient"
            label="Получатель"
            value={formik.values.recipient}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.recipient && Boolean(formik.errors.recipient)}
            helperText={formik.touched.recipient && formik.errors.recipient}
            required
            size="small"
            inputProps={{ minLength: 3, pattern: '[А-Яа-яЁёA-Za-z.\\-\\s]+' }}
          />

          <TextField
            name="weight"
            label="Вес (кг)"
            type="number"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            required
            size="small"
            sx={{ width: 120 }}
            inputProps={{
              step: 0.1,
              min: rules.minWeight,
              max: rules.maxWeight,
            }}
          />

          <TextField
            select
            name="status"
            label="Статус"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            size="small"
            sx={{ minWidth: 140 }}
          >
            {rules.statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Ошибки заполнения формы</DialogTitle>
        <DialogContent>
          <List dense>
            {dialogErrors.map((msg) => (
              <ListItem key={msg}>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} autoFocus>
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderForm;

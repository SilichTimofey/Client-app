import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function LoginForm({ onLogin }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogErrors, setDialogErrors] = useState([]);

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    validate: (values) => {
      const errors = {};
      if (!values.login) {
        errors.login = 'Введите логин';
      } else if (values.login.length < 3) {
        errors.login = 'Логин не короче 3 символов';
      }

      if (!values.password) {
        errors.password = 'Введите пароль';
      } else if (values.password.length < 4) {
        errors.password = 'Пароль не короче 4 символов';
      }

      return errors;
    },
    onSubmit: (values, { setFieldError }) => {
      const ok = onLogin(values.login, values.password);
      if (!ok) {
        setFieldError('password', 'Неверный логин или пароль');
        setDialogErrors(['Неверный логин или пароль']);
        setDialogOpen(true);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      const messages = Object.values(errors);
      if (messages.length > 0) {
        formik.setTouched({ login: true, password: true });
        setDialogErrors(messages);
        setDialogOpen(true);
        return;
      }
      formik.handleSubmit();
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          maxWidth: 360,
          mx: 'auto',
          mt: 8,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          ТрансЛогистик
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
          Вход в систему
        </Typography>

        <TextField
          name="login"
          label="Логин"
          fullWidth
          margin="normal"
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
          required
          inputProps={{ minLength: 3 }}
        />
        <TextField
          name="password"
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
          inputProps={{ minLength: 4 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Войти
        </Button>

        <Typography variant="caption" display="block" sx={{ mt: 2 }} color="text.secondary">
          admin/admin · manager/12345 · courier/pass
        </Typography>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Ошибка входа</DialogTitle>
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

export default LoginForm;

import 'dotenv/config';
import app from './server';

const { PORT } = process.env;

const handleListening = () => {
  console.log(`server listenting on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

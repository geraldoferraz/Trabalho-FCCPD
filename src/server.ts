import { app } from "./app";

app.listen({
    host: '0.0.0.0',
    port: 3334
}).then(() => {
    console.log('HTTP Server Running 🚀');
}).catch(err => {
    console.error('Error starting server:', err);
});

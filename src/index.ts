import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/hvh', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/noughts_and_crosses_hvh.html'));
});

app.get('/hvc', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/noughts_and_crosses_hvc.html'));
});


app.get('/api', (req: Request, res: Response) => {
    res.json({ message: "Hello from REST API" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

import express, { Application, Request, Response } from 'express';
import {User, Product} from './model/index';
import sequelize from './db/connection';

const app: Application = express();
app.use(express.json());


app.get('/users', async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],

    include: [
      {
        model: Product,
      },
    ],

    group: ['Product.productId'],
    raw: true,
  });
  res.status(200).send(users);
});


app.get('/products', async (req: Request, res: Response) => {
  const users = await Product.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    include: [
      {
        model: User,
      },
    ],
    group: ['User.userId'],
  });
  res.status(200).send(users);
});


app.post('/users', async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	res.status(200).send(user);
})


app.post('/products', async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(200).send(product);
});



app.listen(5000, () => console.log('server running *5000'));

























// app.get('/users', async (req: Request, res: Response): Promise<void> => {
//   const users = await User.findAll();
//   res.status(200).send({ status: 200, data: users });
// });

// app.get('/users/:userId', async (req: Request, res: Response): Promise<any> => {
//   const { userId } = req.params;
//   const user = await User.findOne({ where: { userId } });
//   if (!user) {
//     return res.status(404).send({ status: 404, message: 'user not found' });
//   }
//   return res.status(200).send(user);
// });

// app.post('/create/user', async (req: Request, res: Response) => {
//   const user = await User.create(req.body);
//   return res.status(201).send(user);
// });

// app.put('/update/user/:userId', async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const { username } = req.body;
//   const user = await User.findOne({ where: { userId } });
//   if (!user) {
//     return res.status(404).send({ status: 404, message: 'user not found' });
//   }
//   user.username = username;
//   user.save();
//   return res
//     .status(200)
//     .send({ status: 200, message: 'user updated', data: user });
// });

// app.delete(
//   '/delete/user/:userId',
//   async (req: Request, res: Response): Promise<void> => {
//     const { userId } = req.params;
//     const user = await User.destroy({ where: { userId } });
//     res.status(200).send({ status: 200, message: 'user deleted', data: user });
//   },
// );
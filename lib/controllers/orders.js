const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.json(order);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.getById(req.params.id);

      res.send(order);
    } catch (Error) {
      Error.status = 404;
      next(Error);
    }
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();

    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Order.updateById(id, {
        product: req.body.product,
        quantity: req.body.quantity,
      });

      if (!response.id) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.send(response);
    } catch (error) {
      next(error);
      throw error;
    }
  })

  .delete('/:id', async (req, res) => {
    const order = await Order.deleteById(req.params.id);

    res.send(order);
  });

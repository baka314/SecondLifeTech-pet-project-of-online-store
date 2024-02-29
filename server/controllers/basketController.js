const { Basket, BasketDevice } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async create(req, res, next) {
        try {
            const { deviceId, comment } = req.body;
            const basket = await Basket.create({ comment });

            const device = await BasketDevice.create({
                basketId: basket.id,
                deviceId,
            });

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const baskets = await Basket.findAll();
        return res.json(baskets);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const basket = await Basket.findOne({
            where: { id },
            include: [{ model: BasketDevice }],
        });
        return res.json(basket);
    }

    async delete(req, res) {
        const { id } = req.params;
        const basket = await Basket.findOne({
            where: { id },
        });
        await basket.destroy();
        return res.json({ message: 'Basket deleted' });
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { comment } = req.body;

            const basket = await Basket.findByPk(id);
            if (!basket) {
                return next(ApiError.notFound('Basket not found'));
            }

            basket.comment = comment;
            await basket.save();

            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketController();

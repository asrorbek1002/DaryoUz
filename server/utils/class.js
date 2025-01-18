const fs = require('fs')
const path = require('path');
const ObjectId = require('mongodb').ObjectId;

module.exports = class ToDoClass {
    constructor(Model, Request, Response, Next) {
        this.model = Model
        this.req = Request
        this.res = Response
        this.next = Next
    }

    // Yaratish
    async createData() {
        try {
            const body = { ...this.req.body };
            const candidate = await this.model.findOne().sort({ createdAt: -1 });
            const order = { order: candidate ? candidate.order + 1 : 1000000 };

            const result = this.model({ ...body, ...order })
            await result.save()
            this.res.json({ status: true, data: result })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // Alohida ID boyicha olish
    async findById(...populate) {
        try {
            const { id } = this.req.params;
            const result = await this.model
                .findById({ _id: id })
                .populate([...populate])
            this.res.json({ status: true, data: result })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // Hammasini olish
    async findAll(...populate) {
        try {
            const { status } = this.req.query; // faol yoki muzlatiliganlarni alohida olish
            const result = await this.model.find({ status: { $eq: status } }).populate([...populate])
            this.res.json({ status: true, data: result })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // Alohida ID dan tashqari boshqa key boyicha qidirish
    async findOne(...populate) {
        try {
            const { key, value } = this.req.query;
            const result = await this.model
                .findOne({ [key]: value })
                .populate([...populate])
            this.res.json({ status: true, data: result })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // malumotlarni paginatsiya orqali olish
    async pagination(...populate) {
        try {
            const defaultPaginationCount = 10;
            const { status, pagination } = req.query; // ✅
            const skip = parseInt((pagination - 1) * defaultPaginationCount);
            const total = await this.model.find({ status: { $eq: status } }).countDocuments(); // Jami 100.000
            if (!skip || skip == "" || skip == undefined || skip == 1) {
                const data = await this.model
                    .find({ status: { $eq: status } })
                    .populate([...populate])
                    .sort({ createdAt: -1 })
                    .limit(defaultPaginationCount)
                    .lean();
                this.res.json({
                    status: true,
                    data: {
                        count: defaultPaginationCount,
                        total: total,
                        data: data,
                    }
                })
            }
            else {
                const data = await this.model
                    .find({ status: { $eq: status } })
                    .populate([...populate])
                    .sort({ createdAt: -1 })
                    .limit(defaultPaginationCount)
                    .skip(skip)
                    .lean()
                this.res.json({
                    status: true,
                    data: {
                        count: defaultPaginationCount,
                        total: total,
                        data: data,
                    }
                })
            }

        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // Alohida ID boyicha tahrirlash
    async updateById() {
        try {
            const { id } = this.req.params;
            const result = await this.model.findByIdAndUpdate({ _id: id });
            Object.assign(result, this.req.body)
            await result.save()
            this.res.json({ status: true, data: result })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }
    // Alohida ID boyicha o'chirish
    async deleteById() {
        try {
            const { id } = this.req.params;
            await this.model.findByIdAndDelete({ _id: id });
            this.res.json({ status: true, data: null })
        }
        catch (error) {
            this.res.json({ status: false, message: error.message })
        }
    }

}
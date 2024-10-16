// test/api.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    // Pengujian GET semua item
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    // Pengujian POST membuat item baru
    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });
    // Pengujian UPDATE item
describe('PUT /api/items/:id', () => {
    // Skenario 1: Update item berhasil
    it('should update an existing item', (done) => {
        const updatedItem = { name: 'Updated Item 1' };
        request(app)
            .put('/api/items/1')
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id', 1);
                expect(res.body).to.have.property('name', 'Updated Item 1');
                done();
            });
    });

    // Skenario 2: Gagal update karena item tidak ditemukan
    it('should return 404 if the item is not found', (done) => {
        const updatedItem = { name: 'Non-existent Item' };
        request(app)
            .put('/api/items/999')
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Skenario 3: Update item tanpa mengirim data baru (tidak ada perubahan)
    it('should update an item with no new data provided', (done) => {
        request(app)
            .put('/api/items/2')
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id', 2);
                expect(res.body).to.have.property('name', 'Item 2'); // Nama tetap sama
                done();
            });
    });
});

// Pengujian DELETE item
describe('DELETE /api/items/:id', () => {
    // Skenario 1: Hapus item berhasil
    it('should delete an existing item', (done) => {
        request(app)
            .delete('/api/items/1')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');
                done();
            });
    });

    // Skenario 2: Gagal hapus karena item tidak ditemukan
    it('should return 404 if the item to delete is not found', (done) => {
        request(app)
            .delete('/api/items/999')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Skenario 3: Gagal hapus jika parameter ID bukan angka
    it('should return 400 if the item ID is not a number', (done) => {
        request(app)
            .delete('/api/items/abc')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message', 'Invalid item ID');
                done();
            });
    });
});



});
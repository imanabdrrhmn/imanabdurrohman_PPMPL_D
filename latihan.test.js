const { expect } = require('chai');
const { tambah, kali, kurang, bagi } = require('./math');

//Latihan 1
describe('Pengujian Fungsi Matematika Latihan 1 Pengurangan dan Pembagian', function() {
  it('seharusnya mengembalikan 0 saat mengurangkan (-2) - (-2)', function() {
    expect(kurang(-2, -2)).to.equal(0);
  });
  it('seharusnya mengembalikan -2 saat membagi 6 / -3', function() {
    expect(bagi(6, -3)).to.equal(-2);
  });
  it('seharusnya mengembalikan error saat membagi dengan 0', function() {
    expect(() => bagi(6, 0)).to.throw('Tidak bisa membagi dengan nol');
  });
});

//Latihan 2
describe('Pengujian Fungsi Matematika Latihan 2 Perkalian dan Pertambahan', function() {
  it('seharusnya mengembalikan error saat menggunakan (String)', function() {
    expect(() => tambah("a", "b")).to.throw(Error);
    expect(() => tambah( 2, "b")).to.throw(Error);
    expect(() => tambah("a", 2)).to.throw(Error);
  });
  it('seharusnya mengembalikan error saat a/b null', function() {
    expect(() => tambah(null, null)).to.throw(Error);
    expect(() => tambah( 2, null)).to.throw(Error);
    expect(() => tambah(null, 2)).to.throw(Error);
  });
  it('seharusnya mengembalikan error saat a/b undefined', function() {
    expect(() => kali(a, b)).to.throw(Error);
    expect(() => kali( 2, b)).to.throw(Error);
    expect(() => kali(a, 2)).to.throw(Error);
  });


});
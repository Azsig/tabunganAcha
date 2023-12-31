const tabungan = [];
const utang = [];

function Thuman(nama){
    let name = nama
    let thing = [];
    let uang = [];
    let tanggal = [];
    let jumlah = () => {
        let sum = 0
        uang.forEach( num => {
            sum += num;
        })
        return sum;
    }
    return {name, thing, uang, tanggal, jumlah}
}

function tambah(jenis, objek){
    if (jenis === 'Tabungan'){
        tabungan.push(objek);
    }
    else if(jenis === 'Utang'){
        utang.push(objek);
    }
}

const display = (duit, tgl, ket) =>{
    let kotak = document.createElement('div');
    kotak.classList.add('box');
    let money = document.createElement('div');
    money.textContent = `nominal : Rp${duit}`
    let date = document.createElement('div');
    date.textContent = `tanggal : ${tgl}`;
    let note = document.createElement('div');
    note.textContent = `catatan : ${ket}`;
    kotak.appendChild(money);
    kotak.appendChild(date);
    kotak.appendChild(note);

    return kotak
}
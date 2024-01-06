const listNama = document.querySelector('.list');
const inside = document.querySelector('.inside')
let uwongBtn = document.querySelector('#orang');
let isinyaBtn = document.querySelector('#isi')

const displayRupiah = (angka) =>{
    let stringduit = String(angka);
    if(stringduit[0] == '-'){
        return `-Rp${formatRupiah(stringduit)}`
    }
    else{
        return `Rp${formatRupiah(stringduit)}`;
    }
}


const display = (duit, tgl, ket, id) =>{
    let kotak = document.createElement('tr');
    kotak.classList.add('kotak');
    kotak.id = id
    let money = document.createElement('td');
    
    
    money.textContent = displayRupiah(duit);
    let date = document.createElement('td');
    date.textContent = `${tgl}`;
    let note = document.createElement('td');
    note.textContent = `${ket}`;
    kotak.appendChild(date);
    kotak.appendChild(note);
    kotak.appendChild(money);

    return kotak
}

const makeTotal = (Uang) =>{
    let total = document.createElement('tr')
    total.classList.add('kotak')
    let tulisan = document.createElement('th')
    let totalUang = document.createElement('td')
    tulisan.colSpan = "2";
    tulisan.textContent = 'Total';
    totalduit = jumlah(Uang)
    totalUang.textContent = displayRupiah(totalduit);
    total.appendChild(tulisan);
    total.appendChild(totalUang);

    return total;
}

function renderTabel(orang){
    const namaTable = document.querySelector('.nama');
    listNama.classList.add('hidden');
    inside.classList.remove('hidden');
    uwongBtn.classList.add('hidden');
    isinyaBtn.classList.remove('hidden');
    namaTable.textContent = orang.name
    let tabel = document.querySelector('#table')
    let kotakList = document.querySelectorAll('.kotak')
    kotakList.forEach(kotak => {
        kotak.parentNode.removeChild(kotak);
    })
    for(i = 0; i < orang.uang.length; i++){
        let isi = display(orang.uang[i], orang.tanggal[i], orang.thing[i], i)
        tabel.appendChild(isi)
    }
    if(orang.uang.length > 0){
        tabel.appendChild(makeTotal(orang.uang));
    }
    
}



function displayNama (array, index){
    for(i = 0; i < array.length; i++){
        let nama = document.createElement('div');
        nama.classList.add('daftar');
        nama.textContent = array[i].name
        nama.addEventListener('click', () =>{
            let no = array.findIndex((x)=>{return x.name == nama.textContent})
            index = no
            renderTabel(array[index])
        })
        listNama.appendChild(nama);
    }
}

function renderNama(bagian, index){
    inside.classList.add('hidden');
    listNama.classList.remove('hidden')
    isinyaBtn.classList.add('hidden');
    uwongBtn.classList.remove('hidden');
    let namaList = document.querySelectorAll('.daftar');
    namaList.forEach(nama =>{
        nama.parentNode.removeChild(nama);
    })

    displayNama(bagian, index);
}

function formatRupiah(angka){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    
}

module.export = {renderNama, renderTabel, formatRupiah};
let tabungan = [];
let utang = [];

function Thuman(nama){
    let name = nama
    let thing = [];
    let uang = [];
    let tanggal = [];
    return {name, thing, uang, tanggal}
}

function tambah(jenis, objek){
    if (jenis === 'Tabungan'){
        tabungan.push(objek);
    }
    else if(jenis === 'Utang'){
        utang.push(objek);
    }
}


let biji = ''

const isian = () => {

    let section = 'Tabungan'
    
   

    
    const tabunganTab = document.querySelector('.nav-tabungan');
    const utangTab = document.querySelector('.nav-utang');
    const listNama = document.querySelector('.list');
    const inside = document.querySelector('.inside')
    let uwongBtn = document.querySelector('#orang');
    let isinyaBtn = document.querySelector('#isi')
    let hapus = document.querySelector('#hapus');
    const Name = document.querySelector('#Name')
    const NameHapus = document.querySelector('#NameHapus');
    const cancelList = document.querySelectorAll('.cancel');
    const okOrang = document.querySelector('#okOrang');
    const okIsi = document.querySelector('#okIsi');
    const ambil = document.querySelector('#ambil')
    


    let index = 0;


    let jumlah = (Uang) => {
        let sum = 0
        Uang.forEach( num => {
            sum += num;
        })
        return sum;
    }


    cancelList.forEach(cancel => {
        cancel.addEventListener('click', () =>{
            let formBG = document.querySelector('.formBG');
            parent = cancel.parentNode;
            old = parent.parentNode;
            old.classList.add('hidden');
            formBG.classList.add('hidden')
        })
    })

    const displayRupiah = (angka) =>{
        let stringduit = String(angka);
        if(stringduit[0] == '-'){
            return `-Rp${formatRupiah(stringduit)}`
        }
        else{
            return `Rp${formatRupiah(stringduit)}`;
        }
    }

    function makeDelete(orang){
        let td = document.createElement('td');
        td.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
        td.id = 'delete';
        td.addEventListener('click', () => {
            let parent = td.parentNode
            let no = parseInt(parent.id);
            orang.uang.splice(no, 1);
            orang.tanggal.splice(no,1);
            orang.thing.splice(no, 1);
            let lib = '';
            if (section === 'Tabungan'){
                lib = tabungan;
            }
            else if(section === 'Utang'){
                lib = utang;
            }
            renderTabel(lib[index])
            saveData()
        });
        return td
    }


    const display = (orang ,duit, tgl, ket, id) =>{
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
        kotak.appendChild(makeDelete(orang));
    
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
        hapus.classList.add('hidden');
        isinyaBtn.classList.remove('hidden');
        namaTable.textContent = orang.name
        let tabel = document.querySelector('#table')
        let kotakList = document.querySelectorAll('.kotak')
        kotakList.forEach(kotak => {
            kotak.parentNode.removeChild(kotak);
        })
        for(i = 0; i < orang.uang.length; i++){
            let isi = display(orang, orang.uang[i], orang.tanggal[i], orang.thing[i],i)
            tabel.appendChild(isi)
        }
        if(orang.uang.length > 0){
            tabel.appendChild(makeTotal(orang.uang));
        }
        
    }

    

    function displayNama (array){
        for(i = 0; i < array.length; i++){
            let nama = document.createElement('div');
            let duwet = document.createElement('div');
            let namatext = document.createElement('div');
            duwet.textContent = displayRupiah(jumlah(array[i].uang))
            nama.classList.add('daftar');
            namatext.textContent = array[i].name
            nama.appendChild(namatext);
            nama.appendChild(duwet);
            nama.addEventListener('click', () =>{
                let no = array.findIndex((x)=>{return x.name == namatext.textContent})
                index = no
                renderTabel(array[index])
            })

            listNama.appendChild(nama);
        }
    }

    function renderNama(bagian){
        inside.classList.add('hidden');
        listNama.classList.remove('hidden')
        isinyaBtn.classList.add('hidden');
        uwongBtn.classList.remove('hidden');
        hapus.classList.remove('hidden');
        let namaList = document.querySelectorAll('.daftar');
        namaList.forEach(nama =>{
            nama.parentNode.removeChild(nama);
        })

        displayNama(bagian)
    }

    tabunganTab.addEventListener('click', () =>{
        tabunganTab.classList.add('active');
        utangTab.classList.remove('active');

        section = 'Tabungan'

        renderNama(tabungan);
    })

    utangTab.addEventListener('click', () =>{
        tabunganTab.classList.remove('active');
        utangTab.classList.add('active');

        section = 'Utang'

        renderNama(utang)
    }) 

    hapus.addEventListener('click', () =>{
        let formBG = document.querySelector('.formBG');
        let form1 = document.querySelector('.Hapus');
        formBG.classList.remove('hidden');
        form1.classList.remove('hidden')
    })

    uwongBtn.addEventListener('click', () =>{
        let formBG = document.querySelector('.formBG');
        let form1 = document.querySelector('.orang');
        formBG.classList.remove('hidden');
        form1.classList.remove('hidden')
    });

    isinyaBtn.addEventListener('click', ()=>{
        let formBG = document.querySelector('.formBG');
        let form2 = document.querySelector('.isian');
        formBG.classList.remove('hidden');
        form2.classList.remove('hidden');
    })

    okhapus.addEventListener('click', ()=>{
        let lib = '';
        if (section === 'Tabungan'){
            lib = tabungan;
        }
        else if(section === 'Utang'){
            lib = utang;
        }
        let no = lib.findIndex((x)=>{return x.name == NameHapus.value});
        lib.splice(no, 1);
        saveData()
        renderNama(lib);
        NameHapus.value = ''
        let formBG = document.querySelector('.formBG');
        let form1 = document.querySelector('.Hapus');
        formBG.classList.add('hidden');
        form1.classList.add('hidden')
    })

    okOrang.addEventListener('click', ()=>{
        if(Name.value === ''){
            return
        }
        tambah(section, Thuman(Name.value));
        let formBG = document.querySelector('.formBG');
        formBG.classList.add('hidden');
        let form1 = document.querySelector('.orang');
        form1.classList.add('hidden');
        let lib = '';
        if (section === 'Tabungan'){
            lib = tabungan;
        }
        else if(section === 'Utang'){
            lib = utang;
        }
        saveData()
        renderNama(lib);
        Name.value = ''
    })

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


    money.addEventListener('keyup', function(e){
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        money.value = formatRupiah(this.value);
    });

    okIsi.addEventListener('click', ()=>{
        const money = document.querySelector('#money');
        const date = document.querySelector('#date');
        const note = document.querySelector('#note');
        if(money.value === ''){
            return;
        }
        let lib = '';
        if (section === 'Tabungan'){
            lib = tabungan;
        }
        else if(section === 'Utang'){
            lib = utang;
        }
        let okane = money.value
        if(ambil.checked == true ){
            okane = '-'+money.value;
        }
        
        tableuang = lib[index].uang
        tableket = lib[index].thing
        tabletgl = lib[index].tanggal
        tableuang.push(parseInt(okane.replace(/\./g,'')));
        tabletgl.push(date.value);
        tableket.push(note.value);
        saveData();

        renderTabel(lib[index])

        money.value = ''
        date.value = ''
        note.value = ''

        let formBG = document.querySelector('.formBG');
        formBG.classList.add('hidden');
        let form2 = document.querySelector('.isian');
        form2.classList.add('hidden');
    })

    function saveData (){
        localStorage.setItem(`tabungan`, JSON.stringify(tabungan));
        localStorage.setItem(`utang`, JSON.stringify(utang));
    }

    function reload(){
        if(!localStorage.tabungan && !localStorage.utang){
            if(section === 'Tabungan'){
                renderNama(tabungan);
            }
            else if(section === 'Utang'){
                renderNama(utang);
            }
        }
        else{
            let save = localStorage.getItem('tabungan');
            let loan = localStorage.getItem('utang');
            save = JSON.parse(save);
            loan = JSON.parse(loan);
            tabungan = save
            utang = loan
            if(section === 'Tabungan'){
                renderNama(tabungan);
            }
            else if(section === 'Utang'){
                renderNama(utang);
            }
        }
    }
    reload()
    
}

let mulai = isian()
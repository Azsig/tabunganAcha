const tabungan = [];
const utang = [];

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



const isian = () => {
    const tabunganTab = document.querySelector('.nav-tabungan');
    const utangTab = document.querySelector('.nav-utang');
    const listNama = document.querySelector('.list');
    const inside = document.querySelector('.inside')
    let uwongBtn = document.querySelector('#orang');
    let isinyaBtn = document.querySelector('#isi')
    let section = 'Tabungan'
    const Name = document.querySelector('#Name')
    const money = document.querySelector('#money');
    const date = document.querySelector('#date');
    const note = document.querySelector('#note');
    const cancelList = document.querySelectorAll('.cancel');
    const okOrang = document.querySelector('#okOrang');
    const okIsi = document.querySelector('#okIsi');
    const namaTable = document.querySelector('.nama');


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
            formBG.classList.add('hidden')
        })
    })


    const display = (duit, tgl, ket) =>{
        let kotak = document.createElement('tr');
        kotak.classList.add('kotak');
        let money = document.createElement('td');
        money.textContent = `Rp${duit}`
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
        totalUang.textContent = `Rp${jumlah(Uang)}`
        total.appendChild(tulisan);
        total.appendChild(totalUang);

        return total;
    }

    function renderTabel(orang){
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
            let isi = display(orang.uang[i], orang.tanggal[i], orang.thing[i])
            tabel.appendChild(isi)
        }
        if(orang.uang.length > 0){
            tabel.appendChild(makeTotal(orang.uang));
        }
        
    }

    

    function displayNama (array){
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

    function renderNama(bagian){
        inside.classList.add('hidden');
        listNama.classList.remove('hidden')
        isinyaBtn.classList.add('hidden');
        uwongBtn.classList.remove('hidden');
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

    uwongBtn.addEventListener('click', () =>{
        let formBG = document.querySelector('.formBG');
        let form1 = document.querySelector('.orang');
        let form2 = document.querySelector('.isian');
        formBG.classList.remove('hidden');
        form1.classList.remove('hidden')
        form2.classList.add('hidden');
    });

    isinyaBtn.addEventListener('click', ()=>{
        let formBG = document.querySelector('.formBG');
        let form1 = document.querySelector('.orang');
        let form2 = document.querySelector('.isian');
        formBG.classList.remove('hidden');
        form2.classList.remove('hidden');
        form1.classList.add('hidden');
    })

    okOrang.addEventListener('click', ()=>{
        if(Name.value === ''){
            return
        }
        tambah(section, Thuman(Name.value));
        let formBG = document.querySelector('.formBG');
        formBG.classList.add('hidden');
        let lib = '';
        if (section === 'Tabungan'){
            lib = tabungan;
        }
        else if(section === 'Utang'){
            lib = utang;
        }
        renderNama(lib);
    })

    okIsi.addEventListener('click', ()=>{
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
        tableuang = lib[index].uang
        tableket = lib[index].thing
        tabletgl = lib[index].tanggal
        tableuang.push(parseInt(money.value));
        tabletgl.push(date.value);
        tableket.push(note.value);

        renderTabel(lib[index])

        let formBG = document.querySelector('.formBG');
        formBG.classList.add('hidden');
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
            if(section === 'Tabungan'){
                renderNama(tabungan);
            }
            else if(section === 'Utang'){
                renderNama(utang);
            }
        }
    }
}

let mulai = isian()
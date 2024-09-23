function formatNumberInput(element) {
    element.value = element.value.replace(/,/g, '');
    const value = parseFloat(element.value);
    if (!isNaN(value)) {
        element.value = value.toLocaleString('en-US');
    }
}

document.getElementById('saldoAwal').addEventListener('input', function () {
    formatNumberInput(this);
});
document.getElementById('sukuBunga').addEventListener('input', function () {

    formatFloatInput(this);
});
document.getElementById('waktu').addEventListener('input', function () {
    formatNumberInput(this);
});

function hitungBunga() {

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = '';

    // error handling

    // Ambil nilai dari input form
    const saldoAwal = parseFloat(document.getElementById('saldoAwal').value.replace(/,/g, ''));
    const sukuBunga = parseFloat(document.getElementById('sukuBunga').value.replace(/,/g, '')) / 100;
    const waktu = parseInt(document.getElementById('waktu').value.replace(/,/g, ''));
    const jenisBunga = document.getElementById('jenisBunga').value;

    // Bersihkan hasil perhitungan sebelumnya
    const hasilPerhitungan = document.getElementById('hasilPerhitungan');
    hasilPerhitungan.innerHTML = '';

     if (jenisBunga === 'tunggal') {
        // Set header tabel
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
    
        // Menghitung saldo akhir dengan bunga tunggal
        const bungaTunggal = saldoAwal * sukuBunga * waktu; // Menghitung total bunga selama periode waktu
        const saldoAkhir = saldoAwal + bungaTunggal; // Menghitung saldo akhir setelah bunga
    
        for (let bulan = 1; bulan <= waktu; bulan++) {
            // Menghitung bunga setiap bulan (tidak bertambah karena tunggal)
            const bunga = saldoAwal * sukuBunga; // Bunga tetap setiap bulan
    
            // Membuat baris baru untuk setiap bulan
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${bulan}</td>
                <td class="border px-4 py-2">${bunga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${(saldoAwal + (bunga * bulan)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
            `;
    
            // Menambahkan baris ke tabel hasil
            hasilPerhitungan.appendChild(row);
        }
    }
    else if (jenisBunga === 'majemuk') {
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
        let saldo = saldoAwal;
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldo * sukuBunga;
          sisaSaldo =  saldo += bunga;

            const row = document.createElement('tr');
            row.innerHTML = `<td class="border px-4 py-2">${bulan}</td>
                             <td class="border px-4 py-2">${bunga.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                            <td class="border px-4 py-2">${saldo.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>`;
            hasilPerhitungan.appendChild(row);
        }
    } 
     // Annuity calculation logic
     else if (jenisBunga === 'anuitas') {
        // Set table headers
        document.getElementById('headerTabel').innerText = 'Jumlah Angsuran';
        document.getElementById('BungaPokok').style.display = 'table-cell';
        document.getElementById('saldoTersisaHeader').style.display = '';
    
        // Ubah suku bunga ke bunga bulanan
        const bungaBulanan = sukuBunga ;
        // Hitung jumlah angsuran bulanan (anuitas)
        const anuitas = saldoAwal * (bungaBulanan / (1 - Math.pow(1 + bungaBulanan, -waktu)));
        let saldoTersisa = saldoAwal;
        let totalPokokDibayar = 0; // Variabel untuk melacak total pokok yang dibayar
    
        for (let bulan = 1; bulan <= waktu; bulan++) {
            // Hitung bunga bulan ini berdasarkan saldo tersisa
            const bungaBulanIni = saldoTersisa * bungaBulanan;
    
            // Hitung angsuran pokok bulan ini
            const angsuranPokok = anuitas - bungaBulanIni;
    
            // Kurangi angsuran pokok dari saldo tersisa
            saldoTersisa -= angsuranPokok;
    
            // Akumulasi total pokok yang dibayar
            totalPokokDibayar += angsuranPokok;
    
            // Membuat baris baru untuk tabel hasil
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${bulan}</td>
                <td class="border px-4 py-2">${angsuranPokok.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${bungaBulanIni.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${anuitas.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${saldoTersisa.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
            `;
    
            // Menambahkan baris ke tabel hasil
            hasilPerhitungan.appendChild(row);
        }
    
        // Tampilkan total pokok yang dibayar di bagian bawah untuk validasi
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td class="border px-4 py-2 font-bold" colspan="3">Total Pokok Dibayar</td>
            <td class="border px-4 py-2 font-bold">${totalPokokDibayar.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
            <td class="border px-4 py-2"></td>
        `;
        hasilPerhitungan.appendChild(totalRow);
    
        // Validasi: Pastikan total pokok yang dibayar sama dengan saldo awal
        if (Math.abs(totalPokokDibayar - saldoAwal) > 0.01) {
            console.error('Total pokok yang dibayar tidak sesuai dengan saldo awal.');
        }
    }
    
    
    
    
   

}



// Mobile menu toggle
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-me=nu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
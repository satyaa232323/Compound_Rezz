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
    // Ambil nilai dari input form
    const saldoAwal = parseFloat(document.getElementById('saldoAwal').value.replace(/,/g, ''));
    const sukuBunga = parseFloat(document.getElementById('sukuBunga').value.replace(/,/g, '')) / 100;
    const waktu = parseInt(document.getElementById('waktu').value.replace(/,/g, ''));
    const jenisBunga = document.getElementById('jenisBunga').value;

    // Bersihkan hasil perhitungan sebelumnya
    const hasilPerhitungan = document.getElementById('hasilPerhitungan');
    hasilPerhitungan.innerHTML = '';

    if (jenisBunga === 'tunggal') {
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldoAwal * sukuBunga;
            const saldoAkhir = saldoAwal + bunga;

            const row = document.createElement('tr');
            row.innerHTML = `<td class="border px-4 py-2">${bulan}</td>
                             <td class="border px-4 py-2">${bunga.toLocaleString('en-US')}</td>
                             <td class="border px-4 py-2">${saldoAkhir.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>`;
            hasilPerhitungan.appendChild(row);
        }
    } else if (jenisBunga === 'majemuk') {
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
        let saldo = saldoAwal;
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldo * sukuBunga;
            saldo += bunga;

            const row = document.createElement('tr');
            row.innerHTML = `<td class="border px-4 py-2">${bulan}</td>
                             <td class="border px-4 py-2">${bunga.toLocaleString('en-US')}</td>
                            <td class="border px-4 py-2">${saldo.toLocaleString('en-US')}</td>`;
            hasilPerhitungan.appendChild(row);
        }
    } 
    else if (jenisBunga === 'anuitas') {
        // Mengubah header tabel sesuai dengan jenis perhitungan
        document.getElementById('headerTabel').innerText = 'Jumlah Angsuran';
        document.getElementById('BungaPokok').style.display = 'table-cell';
        document.getElementById('saldoTersisaHeader').style.display = '';
    
        let saldoTersisa = saldoAwal;
    
        // Menghitung jumlah angsuran anuitas tetap
        const anuitas = saldoAwal * (sukuBunga / (1 - Math.pow(1 + sukuBunga, -waktu)));
    
        for (let bulan = 1; bulan <= waktu; bulan++) {
            // Menghitung bunga untuk bulan ini
            const bunga = saldoTersisa * sukuBunga;
    
            // Menghitung pokok yang dibayarkan bulan ini
            const pokok = anuitas - bunga;
    
            // Mengurangi pokok dari saldo tersisa
            saldoTersisa -= pokok;
    
            // Membuat baris baru untuk tabel hasil
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${bulan}</td>
                <td class="border px-4 py-2">${bunga.toLocaleString('en-US')}</td>
                <td class="border px-4 py-2">${pokok.toLocaleString('en-US')}</td>
                <td class="border px-4 py-2">${anuitas.toLocaleString('en-US')}</td>
                <td class="border px-4 py-2">${saldoTersisa.toLocaleString('en-US')}</td>
            `;
    
            // Menambahkan baris ke tabel hasil
            hasilPerhitungan.appendChild(row);
        }
    }

}


// Mobile menu toggle
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
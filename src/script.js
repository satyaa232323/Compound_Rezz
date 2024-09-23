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
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldoAwal * sukuBunga;
            const saldoAkhir = saldoAwal + bunga;

            const row = document.createElement('tr');
            row.innerHTML = `<td class="border px-4 py-2">${bulan}</td>
                             <td class="border px-4 py-2">${bunga.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                             <td class="border px-4 py-2">${saldoAkhir.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>`;
            hasilPerhitungan.appendChild(row);
        }
    } 
    else if (jenisBunga === 'majemuk') {
        document.getElementById('headerTabel').innerText = 'Saldo Akhir';
        document.getElementById('saldoTersisaHeader').style.display = 'none';
        let saldo = saldoAwal;
        for (let bulan = 1; bulan <= waktu; bulan++) {
            const bunga = saldo * sukuBunga;
            saldo += bunga;

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

        Bunga = sukuBunga / 12;
        // Monthly annuity payment calculation
        const anuitas = saldoAwal * (Bunga / (1 - Math.pow(1 + Bunga, -waktu)));
        
        let saldoTersisa = saldoAwal;

        for (let bulan = 1; bulan <= waktu; bulan++) {
            // Calculate interest for this month
            const SisaBunga = saldoTersisa * Bunga;

            // Calculate principal payment for this month
            const angsuranPokok = anuitas - SisaBunga;

            // Deduct principal payment from remaining balance
            saldoTersisa -= angsuranPokok;

            // Create a new row for the result table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${bulan}</td>
                <td class="border px-4 py-2">${angsuranPokok.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${SisaBunga.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${anuitas.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
                <td class="border px-4 py-2">${saldoTersisa.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</td>
            `;

            // Append the row to the result table
            hasilPerhitungan.appendChild(row);
        }
  
    }
   

}



// Mobile menu toggle
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-me=nu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
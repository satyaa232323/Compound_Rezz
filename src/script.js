function formatNumberInput(element) {
    element.value = element.value.replace(/,/g, '');
    const value = parseFloat(element.value);
    if (!isNaN(value)) {
        element.value = value.toLocaleString('en-US');
    }
    }
    
    document.getElementById('saldoAwal').addEventListener('input', function() {
    formatNumberInput(this);
    });
    document.getElementById('sukuBunga').addEventListener('input', function() {
    formatNumberInput(this);
    });
    document.getElementById('waktu').addEventListener('input', function() {
    formatNumberInput(this);
    });
    
    function hitungSemuaBunga() {
    // Ambil nilai dari input form
    const saldoAwal = parseFloat(document.getElementById('saldoAwal').value.replace(/,/g, ''));
    const sukuBunga = parseFloat(document.getElementById('sukuBunga').value.replace(/,/g, '')) / 100;
    const waktu = parseFloat(document.getElementById('waktu').value.replace(/,/g, ''));
    
    // Validasi input
    if (isNaN(saldoAwal) || isNaN(sukuBunga) || isNaN(waktu)) {
        alert("Harap masukkan nilai yang valid.");
        return;
    }

    // Tabel Bunga Tunggal
    let hasilBungaTunggalHTML = '';
    let saldoTunggal = saldoAwal;
    for (let i = 1; i <= waktu; i++) {
        const bungaTunggal = saldoAwal * sukuBunga * i;
        const saldoAkhirTunggal = saldoAwal + bungaTunggal;
        hasilBungaTunggalHTML += `<tr><td class="px-4 py-2 border">${i}</td><td class="px-4 py-2 border">${saldoAkhirTunggal.toLocaleString('en-US')}</td></tr>`;
    }
    document.getElementById('hasilBungaTunggal').innerHTML = hasilBungaTunggalHTML; 

    

    // Tabel Bunga Majemuk
    let saldoMajemuk = saldoAwal;
    let hasilBungaMajemukHTML = '';
    for (let i = 1; i <= waktu; i++) {
        saldoMajemuk *= (1 + sukuBunga);
        hasilBungaMajemukHTML += `<tr><td class="px-4 py-2 border">${i}</td><td class="px-4 py-2 border">${saldoMajemuk.toLocaleString('en-US')}</td></tr>`;
    }
    document.getElementById('hasilBungaMajemuk').innerHTML = hasilBungaMajemukHTML;
    
    // Tabel Anuitas
    let saldoAnuitas = saldoAwal;
    const anuitasBulanan = saldoAwal * (sukuBunga * Math.pow(1 + sukuBunga, waktu)) / (Math.pow(1 + sukuBunga, waktu) - 1);
    let hasilAnuitasHTML = '';
    for (let i = 1; i <= waktu; i++) {
        const pembayaranBunga = saldoAnuitas * sukuBunga;
        const pembayaranPokok = anuitasBulanan - pembayaranBunga;
        saldoAnuitas -= pembayaranPokok;
        hasilAnuitasHTML += `<tr><td class="px-4 py-2 border">${i}</td><td class="px-4 py-2 border">${anuitasBulanan.toLocaleString('en-US')}</td><td class="px-4 py-2 border">${saldoAnuitas.toLocaleString('en-US')}</td></tr>`;
    }
    document.getElementById('hasilAnuitas').innerHTML = hasilAnuitasHTML;
    }
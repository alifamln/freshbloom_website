document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = form.querySelector("[name='nama']").value;
        const alamat = form.querySelector("[name='alamat']").value;

        const produkList = Array.from(document.querySelectorAll("input[name='produk']"));
        const hasilPesanan = [];
        let totalBayar = 0;

        produkList.forEach((produkInput) => {
            const wrapper = produkInput.closest("label");
            const harga = Number(produkInput.dataset.harga);
            const jumlahInput = wrapper.querySelector("input[name='jumlah']");
            const jumlah = parseInt(jumlahInput.value);

            if (produkInput.checked && jumlah > 0) {
                const namaProduk = wrapper.textContent.trim().split("\n")[0];
                const subtotal = harga * jumlah;
                hasilPesanan.push(`${namaProduk} x ${jumlah} = Rp ${subtotal.toLocaleString()}`);
                totalBayar += subtotal;
            }
        });

        if (hasilPesanan.length === 0) {
            alert("Pilih produk dan isi jumlah minimal 1.");
            return;
        }

        const query = new URLSearchParams({
            nama,
            alamat,
            pesanan: hasilPesanan.join(" || "),
            total: totalBayar
        });

        window.location.href = `invoice.html?${query.toString()}`;
    });
});
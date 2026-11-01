
"use strict";

console.log("P09 JavaScript aktif");

// Data produk UMKM
const produkUmkm = [
  { nama: "Kopi Mantan", kategori: "Kopi", harga: 30000, stok: 12 },
  { nama: "Cold Brew Aren", kategori: "Kopi", harga: 22000, stok: 4 },
  { nama: "Matchalate", kategori: "Kopi", harga: 27000, stok: 20 },
  { nama: "Red velvet", kategori: "Non-Kopi", harga: 25000, stok: 4 },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 75000, stok: 0 },
];

console.table(produkUmkm);

// Formatter rupiah
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

// Function status stok
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// Tes status stok setiap produk
produkUmkm.forEach((produk) => {
  console.log(produk.nama, statusStok(produk.stok));
});


function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}


function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // Periksa apakah elemen tersedia di halaman
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0
      ? "Siap dipesan"
      : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;

  ringkasan.textContent =
    `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);

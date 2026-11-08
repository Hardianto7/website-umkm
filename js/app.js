"use strict";

console.log("JavaScript aktif");

// 1. Data produk UMKM
const produkUmkm = [
  { nama: "Kopi Mantan", kategori: "Kopi", harga: 30000, stok: 12, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Kopi", harga: 22000, stok: 4, unggulan: false },
  { nama: "Matchalateh", kategori: "Non-kopi", harga: 27000, stok: 20, unggulan: false },
  { nama: "Red Velvet", kategori: "Non-Kopi", harga: 25000, stok: 4, unggulan: false },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 75000, stok: 0, unggulan: false },
];

console.table(produkUmkm);

// Debugging data produk
produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

// 2. Function format rupiah
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

// Tes format rupiah
console.log(formatRupiah(produkUmkm[0].harga));

// 3. Function status stok
function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// Tes tiga kemungkinan status stok
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

// 4. Function membuat kartu produk
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

// Tes status stok setiap produk
produkUmkm.forEach((produk) => {
  console.log(produk.nama, statusStok(produk.stok));
});

// 5. Function label kategori
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Non-kopi":
      return "Pilihan minuman non-kopi";
    case "Non-Kopi":
      return "Pilihan minuman non-kopi";
    default:
      return "Produk UMKM";
  }
}

// 6. Function render produk
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  // Memeriksa kelengkapan elemen HTML
  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  // Mengambil produk yang stoknya tersedia
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );

  // Mencari produk unggulan
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  // Mengubah data produk menjadi HTML
  const markupProduk = produkTersedia
    .map(buatKartuProduk)
    .join("");

  // Menampilkan produk ke halaman
  grid.innerHTML = markupProduk;

  // Menampilkan ringkasan produk
  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;

  // Menampilkan produk unggulan
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  // Menampilkan tabel data di Console
  console.table(produkUmkm);

  // Menampilkan hasil ke Console
  console.log("Jumlah produk tersedia:", produkTersedia.length);
  console.log("Produk unggulan:", produkUnggulan);
}

//Jalankan setelah HTML selesai dimuat
document.addEventListener("DOMContentLoaded", renderProduk);

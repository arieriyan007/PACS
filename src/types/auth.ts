// Bentuk input yang dikirim halaman login ke service autentikasi
export interface KredensialMasuk {
    namaPengguna: string
    kataSandi: string
}

// Identitas pengguna contoh dikembalikan service mock
// tipe ini tidak menyimpan kata sandi atau token
export interface PenggunaDemo {
    id: string
    namaTampil: string
    peran: string
}
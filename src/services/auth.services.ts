// Fungsi mock menerima KredensialMasuk dan mengembalikan Promise

import type { KredensialMasuk, PenggunaDemo } from "../types/auth";

// Fungsi melempar error saat simulasi login gagal
export async function masukDenganDemo(
    kredensial: KredensialMasuk,
): Promise<PenggunaDemo> {
    // Tolak input kosong. Kredensial tidak disimpan.
    if (!kredensial.namaPengguna.trim() || !kredensial.kataSandi) {
        throw new Error('Nama pengguna dan kata sandi wajib diisi.')
    }

    // Mengembalikan identitas contoh agar halaman dapat melanjutkan alur demo.
    return {
        id:'DEMO-USER-001',
        namaTampil: kredensial.namaPengguna.trim(),
        peran: 'Pengguna Demo',
    }
}
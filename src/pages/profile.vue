<script setup lang="ts">

    // Data profil statis untuk menampilkan halaman profile petugas.
    const profilPetugas = {
        nama: 'Siti Patimah',
        idPegawai: 'PGW-001',
        peran: 'Radiografer',
        unit: 'Radiologi',
        email: 'siti.patimah@example.test',
    }

</script>

<template>
    <section class="profile-page">
        <header class="page-header">
            <div>
                <p class="eyebrow">Profil Petugas</p>
                <h1>Profil Saya</h1>
                <p class="page-description">
                    Informasi profil contoh untuk tampilan aplikasi PACS.
                </p>
            </div>
        </header>

        <article class="profile-card">
            <div class="avatar profile-avatar" aria-hidden="true">SP</div>

            <dl class="profile-details">
                <div>
                    <dt>Nama</dt>
                    <dd>{{ profilPetugas.nama }}</dd>
                </div>
                <div>
                    <dt>ID Pegawai</dt>
                    <dd>{{ profilPetugas.idPegawai }}</dd>
                </div>
                <div>
                    <dt>Jabatan</dt>
                    <dd>{{ profilPetugas.peran }}</dd>
                </div>
                <div>
                    <dt>Unit</dt>
                    <dd>{{ profilPetugas.unit }}</dd>
                </div>
                <div>
                    <dt>Email</dt>
                    <dd>{{ profilPetugas.email }}</dd>
                </div>
            </dl>

            <p class="profile-demo-note">
                Data ini hanya dummy petugas.
            </p>
        </article>
        
    </section>
</template>
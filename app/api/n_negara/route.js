import prisma from '@/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const n_negara = parseInt(searchParams.get('n_negara')) || 10; // Jumlah negara yang ditampilkan per page
    const page = parseInt(searchParams.get('page')) || 1; // Halaman saat ini

    const totalNegaras = await prisma.negara.count(); // Total data negara di database
    const negaras = await prisma.negara.findMany({
        skip: (page - 1) * n_negara,
        take: n_negara,
        include: {
            kawasan: true,
            direktorat: true,
        },
    });

    const response = {
        data: negaras,
        totalNegaras, // Jumlah total negara
        page, // Halaman saat ini
        totalPages: Math.ceil(totalNegaras / n_negara), // Total halaman yang tersedia
    };

    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

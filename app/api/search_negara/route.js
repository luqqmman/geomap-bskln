import prisma from '@/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('name') || ''; // Nama negara yang dicari

    const negaras = await prisma.negara.findMany({
        where: {
            namaNegara: {
                contains: searchTerm,
                mode: 'insensitive', // Tidak case-sensitive
            },
        },
        include: {
            kawasan: true,
            direktorat: true,
        },
    });

    return new Response(JSON.stringify({ data: negaras }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

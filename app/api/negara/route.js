import prisma from '@/lib/prisma';

export async function GET(req) {
    const negaras = await prisma.negara.findMany({
        include: {
            kawasan: true,
            direktorat: true,
        },
    });

    return new Response(JSON.stringify(negaras), { status: 200, headers: { 'Content-Type': 'application/json' }});
}

export async function POST(req) {
    const { namaNegara, kodeNegara, idKawasan, idDirektorat } = await req.json();

    const newNegara = await prisma.negara.create({
        data: {
            namaNegara,
            kodeNegara,
            kawasan: {
                connect: { id: parseInt(idKawasan) }, 
            },
            direktorat: {
                connect: { id: parseInt(idDirektorat) }, 
            },
        }
    });

    return new Response(JSON.stringify(newNegara), { status: 201 });
}

export async function PUT(req) {
    const { idNegara, namaNegara, kodeNegara, idKawasan, idDirektorat } = await req.json();

    const updatedNegara = await prisma.negara.update({
        where: { id: idNegara },
        data: {
            namaNegara,
            kodeNegara,
            kawasan: {
                connect: { id: parseInt(idKawasan) }, 
            },
            direktorat: {
                connect: { id: parseInt(idDirektorat) }, 
            },
        },
    });

    return new Response(JSON.stringify(updatedNegara), { status: 200 });
}

export async function DELETE(req) {
    const { idNegara } = await req.json();

    await prisma.negara.delete({
        where: { id: idNegara },
    });

    return new Response(JSON.stringify({"message" : `successfully delete negara with id ${idNegara}`}), { status: 200 });
}

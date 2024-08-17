import prisma from '@/lib/prisma';

export async function GET(req) {
  const kawasans = await prisma.kawasan.findMany({
    include: {
      // negara: true,
      direktorat: true,
    },
  });

  return new Response(JSON.stringify(kawasans), { status: 200, headers: { 'Content-Type': 'application/json' }});
}


export async function POST(req) {
  const { namaKawasan, idDirektorat } = await req.json();

  const newKawasan = await prisma.kawasan.create({
    data: {
      namaKawasan,
      direktorat: {
        connect: { id: parseInt(idDirektorat) }, // Correcting the field name to `id`
      },
    },
  });

  return new Response(JSON.stringify(newKawasan), { status: 201 });
}


export async function PUT(req) {
  const { idKawasan, namaKawasan, idDirektorat } = await req.json();

  const updatedKawasan = await prisma.kawasan.update({
    where: { id: idKawasan },
    data: {
      namaKawasan,
      direktorat: {
        connect: { id: parseInt(idDirektorat) }, // Correcting the field name to `id`
      },
    },
  });

  return new Response(JSON.stringify(updatedKawasan), { status: 200 });
}

export async function DELETE(req) {
  const { idKawasan } = await req.json();

  await prisma.kawasan.delete({
    where: { id: idKawasan },
  });

  return new Response(null, { status: 204 });
}

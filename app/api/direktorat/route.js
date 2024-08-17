import prisma from '@/lib/prisma';

export async function GET(req) {
  const direktorats = await prisma.direktorat.findMany({
    // include: {
    //   negara: true,
    //   kawasan: true,
    // },
  });

  return new Response(JSON.stringify(direktorats), { status: 200, headers: { 'Content-Type': 'application/json' }});
}

export async function POST(req) {
  const { namaDirektorat } = await req.json();

  const newDirektorat = await prisma.direktorat.create({
    data: {
      namaDirektorat,
    },
  });

  return new Response(JSON.stringify(newDirektorat), { status: 201 });
}

export async function PUT(req) {
  const { idDirektorat, namaDirektorat } = await req.json();

  const updatedDirektorat = await prisma.direktorat.update({
    where: { id: idDirektorat },
    data: { namaDirektorat },
  });

  return new Response(JSON.stringify(updatedDirektorat), { status: 200 });
}

export async function DELETE(req) {
  const { idDirektorat } = await req.json();

  await prisma.direktorat.delete({
    where: { id: idDirektorat },
  });

  return new Response(null, { status: 204 });
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Dynamic GET handler to fetch specific country by ID
export async function GET(req, { params }) {
  const id = params.id;

  try {
    const negara = await prisma.negara.findUnique({
      where: { id: parseInt(id) },
      include: {
        kawasan: true,
        direktorat: true,
      },
    });

    if (!negara) {
      return new NextResponse(JSON.stringify({ error: 'Negara not found' }), { status: 404 });
    }

    const formattedResponse = {
      id: negara.id,
      country_name: negara.namaNegara,
      created_at: new Date(negara.createdAt).toISOString().split('T')[0], 
      direktorat: {
        id: negara.direktorat?.id || null,
        nama_direktorat: negara.direktorat?.namaDirektorat || null,
      },
      region: {
        id: negara.kawasan?.id || null,
        nama_kawasan: negara.kawasan?.namaKawasan || null,
      }
    };

    return new NextResponse(JSON.stringify(formattedResponse), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Dynamic GET handler to fetch specific country by ID
export async function GET(req, { params }) {
  const id = parseInt(params.id);

  try {
    const kawasan = await prisma.kawasan.findUnique({
      where: { id: id },
      include: {
        negara: true,
      },
    });

    if (!kawasan) {
      return new NextResponse(JSON.stringify({ error: 'Kawasan not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(kawasan), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

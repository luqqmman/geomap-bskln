import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Dynamic GET handler to fetch specific country by ID
export async function GET(req, { params }) {
  const id = parseInt(params.id);

  try {
    const direktorat = await prisma.direktorat.findUnique({
      where: { id: id },
      include: {
        kawasan: true,
        negara: true,
      },
    });

    if (!direktorat) {
      return new NextResponse(JSON.stringify({ error: 'Direktorat not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(direktorat), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

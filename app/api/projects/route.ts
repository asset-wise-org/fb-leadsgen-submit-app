import { NextResponse } from 'next/server';
import { ProjectOptionProps } from '@/app/utils/type';
import { ProjectProps } from '@/app/utils/type';

export async function GET() {
  try {
    const response = await fetch('https://api.assetwise.co.th/cis/api/Master/GetProjects', {
      headers: {
        'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    const options: ProjectOptionProps[] = data.Data.map((project: ProjectProps) => ({
      value: project.ProjectID,
      label: project.ProjectName
    }));
    return NextResponse.json(options);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fetch('https://api.assetwise.co.th/cis/api/Customer/SaveOtherSource', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh',
        'Content-Type': 'application/json'
      }
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

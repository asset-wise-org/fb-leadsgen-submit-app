import { NextResponse } from 'next/server';
import { ProjectOptionProps } from '@/app/utils/type';
import { ProjectProps } from '@/app/utils/type';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_API}/api/Master/GetProjects`, {
      headers: {
        'Authorization': `${process.env.NEXT_PUBLIC_AUTH}`
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

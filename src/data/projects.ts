export interface ProjectSection {
  heading: string;
  paragraphs: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  year: string;
  tags: string;
  objFile: string;
  scale?: number;
  position?: [number, number, number];
  wireframe?: boolean;
  points?: boolean;
  meshes?: boolean;
  pointSize?: number;
}

export const PROJECTS_DB: ProjectData[] = [
  { 
    id: "Template", 
    title: "Projet template", 
    year: "2026", 
    tags: "TEMPLATE", 
    objFile: `${import.meta.env.BASE_URL}models/armadillo.obj`,
    scale: 5, 
    position: [0, -1, -10],
    wireframe: true,
    meshes: true, 
    points: false,
    },
  // { 
  //   id: "Beta", 
  //   title: "Projet Beta", 
  //   year: "2025", 
  //   tags: "TEMPLATE", 
  //   objFile: `${import.meta.env.BASE_URL}models/bunny.obj`,
  //   scale: 30,
  //   position: [0, 0, 0],
  //   wireframe: false,
  //   meshes: false,
  //   points: true,
  //   pointSize: 0.1,
  //   },
  // { 
  //   id: "Gamma", 
  //   title: "Projet Gamma", 
  //   year: "2024", 
  //   tags: "TEMPLATE", 
  //   objFile: `${import.meta.env.BASE_URL}models/teapot.obj`,
  //   scale: 4,
  //   position: [0, 0, -10],
  //   wireframe: true,
  //   meshes: true,
  //   points: false,
  //   pointSize: 0.1,
  // },
];
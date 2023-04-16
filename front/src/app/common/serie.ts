export interface image{
  _id?: string;
  img: string;
}

export interface category{
  _id?: string;
  catName: string;
  catImg: image;
}

export interface Serie {
  _id?: string;
  title: string;
  thumbnail: image;
  gallery: image[];
  category: category[];
  chapters: number;
  emissionYear: number;
  resume: string;
}

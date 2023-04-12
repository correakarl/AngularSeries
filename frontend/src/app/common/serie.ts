interface image{
  _id: string;
  img: string;
  path: string;
}

interface category{
  _id: string;
  catName: string;
  catImg: image;
}

export interface Serie {
  _id: string;
  title: string;
  imgList: image[];
  category: category[];
  chapters: number;
  emissionYear: number;
  resume: string;
}

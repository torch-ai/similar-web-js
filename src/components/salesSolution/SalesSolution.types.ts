import { IFormatParam } from "../Component.types";

export interface ITechnographicsParams extends IFormatParam {}

export interface ITechnographics {
  site_name: string; // "bbc.co.uk"
  global_rank: number; // 66
  category: string; // "News_and_Media"
  category_rank: number; // 9
  technologies: ITechnographicsTechnology[];
}

export interface ITechnographicsTechnology {
  technology_name: string; // "Adobe Marketing Cloud"
  category: string; // "Marketing"
  sub_category: string; // "Marketing"
  free_paid: "Free" | "Paid";
  description: string; // "End-to-end digital marketing solution"
}

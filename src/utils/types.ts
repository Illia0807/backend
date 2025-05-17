// Define the CleaningType type as a set of allowed string values
export type CleaningType ="Regular Cleaning"| "Windows Cleaning"| "Deep Cleaning"|"Office Cleaning";


















//val.1
// export enum CleaningType {
//   REGULAR = "Regular Cleaning",
//   WINDOWS = "Windows Cleaning",
//   DEEP = "Deep Cleaning",
//   OFFICE = "Office Cleaning"
// }

//val 1.2
// export const cleaningTypeList = [
//   "Regular Cleaning",
//   "Windows Cleaning",
//   "Deep Cleaning",
//   "Office Cleaning",
// ] as const;

//val 1.3
// export type CleaningType = typeof cleaningTypeList[number];

//val 1.4
// export interface Clinner {
//   id: number;
//   name: string;
//   img: string; // simplified as string (URL)
//   typeCleaning: string[];
//   rate: string;
//   dateAviable: string[];
//   description: string;
//   price: string;
// }

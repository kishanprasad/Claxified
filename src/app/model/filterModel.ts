export class FilterModel{
    price : number | null;
    state : string | null;
    city  : string | null ;
    nearBy: string | null;
    subCategoryId : number | null;

    mobileBrandId : number[] | null;
    vehicelBrandId : number[] | null;
    noOfOwner : number[] | null;
    kmDriven : number | null;
    fuelType : number[] | null;
    transmissionType : number[] | null;
    year : number[] | null;
}
import { ObjectId } from 'mongoose';

class Category {
  public _id!: ObjectId;
  public Name: string;
  public Description: string;
  public IsListed :boolean

  constructor(Name: string,Description:string) {
    this.Name = Name;
    this.Description = Description;
    this.IsListed = true;
  }
}

export default Category;

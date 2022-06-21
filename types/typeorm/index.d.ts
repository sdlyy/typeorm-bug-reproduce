import * as typeorm from "typeorm";

declare module "typeorm" {
  export declare type FindOptionsWhereProperty<Property> =
    Property extends Promise<infer I>
      ? FindOptionsWhereProperty<NonNullable<I>>
      : Property extends Array<infer I>
      ? FindOptionsWhereProperty<NonNullable<I>>
      : Property extends Buffer
      ? Property | FindOperator<Property>
      : Property extends Date
      ? Property | FindOperator<Property>
      : Property extends ObjectID
      ? Property | FindOperator<Property>
      : Property extends object
      ?
          | FindOptionsWhere<Property>
          | FindOptionsWhere<Property>[]
          | EqualOperator<Property>
          | FindOperator<any>
          | boolean
      : Property | FindOperator<Property>;
  /** :
   * Used for find operations.
   */
  type FindOptionsWhere<Entity> = {
    [P in keyof Entity]?: FindOptionsWhereProperty<NonNullable<Entity[P]>>;
  };
}

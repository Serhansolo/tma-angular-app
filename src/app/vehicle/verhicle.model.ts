// To keep things readable and expectable defining a class for every
// major type inside an app seems a logic step to take.
// The model class itself seems pretty self-explanatory to me.
/**
 * Vehicle model so we can always trust the values entered.
 */
export class Vehicle {
  /**
   * Unique ID for the Vehicle
   */
  id: number;
  /**
   * Brand of the vehicle
   */
  brand: string;
  /**
   * List of available colors for the vehicle
   */
  colors: string[];
  /**
   * Source img URL for the vehicle
   */
  img: string;
  /**
   * Type of the vehicle
   */
  type: string;
}

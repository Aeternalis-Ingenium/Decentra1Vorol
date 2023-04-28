import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Time "mo:base/Time";
import Bool "mo:base/Bool";

actor LendLord {
  stable var currentBalance : Float = 0;
  stable var startTime = Time.now();

  public func topUp(amount : Float) : async () {
    currentBalance += amount;
    Debug.print(debug_show (currentBalance));
  };

  public func withdraw(amount : Float) : async () {
    let resultBalance : Float = currentBalance - amount;
    if (resultBalance >= 0) {
      currentBalance -= amount;
      Debug.print(debug_show (currentBalance));
    } else {
      Debug.print("Insuficient fund! The amount is too large for your balance.");
    };
  };

  public query func checkBalance() : async Float {
    return currentBalance;
  };

  public func calculateCompoundInterest(isTransaction : Bool) : async () {
    let currentTime = Time.now();
    if (isTransaction == true) {
      let elapsedTimeNS = currentTime - startTime;
      let elapsedTimeS = Float.fromInt(elapsedTimeNS / 1000000000);
      currentBalance := currentBalance * (1.01 ** elapsedTimeS);
    } else {
      Debug.print(debug_show (currentBalance));
    };
    startTime := currentTime;
  };
};

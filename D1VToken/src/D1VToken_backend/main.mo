import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor D1VToken {
  let owner : Principal = Principal.fromText("h4rbg-w5jug-padji-4xwab-qjlv4-sytax-pcdmh-gbt25-kg3ek-h7cza-qae");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "D1V";

  private stable var balanceEntries : [(Principal, Nat)] = [];

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  public query func balanceOf(who : Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (msg) func payOut() : async Text {
    Debug.print(debug_show (msg.caller));
    let amount = 10000;
    if (balances.get(msg.caller) == null) {
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let fromBalance : Nat = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);
      let toBalance : Nat = await balanceOf(to);
      let newTOBalance : Nat = toBalance + amount;
      balances.put(to, newTOBalance);
      return "Success";
    } else {
      return "Insufficient Funds";
    };
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };
};

export class TradeOffer {
  constructor({ id, proposerId, partnerId, offered = {}, requested = {}, status = "pending" }) {
    if (!id || !proposerId || !partnerId) {
      throw new Error("TradeOffer must have id, proposer, and partner");
    }

    this.id = id;
    this.proposerId = proposerId;
    this.partnerId = partnerId;
    this.offered = offered;
    this.requested = requested;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  accept() {
    if (this.status !== "pending") {
      throw new Error("Only pending offers can be accepted");
    }
    this.status = "accepted";
    this.updatedAt = new Date();
  }

  reject() {
    if (this.status !== "pending") {
      throw new Error("Only pending offers can be rejected");
    }
    this.status = "rejected";
    this.updatedAt = new Date();
  }

  cancel() {
    if (this.status !== "pending") {
      throw new Error("Only pending offers can be canceled");
    }
    this.status = "cancelled";
    this.updatedAt = new Date();
  }
}

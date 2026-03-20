import { TradeOffer } from "./TradeOffer.js";

export class TradeService {
  constructor({ characterRepository }) {
    this.characterRepository = characterRepository;
  }

  createOffer({ id, proposerId, partnerId, offered, requested }) {
    return new TradeOffer({ id, proposerId, partnerId, offered, requested });
  }

  executeOffer(offer, proposer, partner) {
    if (!(offer instanceof TradeOffer)) {
      throw new Error("Invalid trade offer");
    }

    if (offer.status !== "pending") {
      throw new Error("Can only execute pending offers");
    }

    // Simple support for wallet transfers in offered/requested object
    if (offer.offered.wallet) {
      if (!proposer.wallet.canAfford(offer.offered.wallet)) {
        throw new Error("Proposer cannot afford offered money");
      }
    }

    if (offer.requested.wallet) {
      if (!partner.wallet.canAfford(offer.requested.wallet)) {
        throw new Error("Partner cannot afford requested money");
      }
    }

    // take and give
    if (offer.offered.wallet) {
      proposer.wallet = proposer.wallet.subtract(offer.offered.wallet);
      partner.wallet = partner.wallet.add(offer.offered.wallet);
    }

    if (offer.requested.wallet) {
      partner.wallet = partner.wallet.subtract(offer.requested.wallet);
      proposer.wallet = proposer.wallet.add(offer.requested.wallet);
    }

    // items transfer is domain-specific and external to this service.

    offer.accept();

    return offer;
  }
}

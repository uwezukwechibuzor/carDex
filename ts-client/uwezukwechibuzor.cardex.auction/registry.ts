import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSubmitBid } from "./types/cardex/auction/tx";
import { MsgInitiateAuction } from "./types/cardex/auction/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/uwezukwechibuzor.cardex.auction.MsgSubmitBid", MsgSubmitBid],
    ["/uwezukwechibuzor.cardex.auction.MsgInitiateAuction", MsgInitiateAuction],
    
];

export { msgTypes }
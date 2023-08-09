import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateBid } from "./types/cardex/auction/tx";
import { MsgInitiateAuction } from "./types/cardex/auction/tx";
import { MsgSubmitBid } from "./types/cardex/auction/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/uwezukwechibuzor.cardex.auction.MsgUpdateBid", MsgUpdateBid],
    ["/uwezukwechibuzor.cardex.auction.MsgInitiateAuction", MsgInitiateAuction],
    ["/uwezukwechibuzor.cardex.auction.MsgSubmitBid", MsgSubmitBid],
    
];

export { msgTypes }
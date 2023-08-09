import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgInitiateAuction } from "./types/cardex/auction/tx";
import { MsgSubmitBid } from "./types/cardex/auction/tx";
import { MsgCancelBid } from "./types/cardex/auction/tx";
import { MsgUpdateBid } from "./types/cardex/auction/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/uwezukwechibuzor.cardex.auction.MsgInitiateAuction", MsgInitiateAuction],
    ["/uwezukwechibuzor.cardex.auction.MsgSubmitBid", MsgSubmitBid],
    ["/uwezukwechibuzor.cardex.auction.MsgCancelBid", MsgCancelBid],
    ["/uwezukwechibuzor.cardex.auction.MsgUpdateBid", MsgUpdateBid],
    
];

export { msgTypes }
import {Bidders} from './bidder.model';
import {BidModel} from './bid.model'
import {Schema, model, Types} from 'mongoose';

export interface AuctionType{
    image: string,
    item : string,
    auctionType: string,
    id: string,
    categroy: string,
    date: Date,
    winner: string,
    startingPrice: number,
    status: string
    leadingBid: [bid: number, bidder: string],
    bids: Types.ObjectId[] ,
    market: Types.ObjectId,
    duration: number,
    details : string,
    endDate: Date
}

const auctionSchema = new Schema<AuctionType>({
    image: {type: String, required: true},
    item: {type: String, required: true},
    auctionType: {type: String, required: true},
    categroy: {type: String},
    startingPrice: {type: Number},
    winner: {type: String, default: " "},
    status: {type: String, enum: ['pending', 'ongoing', 'completed'] ,default: 'pending'},
    date: {type: Date, required: true},
    leadingBid: [ ],
    bids: [{type: Schema.Types.ObjectId, ref: 'Bid' }],
    market: {type: Schema.Types.ObjectId, ref: 'Market'},
    duration: {type: Number, default: 1},
    details: {type: String, required: true},
    endDate : {type: Date}
},
{
    timestamps: true
})

auctionSchema.pre('save', function (next) {
    // Ensure duration is available and greater than zero
    if (this.duration && this.duration > 0) {
      const { date, duration } = this;
      console.log(date)
      const durationInMilliseconds = duration * 3600000; // Convert duration to milliseconds
  
      // Get the time zone offset in minutes and convert it to milliseconds
      const timezoneOffsetMilliseconds = date.getTimezoneOffset() * 60000;
  
      // Calculate the endDate, considering the time zone offset
      const endDate = new Date(date.getTime() + durationInMilliseconds - timezoneOffsetMilliseconds);
      this.endDate = endDate;
      this.date = date;

      console.log(date, " end on ", endDate)
    }
  
    next();
  });
  


export const Auction = model<AuctionType>('Auction', auctionSchema)

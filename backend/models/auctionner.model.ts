import {Schema, model} from 'mongoose';
import {Market} from './market.model'

export interface Auctioneer{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
    market: Market;
    date: Date;
}
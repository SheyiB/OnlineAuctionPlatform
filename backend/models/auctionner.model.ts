import {Schema, model} from 'mongoose';

export interface Auctioneer{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
}
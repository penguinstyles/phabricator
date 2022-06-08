import { Mongo } from 'meteor/mongo';

export const ticketsdb = new Mongo.Collection('tickets');

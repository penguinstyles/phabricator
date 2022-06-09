import { Mongo } from 'meteor/mongo';

export const commentsdb = new Mongo.Collection('comments');

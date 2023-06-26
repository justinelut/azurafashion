import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://api.verixr.com');

export const user = pb.authStore.model
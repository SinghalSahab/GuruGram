import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export default async function uploadImage(localUrl, id) {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUNIDARY_API_KEY, 
        api_secret: process.env.CLOUNIDARY_API_SECRET,
    });
    
    let public_id = `${id}_${Date.now()}`;
    await cloudinary.uploader.upload(localUrl, { public_id: public_id }).catch((error) => { console.error(error); });
    const autoCropUrl = cloudinary.url(public_id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    return autoCropUrl;
}
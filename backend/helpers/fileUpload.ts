import { getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from "firebase/app";

import multer from 'multer'

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

initializeApp(firebaseConfig )

const storage = getStorage()



export const fileUpload = async (file:any) => {

    try{

        const dateTime = giveCurrentDateTime()
    
        const storageRef = ref(storage, `files/${file.orginalname + " " + dateTime}`);

        const metadata = {
            contentType: file.mimetype,
        }

        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    }

    catch(e:any){
        return e
    }

}


const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}


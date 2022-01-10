import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'
export const uploadImage = (files) => {
    let imgArr = [];
    for (const item of files) {

        const storageRef = ref(storage, `/files/${item.name}`)
        const uploadTask = uploadBytesResumable(storageRef, item)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setProgress(prog);
                console.log(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // imgArr.push(downloadURL);
                    imgArr.push(downloadURL);
                });
            }
        );
    }

    return imgArr
}

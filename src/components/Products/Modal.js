import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import UploadImage from '../add-posts/UploadImage'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import swal from 'sweetalert'
import { db } from '../../firebase.config'
import { addDoc, collection } from 'firebase/firestore'
const ModalProducts = (props) => {
    const [img, setImg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const usersCollectionRef = collection(db, "posts");
    const handleOnchaneModal = (e) => {

        const { name, value } = e.target
        props.setPostsValue({ ...props.postsValue, [name]: value })
    }
    const handleOnchangeImgae = (e) => {
        e.preventDefault()
        const files = [...e.target.files]
        if (!files) return swal('Có lỗi xảy ra', `Chưa chọn ảnh`, 'warning')
        if (files.length > 4) return swal('Có lỗi xảy ra', "Không chọn nhiều hơn 4 ảnh", 'warning')
        setImg(files)
    }
    const uploadImage1 = async (files) => {
        const promises = []
        for (const item of files) {

            const storageRef = ref(storage, `/files/${item.name}`)
            const uploadTask = uploadBytesResumable(storageRef, item)
            promises.push(uploadTask)
        }
        const result = [];
        await Promise.allSettled(promises).then(res => {
            res.forEach(item => {
                if (item.status === 'fulfilled') {
                    result.push(item.value)
                }
            })
        })

        const urlPromises = result.map(item => {
            const path = item.ref.toString()
            return getDownloadURL(ref(storage, path))
        })
        const urls = []
        await Promise.allSettled(urlPromises).then(res => {
            res.forEach(item => {
                if (item.status === 'fulfilled') {
                    urls.push(item.value)
                }
            })
        })
        return urls;


    }

    const onSubmit = async () => {
        try {
            let media
            setIsLoading(true)
            if (img) media = await uploadImage1(img)
            await addDoc(usersCollectionRef, { name: props.postsValue.name, price: Number(props.postsValue.price), image: media });
            setIsLoading(false)
            swal('Thêm thành công', '', 'success')
            setImg(false)
        } catch (error) {
            setIsLoading(false)
            swal('Có lỗi xảy ra', `${error.message}`, 'error')
        }

    }
    const deleteImages = (index) => {
        const newArr = [...img]
        newArr.splice(index, 1)
        if (newArr.length < 1) setImg(false)
        else {
            setImg(newArr)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl>
                    <FormLabel >Tên sản phẩm</FormLabel>
                    <Input className='name' type='text' name='name' value={props.postsValue.name} onChange={handleOnchaneModal} />

                </FormControl>
                <FormControl className='my-2'>
                    <FormLabel >Giá</FormLabel>
                    <Input id='price' className='price' name='price' type='number' value={props.postsValue.price} onChange={handleOnchaneModal} />

                </FormControl>
                <FormControl className='my-2'>
                    <FormLabel >Ảnh</FormLabel>
                    <div className='d-flex '>
                        <UploadImage
                            onchange={handleOnchangeImgae}
                            img={img}
                            imageEdit={props.postsValue.image}
                            deleteImages={deleteImages}
                        />

                    </div>
                </FormControl>
            </Modal.Body>
            <Modal.Footer>

                <Button colorScheme='teal' variant='solid' isLoading={isLoading} loadingText='Xin chờ ít phút' onClick={() => onSubmit()}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProducts

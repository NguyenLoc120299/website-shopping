import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import UploadImage from '../add-posts/UploadImage'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import swal from 'sweetalert'
import { db } from '../../firebase.config'
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { Store } from '../../store/Store'
const ModalProducts = ({ ...props }) => {
    const [img, setImg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imgaeCoppy, setImageCoppy] = useState([])
    const { dispatch } = useContext(Store)
    const usersCollectionRef = collection(db, "posts");
    const handleOnchaneModal = (e) => {

        const { name, value } = e.target
        props.setPostsValue({ ...props.postsValue, [name]: value })
    }
    useEffect(() => {
        setImageCoppy(props.postsValue?.image)
    }, [props.postsValue.image])
    const handleOnchangeImgae = (e) => {
        e.preventDefault()
        const files = [...e.target.files]
        if (!files) return swal('Có lỗi xảy ra', `Chưa chọn ảnh`, 'warning')
        if (files.length > 3) return swal('Có lỗi xảy ra', "Không chọn nhiều hơn 4 ảnh", 'warning')
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
            dispatch({
                type: 'UPDATE_POST',
                payload: {}
            })
            setIsLoading(false)
            swal('Thêm thành công', '', 'success')
            setImg(false)
            props.onHide()
        } catch (error) {
            setIsLoading(false)
            swal('Có lỗi xảy ra', `${error.message}`, 'error')
        }

    }

    const onEdit = async () => {
        try {
            let media
            let imgArr = [...imgaeCoppy]
            const postDoc = doc(db, "posts", props.postsValue.id)

            setIsLoading(true)
            if (img) {
                media = await uploadImage1(img)
                media.forEach(element => {
                    imgArr.push(element)
                });


                await updateDoc(postDoc, {
                    name: props.postsValue.name,
                    price: Number(props.postsValue.price),
                    image: imgArr
                })
                dispatch({
                    type: 'UPDATE_POST',
                    payload: { id: props.postsValue.id, name: props.postsValue.name, price: Number(props.postsValue.price), image: imgArr }
                })
            }
            else {
                await updateDoc(postDoc, {
                    ...props.postsValue, image: imgaeCoppy

                })
                dispatch({
                    type: 'UPDATE_POST',
                    payload: { ...props.postsValue }
                })
            }
            setIsLoading(false)
            setImg(false)
            props.onHide()
            swal('Đã cập nhật thành công', '', 'success')
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

    const deleteImagesUpdate = (index) => {
        const newArr = [...imgaeCoppy]
        newArr.splice(index, 1)
        setImageCoppy(newArr)
    }
    const deletePost = async (id) => {
        try {

            swal({
                title: "Có chắc xóa không",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        const postDoc = doc(db, "posts", id);
                        deleteDoc(postDoc);
                        dispatch({
                            type: 'UPDATE_POST',
                            payload: { ...props.postsValue }
                        })
                        swal("Bạn đã xóa thành công", {
                            icon: "success",
                        });
                    }
                });
            props.onHide()
        } catch (error) {
            swal('Có lỗi xảy ra', `${error.message}`, 'success')
        }

    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tạo sản phẩm
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
                    <FormLabel >Ảnh (ảnh đầu tiên sẽ được chọn làm ảnh đại diện)</FormLabel>
                    <div className='d-flex '>
                        <UploadImage
                            onchange={handleOnchangeImgae}
                            img={img}
                            imageEdit={props.postsValue.image}
                            deleteImages={deleteImages}
                            imgaeCoppy={imgaeCoppy}
                            deleteImagesUpdate={deleteImagesUpdate}
                        />

                    </div>
                </FormControl>
            </Modal.Body>
            <Modal.Footer>
                {
                    imgaeCoppy ?
                        <>
                            <Button colorScheme='orange' variant='solid' isLoading={isLoading} loadingText='Xin chờ ít phút' onClick={() => onEdit()}>
                                Cập nhật
                            </Button>
                            <Button colorScheme='red' variant='solid' onClick={() => deletePost(props.postsValue.id)}>
                                Xóa
                            </Button>
                        </>
                        :
                        <Button colorScheme='teal' variant='solid' isLoading={isLoading} loadingText='Xin chờ ít phút' onClick={() => onSubmit()}>
                            Thêm
                        </Button>

                }


            </Modal.Footer>
        </Modal>
    )
}

export default ModalProducts

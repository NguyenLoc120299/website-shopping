import React, { useState } from 'react'
import style from './post.module.css'
import { AiFillCamera } from 'react-icons/ai'
import { MdOutlineDelete} from 'react-icons/md'
const UploadImage = ({ img, onchange, imageEdit, deleteImages, imgaeCoppy, deleteImagesUpdate }) => {

    return (
        <>
            {
                imageEdit ?
                    <div>
                        <div className='d-flex  justify-content-center align-items-center flex-wrap py-5'>
                            {
                                imgaeCoppy && imgaeCoppy.map((item, inx) => (
                                    <div className='position-relative' key={inx}>
                                        <img src={item} key={inx} className={style.img_post} />
                                        <span
                                            className={style.deleteImages}
                                            onClick={() => deleteImagesUpdate(inx)}
                                        ><MdOutlineDelete size={'20px'} color={"#fff"}/></span>

                                    </div>
                                ))
                            }
                            {
                                !img ? <label htmlFor='input-file' className='upload_label'>
                                    <AiFillCamera size={50} />
                                    <input type='file' style={{ display: "none" }} id='input-file' multiple accept='image/*' onChange={onchange} />
                                </label> :
                                    <div className={`d-flex justify-content-center `}>
                                        {
                                            img && img.map((item, inx) => (
                                                <div className='position-relative' key={inx}>
                                                    <img src={URL.createObjectURL(item)} className={style.img_post} />
                                                    <span
                                                        className={style.deleteImages}
                                                        onClick={() => deleteImages(inx)}
                                                    ><MdOutlineDelete size={'20px'} color={"#fff"} /></span>
                                                </div>
                                            ))
                                        }

                                    </div>

                            }

                        </div>

                    </div>
                    :
                    <div>
                        {
                            !img ?

                                <label htmlFor='input-file' className='upload_label'>
                                    <AiFillCamera size={50} />
                                    <input type='file' style={{ display: "none" }} id='input-file' multiple accept='image/*' onChange={onchange} />
                                </label>
                                :
                                <div className={`d-flex justify-content-center `}>
                                    {
                                        img && img.map((item, inx) => (
                                            <div className='position-relative' key={inx}>
                                                <img src={URL.createObjectURL(item)} className={style.img_post} />
                                                <span
                                                    className={style.deleteImages}
                                                    onClick={() => deleteImages(inx)}
                                                ><MdOutlineDelete size={'20px'} color={"#fff"} /></span>
                                            </div>
                                        ))
                                    }

                                </div>
                        }
                    </div>
            }

        </>

    )
}

export default UploadImage

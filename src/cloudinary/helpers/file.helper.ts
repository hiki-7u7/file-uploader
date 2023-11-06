import { CloudinaryResponse, ConfigFields } from '../interfaces';

import axios, { AxiosResponse } from 'axios';
import {v4 as uuid } from 'uuid';


const dataURItoBlob = (dataURI:string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([uint8Array], { type: dataURI.split(',')[0].split(':')[1] });
}

export const uploadFiles = async ( configFields: ConfigFields) => {

    const {
        apiKey,
        cloudName,
        folder,
        format,
        uploadPreset,
        files,
    } = configFields;

    if (!apiKey || !cloudName || !folder || !format || !uploadPreset) {
        throw new Error('Faltan parámetros requeridos para cargar archivos.');
    }
    
    if (!files || files.length === 0) {
        throw new Error('Ningún archivo encontrado');
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${format}/upload`;
    
    const fileUploadPromises:Promise<AxiosResponse>[] = []
    
    try {
        files?.forEach( file => {
            const blob = dataURItoBlob(file.imageBase64);
            const imageToupload = new File([blob], file.name, { type: file.type });
    
            const formData = new FormData();
            formData.append('file',imageToupload);
            formData.append('upload_preset',uploadPreset);
            formData.append('public_id',uuid());
            formData.append('api_key',apiKey);
            formData.append('folder',folder);
            const data = axios.post<CloudinaryResponse>(url,formData);
            fileUploadPromises.push(data)
        })
    
        const results: AxiosResponse<CloudinaryResponse>[] = await Promise.all(fileUploadPromises)
    
        return results.map( ({data}) => ({
            publicId: data.public_id,
            width: data.width,
            height: data.height,
            format: data.format,
            folder: data.folder,
            resourceType: data.resource_type,
            tags: data.tags,
            type: data.type,
            secureUrl: data.secure_url,
            originalFileName: data.original_filename,
            bytes: data.bytes
        }))
    } catch (error) {
        console.log(error)
        throw new Error('Error al cargar archivos');
    }

   
}

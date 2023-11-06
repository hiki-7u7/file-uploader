export interface Uploads {
    publicId: string,
    width: number,
    height: number,
    format: string,
    folder: string,
    resourceType: string,
    tags: string[],
    type: string,
    secureUrl: string,
    originalFileName: string,
    bytes: number
}
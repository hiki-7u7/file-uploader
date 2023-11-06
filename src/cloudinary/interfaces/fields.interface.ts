export interface ConfigFields {
    cloudName: string,
    uploadPreset: string,
    folder: string,
    apiKey: string,
    files?: SerializableFile[],
    format: string
}

export interface SerializableFile {
    id: string;
    imageBase64: string,
    name: string,
    size: number,
    type: string
}
export const convertToBase64 = ( file: File ):Promise<string> => {
    return new Promise<string>( (resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file!);
        reader.onload = function (event) {
            resolve(`${event.target!.result}`);
        };
    });
}
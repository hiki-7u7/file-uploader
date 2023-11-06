export const bytesToUnit = ( bytes: number ) => {

    let unit:number;

    if(bytes > 1048576){
        unit = bytes / ( 1024 * 1024 );
        return `${unit.toFixed(1)} mb`
    }else {
        unit = bytes / 1024;
        return `${unit.toFixed(1)} kb`
    }

}
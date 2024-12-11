import numeral from "numeral";


export const Numberformat = ( value ) => {
    return numeral(value).format('0,0');
}
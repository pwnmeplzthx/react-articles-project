const prefixNumber = (str: string) => {
    if (str === '7') {
        return '+7 (';
    }
    if (str === '8') {
        return '8 (';
    }
    if (str === '9') {
        return '7 (9';
    }
    return '+7 (';
};

export function formatTelephoneNumber(value: string) {
    const numberLength = 11;
    // if (value.length > numberLength) {
    //     value = value.slice(0, -1);
    // }
    let result;
    if (value.includes('+8') || value[0] === '8') {
        result = '';
    } else {
        result = '';
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
        case 0:
            result += prefixNumber(value[i]);
            // eslint-disable-next-line no-continue
            continue;
        case 4:
            result += ') ';
            break;
        case 7:
            result += '-';
            break;
        case 9:
            result += '-';
            break;
        default:
            break;
        }
        result += value[i];
    }

    return result;
}

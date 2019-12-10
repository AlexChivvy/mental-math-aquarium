const disemvowel = str => {
    const vowelArray = ['A','E','I','O','U'];
    let newArray = [...str].filter(e => !vowelArray.includes(e.toUpperCase()));
    str = newArray.join('');
    return str;
    }
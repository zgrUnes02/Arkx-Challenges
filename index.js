
const fs = require('fs') ;

const getCityName = ( fileName , temperature ) => {
    try {
        fs.readFile(fileName , 'utf-8' , (err , content) => {
            if (err) {
                console.log(err) ;
            }
            else {
                const textWriteInsideMyNewFile = `The Temperature of ${content} Is ${temperature}*C` ;
                fs.writeFile(`${content}.txt` , textWriteInsideMyNewFile , (err) => {
                    if (err) {
                        console.log(err) ;
                    }
                    console.log('The File Has Been Created With Success !') ;
                })
            }
        }) ;
    }
    catch (error) {
        console.log(error) ;
    }
}

getCityName('input.txt' , 34) ;

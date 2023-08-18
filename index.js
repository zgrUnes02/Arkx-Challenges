
const PORT = 4000 || 4001 ;
const http = require('http') ;
const url = require('url') ;

const server = http.createServer((req , res) => {

    const weatherApi = [
        {name : 'casablanca' , temperature : 25} ,
        {name : 'rabat' , temperature : 34} ,
        {name : 'settat' , temperature : 44} ,
        {name : 'titouan' , temperature : 24} ,
    ] ;

    var myUrl = url.parse(req.url , true)
    var cityName = myUrl.query.city
    
    if ( myUrl.pathname == '/weather' ) {
        try {
            const cityNeed = weatherApi.filter(city => city.name == cityName) ;
            if ( cityNeed.length != 0 ) {
                const fs = require('fs') ;
                fs.writeFile(`${cityName}.txt` , `The temperature of ${cityName} is ${cityNeed[0].temperature}` , (err) => {
                    if ( err ) {
                        console.log('Something went wrong : ' , err) ;
                    }
                    else {
                        console.log('The Has Been Created With Success !') ;
                        res.end('The File Has Benn Created With Success !') ; 
                    }
                }) ;
            }
            else {
                res.end('The File Has Benn Created With Success !') ; 
            }
        }
        catch ( error ) {
            console.log(error) ;
        }
    }
}) ;

server.listen(PORT , () => {
    console.log(`The server is running on localhost:${PORT}`) ;
}) ;

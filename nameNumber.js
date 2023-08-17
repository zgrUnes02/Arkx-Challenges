
const colors = require('colors') ;
const { stdin, stdout } = require('process');
const readline = require('readline') ;

const insertNameAndNumber = () => {

    const cmd = readline.createInterface({
        input : process.stdin , 
        output : process.stdout ,
    }) ;

    console.log('========================================='.green) ;
    console.log('====== Please Choose A Number Here ======'.green) ;
    console.log('========================================='.green) ;
    console.log(`${'1'.green} : Add New User`) ;
    console.log(`${'2'.green} : Leave The Terminal`) ;

    cmd.question('Choose One Request : ' , ( request ) => {
        if ( request == 2 ) {
            cmd.close() ;
        } 
        else {
            const myList = [
                { name : 'youness' , number : '0699030265' } ,
            ]
            cmd.question('Enter The Name Here : ' , ( name ) => {
                cmd.question('Enter The Number Here : ' , ( number ) => {
                    myList.push({name : name , number : number}) ;
                    console.log(myList) ;
                }) ;
            })
        }
    }) ;
}
insertNameAndNumber()
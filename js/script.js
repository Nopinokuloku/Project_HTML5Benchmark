/*
 * @brief - create random data
 */
 function randomGen(mode,opt){
    switch(mode){
        case 'num':
            if(opt){
                if(opt>1){
                    return Math.floor(Math.random()*opt);
                }else{
                    return Math.random()*opt;
                }
            }else{
                return Math.floor(Math.random()*1000);
            }
        break;
        case 'str':
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        break;
        default:
            console.err('Mode not managed');
        break;
    }
 }
function Remove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele !== value; 
    });
}

function Importe(){
    let images = {};
    let r = require.context('../img/logo_radio/', false, /\.(png)$/);
    r.keys().forEach((item, index) => {
        let re = item.replace('./', '')
        images[re] = r(item);
    });
    return images
}

export { Remove, Importe };
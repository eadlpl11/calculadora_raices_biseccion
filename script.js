//Cálculo de raices
//Ejemplo
//f(y) = x^4 + 3x^3 - 2
console.clear()
console.log("-------------")

let xr = [];
let xa;
let xb;
let root;
let error_percentage = 100;

let fxr;
let fxa;
let fxra;

let ecuation //= "x**4 + 3*x**3 - 2";
let interval //= 1;
let tabulation //= 3;
let index = 1;

function solve(){
    console.clear();
    console.log("GET DATA");
    ecuation = document.getElementById('ecuation').value;
    interval = parseFloat(document.getElementById('interval').value);
    tabulation = parseFloat(document.getElementById('tabulation').value);    
    user_error_percentage = parseFloat(document.getElementById('percentage').value);            

    console.log(ecuation);
    console.log(interval);
    console.log(tabulation);
    iterate(ecuation,interval,tabulation)
}

function iterate(_ecuation, _interval,_tabulation){
    
    if(error_percentage >= user_error_percentage){
        console.log()

        //1.- Se necesita tener Xa y Xb
        //Tabulamos la ecuación para detectar un cambio de signo y buscar la raíz en esos valores
        if((xa == undefined) & (xb == undefined)){
            console.log("Iteration 1");
            xa = tabulate(_ecuation,_interval ,_tabulation);
            xb = (xa+_interval);
        }
        
        //2.- Se obtiene el valor de XR con la siguiente fórmula
        //XR = (Xa + Xb)/2
        console.log("XR");
        xr.push(get_xr(xa,xb));
        console.log(xr[xr.length-1]);

        console.log("Full XR");
        console.log(xr)

        console.log("XR length");
        console.log(xr.length);

        //3.- Se asigna el valor de XR a una variable según el resultado
        fxr = evaluate_ecuation(_ecuation,xr[xr.length-1])
        fxa = evaluate_ecuation(_ecuation,xa)
        
        console.log("Evaluate ecuation xr and xa");
        console.log(fxr);
        console.log(fxa);
        
        if(xr.length>1){
            console.log("Iteration > 1");
            console.log(Math.abs(get_error_percentage(xr[xr.length-1],xr[xr.length-2])));
            error_percentage = Math.abs(get_error_percentage(xr[xr.length-1],xr[xr.length-2]));
        }

        load_html(xr[xr.length-1],xr[xr.length-2],xa,xb,error_percentage,fxr,fxa);

        asign_xr(fxr*fxa);               
        console.log("Evaluation result "+ (fxr*fxa));
        fxra = (fxr*fxa);
        console.log("Xa "+ xa);
        console.log("Xb "+ xb);
        console.log("Root "+ root);
        
        iterate(ecuation,interval,tabulation);
    }

}

function tabulate(_ecuation, _interval,_tabulation){
               
    //Turns _intervale into possitive
    if(_interval < 0){
        _interval = -_interval;
    }

    let start = -(_interval*_tabulation)
    let end = (_interval*_tabulation)
    let last = 0;

    for (let index = start; index <= end; index +=_interval){
        x = index;
        iteration_value = evaluate_ecuation(eval(_ecuation,index))
        
        if(iteration_value > 0){
            if(last < 0){
                console.log("-----")
                console.log("Last")
                console.log((index-_interval)+ " -> " +last)
                console.log("Current")
                console.log(index + " -> " +iteration_value)
                console.log('load_intersection()');
                load_intersection(((index-_interval)+ " -> " +last),(index + " -> " +iteration_value));
                return (index-_interval)
            }
        }

        if(iteration_value < 0){
            if(last > 0){
                console.log("-----")
                console.log("Last")
                console.log((index-_interval)+ " -> " +last);
                console.log("Current");
                console.log(index + " -> " +iteration_value);
                console.log('load_intersection()');
                load_intersection(((index-_interval)+ " -> " +last),(index + " -> " +iteration_value));
                return (index-_interval)
            }
        }
        
        last = iteration_value
    }    
}

function asign_xr(parameter){
    
    if(parameter < 0){
        xb = xr[xr.length-1];        
    }
    if(parameter > 0){
        xa = xr[xr.length-1];
    }
    if(parameter === 0){
        root = xr[xr.length-1];
    }    
}

function get_xr(Xa,Xb){
    function_xr = (parseFloat(Xa)+parseFloat(Xb))/2;
    return function_xr
}

function evaluate_ecuation(_ecuation,_value){
    x = _value
    return eval(_ecuation)
}

function get_error_percentage(actual_xr,last_xr){
    let ep = ((actual_xr-last_xr)/actual_xr)*100
    return ep
}

function load_html(_xr,xr_anterior,_xa,_xb,_ep,_fxr,_fxa){

    let html_iteration = document.createElement('div');    
    html_iteration.id = `div_${index}`;
    html_iteration.innerHTML = `
    <br>
    <br>
    <br>
    <div class="container">
    <h1>Iteración ${index}</h1>
    <br>
    <h3>xr = (xa + xb)/2</h3>
    <h3>${_xr} = (${xa} + ${xb})/2</h3>
    <br>
    <h3>Ep = |(Xr(actual)+Xr(anterior))  /  (Xr(actual) * 100| </h3>
    <h3>${_ep} = |(${_xr}+${xr_anterior}))  /  (${_xr}) * 100| </h3>
    <br>
    <h3>f(Xa)*f(Xr)</h3>
    <h3>f(${_fxa})*f(${_fxr}) = ${(_fxr*_fxa)}</h3>
    </div>
    `
    document.body.appendChild(html_iteration);
    index++    
}

function load_intersection(_xa,_xb){
    
    let intersection = document.createElement('div');
    intersection.id = 'interseccion';
    intersection.innerHTML =
    `
    <br>
    <div class="container">
    <h1>Intersección</h1>
    <h3>Cambio de signo</h3>
    <h3>xa = ${_xa}</h3>
    <h3>xb = ${_xb}</h3>
    </div>
    `
    document.body.appendChild(intersection);
}

//Itearacion 2 -> xa esta desfasado obteniendo el valor de XR
//Itearacion 3 -> xb esta desfasado obteniendo el valor de XR
//Itearacion 4 -> xb esta desfasado obteniendo el valor de XR
//Itearacion 5 -> xa esta desfasado obteniendo el valor de XR
//Itearacion 6 -> xa esta desfasado obteniendo el valor de XR
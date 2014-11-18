/*
 * Used on Filtre Menu
 */
function animateUpTop(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}

	element.style.top= y+'px';
	if(y < limit){
		y=y+2;
		setTimeout(function(){animateUpTop(element,y,limit);},1);
	}else{
		y=limit;
	}
}

function animateDownTop(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}
	element.style.top= y+'px';
	if(y > limit){
		y=y-2;
		setTimeout(function(){animateDownTop(element,y,limit);},1);
	}else{
		y=limit;
	}
}


function animateUpBottom(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}

	element.style.bottom= y+'px';
	if(y < limit){
		y=y+2;
		setTimeout(function(){animateUpBottom(element,y,limit);},1);
	}else{
		y=limit;
	}
}

function animateDownBottom(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}
	element.style.bottom= y+'px';
	if(y > limit){
		y=y-2;
		setTimeout(function(){animateDownBottom(element,y,limit);},1);
	}else{
		y=limit;
	}
}


/*
 * Used on Google Maps Labels
 */
function animateOpen(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}
	element.style.height= y+'px';
	if(y < limit){
		y=y+1;
		setTimeout(function(){animateOpen(element,y);},1);
	}else{
		y=limit;
	}
}

function animateClose(element,y,limit){
	if(typeof y != 'number'){
		y = parseInt(y);
	}

	element.style.height= y+'px';
	if(y > limit){
		y=y-1;
		setTimeout(function(){animateClose(element,y);},1);
	}else{
		y=limit;
	}
}
function Small(){
	var s = parseInt(Math.random()*3+3);
	Enemy.call(this,1,s,['imgs/enemy1.png','imgs/enemy1-bang.gif'],10);
};
Small.prototype.__proto__ = Enemy.prototype;



function Middle(){
	var s = parseInt(Math.random()*3+2);
	Enemy.call(this,4,s,['imgs/enemy2.png','imgs/enemy2-bang.gif'],50);
};
Middle.prototype.__proto__ = Enemy.prototype;


function Large(){
	var s = parseInt(Math.random()*2+1);
	Enemy.call(this,10,s,['imgs/enemy3.png','imgs/enemy3-bang.gif'],200);
};
Large.prototype.__proto__ = Enemy.prototype;
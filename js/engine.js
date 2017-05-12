var Engine = {
	gameStatus:false,
	score:0,
	bullet:{},
	enemy:{},
	bg:document.querySelector('.game'),
	start:document.querySelector('.start'),
	scoreBox:document.querySelector('.score'),
	heart:document.querySelector('.life'),
	filter:document.querySelector('.filter'),
	bgTimer:null,
	moveTimer:null,
	enemyTimer:null,
	init:function(){
		this.gameStart();
	},
	gameStart:function(){
		var _this = this;
		this.start.onclick = function(){
			_this.start.style.display = 'none';
			_this.scoreBox.style.display = 'block';
			_this.heart.style.display = 'block';
			if(!_this.gameStatus){
				_this.gameStatus = true;
				_this.bgMove();
				_this.controMove();
				_this.createPlane();	
			}
		}
	},
	bgMove:function(){
		this.bg.style.backgroundImage = 'url(imgs/bg.png)';
		var y = 0;
		var _this = this;
		this.bgTimer = setInterval(function(){
			y+=2;
			_this.bg.style['background-position-y'] = y +'px';
		},50)

	},
	controMove:function(){
		var _this = this;
		this.moveTimer = setInterval(function(){
			for(var i in _this.bullet){
				_this.bullet[i].move();
			}
			for(var i in _this.enemy){
				_this.enemy[i].move();
			}
		},20)
	},
	createPlane:function(){
		Hero.init();
		this.enemyTimer = setInterval(function(){
			var num = parseInt(Math.random()*20)+1;
			switch(num){
				case 1:
				case 3:
				case 5:
				case 7:
				case 9:
					new Small().init();
					break;
				case 2:
				case 10:
				case 18:
					new Middle().init();
					break;
				case 14:
				case 8:
					new Large().init();
					break;
			}
		},500)
	},
	//检测碰撞
	isInto: function(obj1,obj2){
		var l1 = obj1.offsetLeft > obj2.offsetLeft+obj2.offsetWidth;
		var l2 = obj2.offsetLeft > obj1.offsetLeft+obj1.offsetWidth;
		var t1 = obj1.offsetTop > obj2.offsetTop + obj2.offsetHeight;
		var t2 = obj2.offsetTop > obj1.offsetTop + obj1.offsetHeight;
		if(l1 || l2 || t1 || t2){
			return false;
		}
		return true;
	},
	handleScore : function(score){
		this.score += score;
		this.scoreBox.innerHTML =  '分数: ' + this.score;
	},
	gameOver: function(){
		this.isOver = true;
		clearInterval(this.enemyTimer);
		this.filter.style.display = 'block';
	}

};
Engine.init();


//  子弹较多 构造函数创建
function Bullet(l,t){
	this.l = l;
	this.t = t;
	this.self = null;
	this.top = 0;
	this.left = 0;
	this.speedy = 5;
	this.id = '';
};
Bullet.prototype = {
	constructor:Bullet,
	init : function(){
		var img = document.createElement('img');
		img.src = 'imgs/bullet.png';
		Engine.bg.appendChild(img);
		this.self = img;
		var _this = this;
		img.onload = function(){
			_this.left = _this.l-img.offsetWidth/2;
			_this.top = _this.t-img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top +'px';
		}

		//子弹生成id
		this.id = Math.random();
		Engine.bullet[this.id] = this;
	},
	move : function(){
		this.top -= this.speedy;
		this.self.style.top = this.top +'px';
		this.self.style.left  = this.left +'px';

		var t = this.top < -this.self.offsetHeight;
		if(t){
			this.destroy();
		} ;
		if(Engine.isOver) return;
		//判断是否与敌机相撞
		for(var i in Engine.enemy){
			if(Engine.isInto(this.self,Engine.enemy[i].self)){
				this.destroy();
				Engine.enemy[i].blood --;
				if(Engine.enemy[i].blood <=0){
					Engine.handleScore(Engine.enemy[i].score);
					Engine.enemy[i].destroy();

				}
			}
		}

	},
	destroy : function(){
		this.self.remove();
		delete Engine.bullet[this.id];
	}
}
var Hero = {
	self:null,
	left:0,
	top:0,
	life:3,
	allLife :document.querySelectorAll('.life img'),
	imgs:['imgs/hero.gif','imgs/hero-bang.gif'],
	shootTimer:null,
	init:function(){
		var img = document.createElement('img');
		img.src = this.imgs[0];
		Engine.bg.appendChild(img);
		this.self = img;
		var _this = this;
		img.onload = function(){
			_this.left = (Engine.bg.offsetWidth-img.offsetWidth)/2;
			_this.top = Engine.bg.offsetHeight-img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top +'px';
			_this.move();
			_this.shoot();
		}
	},
	move: function(){
		var _this = this;
		document.onmousemove = function(e){
			e = e || window.event;
			var l = e.clientX - Engine.bg.offsetLeft - _this.self.offsetWidth/2;
			var t = e.clientY - Engine.bg.offsetTop - _this.self.offsetHeight/2;
			var maxL = Engine.bg.offsetWidth - _this.self.offsetWidth;
			var maxT = Engine.bg.offsetHeight - _this.self.offsetHeight;
			var l1 = _this.self.offsetWidth/2; 
			l = l < -l1 ? -l1 : (l>maxL+l1? (maxL+l1) : l);
			t = t < 0 ? 0 : (t>maxT? maxT : t);
			_this.self.style.left = l +'px';
			_this.self.style.top = t + 'px';
			//更新left top
			_this.left = l;
			_this.top = t;
		}
	},
	shoot:function(){
		var _this = this;
		this.shootTimer = setInterval(function(){
			var l = _this.left+_this.self.offsetWidth/2;
			new Bullet(l,_this.top).init();
		},200);
	},
	boom : function(){
		var img = document.createElement('img');
		img.src =this.imgs[1];
		img.style.left = this.left + 'px';
		img.style.top = this.top + 'px';
		Engine.bg.appendChild(img);
		setTimeout(function(){
			img.remove();
		},500)
	},
	die :function(){
		this.life--;
		this.allLife[0].remove();
		this.allLife = document.querySelectorAll('.life img');
		if(this.life <= 0){
			this.destroy();
		};
	},

	destroy: function(){
		this.self.remove();
		this.boom();
		//停止发射子弹
		clearInterval(this.shootTimer);
		//游戏结束
		Engine.gameOver();
	}

}

//Spaghetti
var v = [], w = [], buf, canvas, ctx;

function setup(){
	createCanvas(window.innerWidth,window.innerHeight);
	pg = createGraphics(window.innerWidth,window.innerHeight);
	pg.noStroke();
	pg.rect(0, 0, window.innerWidth,window.innerHeight)
	//TOP
	for (var n = 0; n < 15; n++) {
		var prtr = window.innerWidth*n/16;
		v.push(new Vine(prtr+window.innerWidth/16, 0, Math.PI/2));
	}
	//BOTTOM
	for (var n = 0; n < 15; n++) {
		var prtr = window.innerWidth*n/16;
		v.push(new Vine(prtr+window.innerWidth/11, window.innerHeight, -Math.PI/2));
	}
	//LEFT
	for (var m = 0; m < 10; m++) {
		var prtr = window.innerHeight*m/11;
		v.push(new Vine(0, prtr+window.innerHeight/11, 0));
	}
	//RIGHT
	for (var m = 0; m < 10; m++) {
		var prtr = window.innerHeight*m/11;
		v.push(new Vine(window.innerWidth, prtr+window.innerHeight/11, Math.PI));
	}
	//SAUCE
	for (var l = 0; l < 25; l++) {
		w.push(new Drop());
	}
}

function draw(){
	for (var n = 0; n < v.length; n++) {
		v[n].move();
		v[n].draw();
	}
	for (var m = 0; m < w.length; m++) {
		w[m].move();
		w[m].draw();
	}
}

function Vine(x, y, initAng){
	this.x = x;
	this.y = y;
	this.rad = 5;
	this.ang = initAng;
	var count = 0, swap = 0.1, inc = 10, prevx, prevy;

	this.move = function(){ //INCREMENTING COORDINATES
		if(count++>100)
			return;

		prevx=this.x;
		prevy=this.y;
		this.x+=inc*cos(this.ang);
		this.y+=inc*sin(this.ang);
		this.ang+=swap;

		if(this.ang > Math.PI*2){
			this.ang%=Math.PI/2;
		}
		
		//CHANGE DIRECTION
		if (chances(10)) {
			swap = -swap;
		}
	}

	this.draw = function(){
		if(count>100)
			return;

		var pangle = this.ang + Math.PI/2;
		noStroke();
		fill(255, 217, 102);
		ellipse(this.x, this.y, this.rad*2, this.rad*2);
		quad(prevx+this.rad*cos(pangle), prevy+this.rad*sin(pangle), 
			 prevx-this.rad*cos(pangle), prevy-this.rad*sin(pangle), 
			 this.x-this.rad*cos(pangle), this.y-this.rad*sin(pangle), 
			 this.x+this.rad*cos(pangle), this.y+this.rad*sin(pangle));

		pg.fill(255, 217, 102);
		pg.ellipse(this.x, this.y, this.rad*2, this.rad*2);
		pg.quad(prevx+this.rad*cos(pangle), prevy+this.rad*sin(pangle), 
			 prevx-this.rad*cos(pangle), prevy-this.rad*sin(pangle), 
			 this.x-this.rad*cos(pangle), this.y-this.rad*sin(pangle), 
			 this.x+this.rad*cos(pangle), this.y+this.rad*sin(pangle));
	}

	function chances(ez){
		var n = Math.floor(Math.random()*ez+1);
		if(n==1)
			return true;
		return false;
	}
};

function Drop(){
	this.x = rnjesus(window.innerWidth*0.75, window.innerWidth*0.05);
	this.y = -200;
	this.vel = rnjesus(13, 3);
	var count2 = 0;
	
	this.move = function(){
		if(count2++<100||count2>150)
			return;
		this.y+=this.vel;
	}

	this.draw = function(){
		if(count2<100||count2>150)
			return;

		fill(255, 0, 0);
		ellipse(this.x+150, this.y+150, 100, 100);

		if(count2==150){
			image(pg, 0, 0);
			var x = new Image();
			x.setAttribute("src", "sauce.png");
			document.getElementById('imgs').appendChild(x);
			x.style.top = this.y + "px";
			x.style.left = this.x + "px";
		}
	}

	function rnjesus(boundup, bounddown){
		var n = Math.floor(Math.random()*(boundup-bounddown)+bounddown);
		return n;
	}
};